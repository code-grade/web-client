import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
import {router_config} from "./config";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: router_config
})

router.beforeEach(async (to, from, next) => {
    if (to.path.match(/^\/app($|\/)/)) {
        if (store.getters["isLogged"]) {
            next()
        } else {
            next({name: "Login"})
        }
    } if (to.path.match(/^\/login($|\/)/)) {
        if (store.getters["isLogged"]) {
            next({name: "App"})
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
