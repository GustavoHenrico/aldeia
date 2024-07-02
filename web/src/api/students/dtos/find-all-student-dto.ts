import { Pagination } from "../../../models/pagination";
import { Student } from "../../../models/student";



export interface FindAllStudentRequest {
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllStudentResponse {
    data: Student[]
    meta: Pagination
}