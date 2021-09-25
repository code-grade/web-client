import {axios, extractDataResolve} from "../client";

export const question = {
    create: (data) => extractDataResolve(axios.post("/api/auth/question", data)),
    all: () => extractDataResolve(axios.get("/api/auth/question/all")),
    update:(questionId,data) => extractDataResolve(axios.put(`/api/auth/question/${questionId}`, data)),
    delete:(questionId)=>extractDataResolve(axios.delete(`/api/auth/question/${questionId}`)),
}

export default question;