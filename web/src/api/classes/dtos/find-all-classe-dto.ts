import { Classe } from "../../../models/classe";
import { Pagination } from "../../../models/pagination";



export interface FindAllClasseRequest {
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllClasseResponse {
    data: Classe[]
    meta: Pagination
}

export interface FindAllClasseByStudentRequest {
    studentId: string
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}
