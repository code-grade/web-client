import {axios, extractDataResolve} from "../client";

export const plagiarism = {

report:(assignmentId,questionId)=>extractDataResolve(
    axios.get(`/api/plagiarism/report/${assignmentId}/${questionId}`)
 )
}

export default plagiarism;

