import {axios, extractDataResolve} from "../client";

export const assignment = {
    /**
     * Create new assignment
     * @param data {*} assignment data
     * @returns {Promise<[*, *]>}
     */
    create: (data) => extractDataResolve(axios.post("/api/assignment", data)),

    /**
     * Get all assignment of current user (instructor)
     * @param state - DRAFT | PUBLISHED | OPEN | CLOSED | SCHEDULED | FINALIZED
     * @returns {Promise<[*, *]>}
     */
    instructor: (state) => extractDataResolve(
        axios.get("/api/assignment", {params: {state}})
    ),

    /**
     * Get one assignment of current user (instructor) by assignmentId
     * @returns {Promise<[*, *]>}
     */
     get: (assignmentId) => extractDataResolve(
        axios.get(`/api/assignment/${assignmentId}`)
    ),

     /**
         * get participants of the current assignment
         * @param assignmentId {string} UUID
         * @returns {Promise<[*, *]>}
         */
      participants: (assignmentId) => extractDataResolve(
        axios.get(`/api/participate/${assignmentId}`)
    ),

    /**
     * change state of the assignment
     * @param {*} state 
     * @returns 
     */
    change:(assignmentId,state)=>extractDataResolve(
        axios.put(`/api/assignment/changeState/${assignmentId}/${state}`)
    ),

    getPublished:(state) => extractDataResolve(
        axios.get(`/api/assignment/all/${state}`)
    ),

    participate: {
        /**
         * Enroll to an assignment
         *  Participate to an assignment as current user (Student)
         * @param assignmentId {string} UUID
         * @returns {Promise<[*, *]>}
         */
        student: (assignmentId) => extractDataResolve(
            axios.put(`/api/assignment/participate/${assignmentId}`)
        ),

        /**
         * Get all enrolled assignment for current user (Student)
         * @param state - DRAFT | PUBLISHED | OPEN | CLOSED | SCHEDULED | FINALIZED
         * @returns {Promise<[*, *]>}
         */
        all: (state) => extractDataResolve(
           axios.get("/assignment/participate", {params: {state}})
        )
    }
}

export default assignment;
