import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api";
import {USER_ROLES} from "./static";
import {STORAGE} from "./storage"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        user: {
            firstName: "",
            lastName: "",
            role: USER_ROLES.ANONYMOUS
        }
    },
    getters: {
        token: state => state.token,
        isLogged: state => Boolean(state.token) && (state.user?.role !== USER_ROLES.ANONYMOUS),
        user: state => state.user
    },
    mutations: {
        SET_token(state, payload) {
            state.token = payload
        },
        SET_user(state, payload) {
            Object.assign(state.user, payload)
        },
        CLEAR_token(state) {
            state.token = ""
        },
        CLEAR_user(state) {
            state.user = ({
                firstName: "",
                lastName: "",
                role: USER_ROLES.ANONYMOUS
            })
        },
    },
    actions: {
        async login(context, payload) {
            const {username, password} = payload
            const [status, res_data] = await api.user.login(username, password)
            if (status.status !== 200) {
                return status
            }
            const {token, data} = res_data
            data.username = username
            context.commit('SET_user', data)
            context.commit('SET_token', token)
            await context.dispatch("update_user_details")
            await context.dispatch('syncTo_storage')
            return status
        },
        async signup(context, payload) {
            const {username,firstName,lastName,email, password,role} = payload

            const [status, res_data] = await api.user.register({username, firstName, lastName, email, password,role})
            if (status.status !== 200) {
                return status
            }
            console.log(res_data,status)
            const {token, data} = res_data
            data.username = username
            context.commit('SET_user', data)
            context.commit('SET_token', token)
            await context.dispatch("update_user_details")
            await context.dispatch('syncTo_storage')
            return status
        },
        async update_user_details(context) {
            const [status, res_data] = await api.user.getDetails()
            console.log(res_data)
            if (status.status !== 200) {
                return status
            }
            context.commit('SET_user', res_data)
            return status
        },
        async logout(context) {
            await context.dispatch("clear_storage")
            context.commit("CLEAR_user")
            context.commit("CLEAR_token")
        },
        async syncTo_storage(context) {
            STORAGE.save(STORAGE.KEY_TOKEN, context.state.token)
            STORAGE.save(STORAGE.KEY_USER, context.state.user)
        },
        async clear_storage() {
            STORAGE.clear(STORAGE.KEY_USER)
            STORAGE.clear(STORAGE.KEY_TOKEN)
        }
    },
    plugins: [(store) => {
        store.commit("SET_user", STORAGE.read(STORAGE.KEY_USER))
        store.commit("SET_token", STORAGE.read(STORAGE.KEY_TOKEN))
    }]
})
