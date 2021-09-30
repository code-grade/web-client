import {axios, extractDataResolve} from "../client";

export const submission = {
    /**
     * make new submission
     * @param data {*} submission data
     * @returns {Promise<[*, *]>}
     */
    make: (assignmentId,questionId,data) => extractDataResolve(
        axios.post(`/api/submission/${assignmentId}/${questionId}`, data)
        ),

    /**
     * Get submission for a question by Id to the current user(student)
     * @returns {Promise<[*, *]>}
     */
    get: (submissionId) => extractDataResolve(
        axios.get(`/api/submission/${submissionId}`)
    ),

     /**
     * Get all submissions for a question by Id to the current user(student)
     * @returns {Promise<[*, *]>}
     */
      questionSubmissions: (assignmentId,data) => extractDataResolve(
        axios.get(`/api/submission/${assignmentId}`,data)
    ),

    /**
     * Get all submissions of all participants of an assignment by assignmentId to the current user(instructor)
     * @returns {Promise<[*, *]>}
     */
     studentSubmissions: (assignmentId,data) => extractDataResolve(
        axios.get(`/api/submission/${assignmentId}`,data)
    ),

    /**
     * Get best submissions for an assignment by userId
     * @returns {Promise<[*, *]>}
     */
     best: (assignmentId,userId) => extractDataResolve(
        axios.get(`/api/submission/summary/${assignmentId}/${userId}`)
    ),

    }

export default submission;
