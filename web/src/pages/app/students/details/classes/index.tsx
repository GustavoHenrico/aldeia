import { ClasseService } from "@/api/classes"
import { StudentService } from "@/api/students"
import { Student } from "@/models/student"
import { CardBody, IconButton, Button } from "@material-tailwind/react"
import { CaretLeft, CaretRight, TrashSimple, } from '@phosphor-icons/react'
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { StudentDetailsClassesSkeleton } from "./skeletron"


type StudentDetailsClassesProps = {
    student: Student;
}

export const StudentDetailsClasses = ({ student }: StudentDetailsClassesProps) => {
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const { RemoveStudentFromClass } = ClasseService();
    const { FindAllClassByStudentPaginated } = StudentService();


    const { data, refetch, isLoading } = useQuery({ queryKey: ["classeByStudent", student.id], queryFn: () => FindAllClassByStudentPaginated({ studentId: student.id, page: pagination.page, perPage: pagination.perPage }) })

    const handleNextPage = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }
    const handlePrevPage = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }

    const handleRemoveClass = async (classeId: string) => {
        await RemoveStudentFromClass(classeId, student.id);
        await refetch();
    }


    return (
        <CardBody className="flex flex-col gap-4 overflow-auto py-5 h-[calc(100vh-100px)] lg:h-[calc(100vh-300px)]">
            {isLoading ? (<StudentDetailsClassesSkeleton />) : (
                <div className="flex flex-col gap-4 mt-5 h-full overflow-auto">
                    {data && data.data.length > 0 ? data?.data?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border p-4 border-blue-gray-100 rounded-lg">
                            {item.name}
                            <IconButton onClick={() => { handleRemoveClass(item.id) }} color="red" size="sm" variant="text"> <TrashSimple size={16} weight="duotone" /> </IconButton>
                        </div>
                    )) : (
                        <div>
                            <p className="text-center text-blue-gray-500">No classes found</p>
                        </div>
                    )}
                </div>
            )}

            {data?.meta && data?.meta?.total > 10 && (
                <div className="mt-auto flex justify-between items-center">
                    <Button onClick={() => handlePrevPage()} disabled={!data?.meta?.prev} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2"><CaretLeft /> Back Page</Button>
                    <Button onClick={() => handleNextPage()} disabled={!data?.meta?.next} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2">Next Page <CaretRight /></Button>
                </div>
            )}

        </CardBody >
    )
}