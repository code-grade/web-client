import {axios, extractBodyResolve, extractDataResolve} from "../client";

export const user = {
    register: (data) => extractDataResolve(axios.post("/api/auth/user", data)),
    login: (username, password) => extractBodyResolve(axios.post("/api/auth/login", {username, password})),
    getDetails: () => extractDataResolve(axios.get("/api/auth/user")),
    all: () => extractDataResolve(axios.get("/api/auth/user/all")),
    update: {
        enable: (userId, isEnabled) => extractDataResolve(axios.put(`/api/auth/user/${userId}/enable/${isEnabled}`))
    },
}

export default user;