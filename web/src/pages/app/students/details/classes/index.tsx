import { ClasseService } from "@/api/classes"
import { Student } from "@/models/student"
import { CardBody, Select, Option, IconButton } from "@material-tailwind/react"
import { PlusCircle, TrashSimple, } from '@phosphor-icons/react'
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const list = [
    {
        name: "Math",
        id: 1
    },
    {
        name: "Banana",
        id: 1
    },
    {
        name: "Trator",
        id: 1
    },
]

type StudentDetailsClassesProps = {
    student: Student;
}

export const StudentDetailsClasses = ({ student }: StudentDetailsClassesProps) => {
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const { FindAllPaginatedByStudent } = ClasseService()
    const { data } = useQuery({ queryKey: ["queryByStudent", student.id], queryFn: () => FindAllPaginatedByStudent({ page: pagination.page, perPage: pagination.perPage, studentId: student.id }) });


    return (
        <CardBody className="flex flex-col gap-4 overflow-auto py-5 h-[calc(100vh-100px)] lg:h-[calc(100vh-300px)]">
            <div className="flex gap-4">
                <Select label="Select a new Classe">
                    <Option>Teste</Option>
                    <Option>Teste2</Option>
                    <Option>Teste24</Option>
                </Select>
                <IconButton color="green" size="md"> <PlusCircle size={16} weight="duotone" /> </IconButton>
            </div>

            <div className="flex flex-col gap-4 mt-5 h-full overflow-auto">
                {list?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border p-4 border-blue-gray-100 rounded-lg">
                        {item.name}
                        <IconButton color="red" size="sm" variant="text"> <TrashSimple size={16} weight="duotone" /> </IconButton>
                    </div>
                ))}
            </div>
        </CardBody>
    )
}