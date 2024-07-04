import { LessonService } from "@/api/lessons"
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { debounce } from "lodash"
import { useState } from "react"



export const LessonsPage = () => {
    const { FindAllPaginated } = LessonService()
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const [search, setSearch] = useState("")
    const { data } = useQuery({ queryKey: ['lessons', pagination.page, pagination.perPage, search], queryFn: () => FindAllPaginated({ page: pagination.page, perPage: pagination.perPage, search }) })


    const handleNextPage = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }
    const handlePrevPage = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }

    const debouncedSearch = debounce((value: string) => {
        setSearch(value.trim());
        setPagination({ ...pagination, page: 1 })
    }, 1000);


    return (
        <div className="p-10 h-full">
            <header >
                <Typography variant="h5" className="font-medium">Lessons</Typography>
            </header>

            <Card className="mt-10 bg-transparent shadow-none h-full">
                <CardHeader floated={false} shadow={false} className="flex justify-between items-center bg-transparent rounded-none">
                    <div className="w-96 bg-white">
                        <Input onChange={(e) => debouncedSearch(e.target.value)} size="lg" color="green" type="text" label="Search for lessons" />
                    </div>

                    <div>
                        <Button color="green">Add Lessons</Button>
                    </div>
                </CardHeader>

                <CardBody className="grid grid-cols-1 gap-4 lg:grid-cols-4 mt-10">
                    {data?.data.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-10 rounded-lg border border-blue-gray-50 bg-white shadow-md hover:shadow-lg hover:bg-gray-100 cursor-pointer">
                            <div>
                                <Typography variant="h6" className="font-medium">{item.name}</Typography>
                            </div>
                        </div>
                    ))}
                </CardBody>

                <CardFooter className="mt-auto flex justify-between items-center">
                    <Button onClick={() => handlePrevPage()} disabled={!data?.meta?.prev} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2"><CaretLeft /> Back</Button>
                    <Typography color="gray" className="text-xs"> Page {data?.meta?.currentPage} of {data?.meta?.lastPage} | Total {data?.meta?.total}</Typography>
                    <Button onClick={() => handleNextPage()} disabled={!data?.meta?.next} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2">Next <CaretRight /></Button>
                </CardFooter>
            </Card>
        </div>
    )
}