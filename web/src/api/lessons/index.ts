import { Lesson } from "../../models/lesson";
import { api } from "../client-api";
import { CreateLessonRequest } from "./dtos/create-lesson-dto";
import { FindAllLessonRequest, FindAllLessonResponse } from "./dtos/find-all-lesson-dto";
import { UpdateLessonRequest } from "./dtos/update-lesson-dto";



const CreateLesson = async (data: CreateLessonRequest) => {
    const response = await api.post("Lessons", { json: data }).json<Lesson>();
    return response;
}

const FindAllPaginated = async ({ page, perPage }: FindAllLessonRequest) => {
    const response = await api.get("Lessons", { searchParams: { page: page, perPage: perPage } }).json<FindAllLessonResponse>();
    return response;
}

const FindLessonById = async (id: string) => {
    const response = await api.get(`Lessons/${id}`).json<Lesson>();
    return response;
}

const UpdateLesson = async (id: string, data: UpdateLessonRequest) => {
    const response = await api.put(`Lessons/${id}`, { json: data }).json<Lesson>();
    return response;
}

const DeleteLesson = async (id: string) => {
    const response = await api.delete(`Lessons/${id}`).json<Lesson>();
    return response;
}

export const LessonService = () => { return { CreateLesson, FindAllPaginated, FindLessonById, UpdateLesson, DeleteLesson } }