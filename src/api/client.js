import Axios from 'axios'
import store from "../store"

/**
 * Setup axios
 */
export const BASE_URL = process.env.VUE_APP_API
export const axios = Axios
Axios.defaults.baseURL = BASE_URL
Axios.interceptors.request.use(function (config) {
    const token = store.getters["token"];
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});



/**
 * Convert Axios Response into 'Message {status, message}'
 * @param res
 * @return {{message: string, status: number}|{message, status}}
 */
function toMessage(res) {
    if (!res || !res.status) {
        return {status: 408, message: "Check your internet connection"}
    }

    if (res.status === 401) {
        store.dispatch("user/logout").then(r => console.log("logged out"))
    }

    return {status: res.status, message: res.data.message}
}

/**
 * Resolve Axios response
 * @param axiosRes
 */
export async function resolve(axiosRes) {
    try {
        return await axiosRes;
    } catch (e) {
        return e.response
    }
}

export async function extractData(response) {
    const resp = await response
    const msg = toMessage(resp)
    const data =  (msg.status === 200)? resp.data.data : null
    return [msg, data]
}

export async function extractBody(response) {
    const resp = await response
    const msg = toMessage(resp)
    const data =  (msg.status === 200)? resp.data : null
    return [msg, data]
}

export async function extractDataResolve(axiosRes) {
    return extractData(resolve(axiosRes))
}

export async function extractBodyResolve(axiosRes) {
    return extractBody(resolve(axiosRes))
}

