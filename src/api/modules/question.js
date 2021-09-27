import {axios, extractDataResolve} from "../client";

export const question = {
    /**
     * Create new questions
     * @param data
     * @returns {Promise<[*, *]>}
     */
    create: (data) => extractDataResolve(axios.post("/api/question", data)),

    /**
     * Get all questions of current user (instructor)
     * @returns {Promise<[*, *]>}
     */
    instructor: () => extractDataResolve(
        axios.get("/api/question/instructor", {})
    ),


    /**
     * Get complete details of a Question.
     *  If current user is the owner then complete=true will give test cases as well.
     * @param complete {boolean} default=false
     * @returns {Promise<[*, *]>}
     */
    single: (complete= false) => extractDataResolve(
        axios.get("/api/question/instructor", {params: {complete}})
    ),

    update:(questionId,data) => extractDataResolve(axios.put(`/api/auth/question/${questionId}`, data)),
    delete:(questionId)=>extractDataResolve(axios.delete(`/api/question/${questionId}`)),
}

export default question;