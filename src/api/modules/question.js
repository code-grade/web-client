import {axios, extractDataResolve} from "../client";

export const question = {
    create: (data) => extractDataResolve(axios.post("/api/auth/question", data)),
}

export default question;