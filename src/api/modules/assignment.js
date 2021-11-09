import {axios, extractDataResolve} from "../client";

export const assignment = {
    /**
     * Create new assignment
     * @param data {*} assignment data
     * @returns {Promise<[*, *]>}
     */
    create: (data) => extractDataResolve(axios.post("/api/assignment/create", data)),

    /**
     * Get all assignment of current user (instructor)
     * @param state - DRAFT | PUBLISHED | OPEN | CLOSED | SCHEDULED | FINALIZED
     * @returns {Promise<[*, *]>}
     */
    instructor: (state) => extractDataResolve(
        axios.get("/api/assignment/instructor", {
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

    /**
     * Edit an assignment by (instructor)
     * @returns {Promise<[*, *]>}
     */
     update: (assignmentId,data) => extractDataResolve(
        axios.put(`/api/assignment/instructor/${assignmentId}`, data)
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
        axios.put(`/api/assignment/${assignmentId}/state/${state}`)
    ),

    getPublished:(state) => extractDataResolve(
        axios.get(`/api/assignment/public`,{
            params:{state}
        })
    ),

    grade:(assignmentId,userId,data) => extractDataResolve(
        axios.post(`/api/assignment/${assignmentId}/grade/${userId}`,data)
    ),
    /**
         * Get final grade by assignment Id
         * @returns {Promise<[*, *]>}
         */
     final: (assignmentId) => extractDataResolve(
        axios.get(`/api/assignment/${assignmentId}/grade`)
     ),

    participate: {
        /**
         * Enroll to an assignment
         *  Participate to an assignment as current user (Student)
         * @param assignmentId {string} UUID
         * @returns {Promise<[*, *]>}
         */
        student: (assignmentId) => extractDataResolve(
            axios.post(`/api/assignment/participate/${assignmentId}`)
        ),

        /**
         * Unenroll from an assignment for current user(student)
         * @param assignmentId {string} UUID
         * @returns {Promise<[*, *]>}
         */
         unenroll: (assignmentId) => extractDataResolve(
            axios.delete(`/api/assignment/participate/${assignmentId}`)
        ),

        /**
         * Get all enrolled assignment for current user (Student)
         * @param state - DRAFT | PUBLISHED | OPEN | CLOSED | SCHEDULED | FINALIZED
         * @returns {Promise<[*, *]>}
         */
        all: () => extractDataResolve(
           axios.get("/api/assignment/participate")
        ),

        /**
         * Get all enrolled participants for an assignment
         * @returns {Promise<[*, *]>}
         */
         participants: (assignmentId) => extractDataResolve(
            axios.get(`/api/assignment/participate/${assignmentId}`)
         ),

        

    },
}

export default assignment;
