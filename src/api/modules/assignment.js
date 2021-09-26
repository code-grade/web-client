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
        axios.get("/api/assignment", {
            params: {state}
        })
    ),

    participate: {
        /**
         * Enroll to an assignment
         *  Participate to an assignment as current user (Student)
         * @param assignmentId {string} UUID
         * @returns {Promise<[*, *]>}
         */
        student: (assignmentId) => extractDataResolve(
            axios.put(`/api/participate/${assignmentId}`)
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
