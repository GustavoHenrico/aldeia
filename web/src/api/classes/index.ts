import { Classe } from "../../models/classe";
import { api } from "../client-api";
import { CreateClasseRequest } from "./dtos/create-classe-dto";
import { FindAllClasseByStudentRequest, FindAllClasseRequest, FindAllClasseResponse } from "./dtos/find-all-classe-dto";
import { UpdateClasseRequest } from "./dtos/update-classe-dto";

const CreateClasse = async (data: CreateClasseRequest) => {
    const response = await api.post("Classes", { json: data }).json<Classe>();

    return response;
}

const FindAllPaginated = async ({ page, perPage }: FindAllClasseRequest) => {
    const response = await api.get("Classes", { searchParams: { page: page, perPage: perPage } }).json<FindAllClasseResponse>();

    return response;
}

const FindAllPaginatedByStudent = async ({ page, perPage, studentId }: FindAllClasseByStudentRequest) => {
    const response = await api.get(`Classes/by-student/${studentId}`, { searchParams: { page: page, perPage: perPage } }).json<FindAllClasseResponse>();

    return response;
}

const FindClasseById = async (id: string) => {
    const response = await api.get(`Classes/${id}`).json<Classe>();
    return response;
}

const UpdateClasse = async (id: string, data: UpdateClasseRequest) => {
    const response = await api.patch(`Classes/${id}`, { json: data }).json<Classe>();

    return response;
}

const DeleteClasse = async (id: string) => {
    const response = await api.delete(`Classes/${id}`).json<Classe>();
    return response;
}

export const ClasseService = () => { return { CreateClasse, FindAllPaginated, FindAllPaginatedByStudent, FindClasseById, UpdateClasse, DeleteClasse } }