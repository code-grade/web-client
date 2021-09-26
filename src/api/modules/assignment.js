import {axios, extractDataResolve} from "../client";

export const assignment = {
    /**
     * Create new assignment
     * @param data
     * @returns {Promise<[*, *]>}
     */
    create: (data) => extractDataResolve(axios.post("/api/question", data)),

    /**
     * Get all assignment of current user (instructor)
     * @param state - DRAFT | PUBLISHED | OPEN | CLOSED | SCHEDULED | FINALIZED
     * @returns {Promise<[*, *]>}
     */
    all: (state) => extractDataResolve(
        axios.get("/api/auth/question/all", {
            params: {state}
        })
    ),

    update:(questionId,data) => extractDataResolve(axios.put(`/api/auth/question/${questionId}`, data)),
    delete:(questionId)=>extractDataResolve(axios.delete(`/api/auth/question/${questionId}`)),
}

export default question;
