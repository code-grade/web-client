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
    /**
     * Get a single assignment by id
     * @param assignmentID
     * @returns {Promise<[*, *]>}
     */
    instructorGetAssignmentById: (assignmentID) => extractDataResolve(
        axios.get(`/api/assignment/${assignmentID}`)
    ),
    /**
     * Get assignment participants
     * @param assignmentID
     * @returns {Promise<[*, *]>}
     */
    instructorGetParticipants: (assignmentID) => extractDataResolve(
        axios.get(`/api/assignment/participate/${assignmentID}`)
    ),
    /**
     * Get assignment participants
     * @param assignmentID
     * @returns {Promise<[*, *]>}
     */
    instructorGetParticipantsSummary: (assignmentID,studentId) => extractDataResolve(
        axios.get(`/api/submission/summary/${assignmentID}/${studentId}`)
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
