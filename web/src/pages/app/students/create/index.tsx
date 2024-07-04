import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, Dialog, IconButton, Input, Typography } from "@material-tailwind/react";
import { PlusCircle, TrashSimple } from "@phosphor-icons/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { StudentService } from "@/api/students";

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Is required" }),
    cpf: z.string().min(1, { message: "Is required" }),
    rg: z.string().min(1, { message: "Is required" }),
    street: z.string().min(1, { message: "Is required" }).optional(),
    neighborhood: z.string().min(1, { message: "Is required" }).optional(),
    zipCode: z.string().min(1, { message: "Is required" }).optional(),
    city: z.string().min(1, { message: "Is required" }).optional(),
    state: z.string().min(1, { message: "Is required" }).optional(),
    responsibles: z.array(z.object({
        name: z.string().min(1, { message: "Is required" }),
        phone: z.string().min(1, { message: "Is required" })
    }))
})

type StudentCreateForm = z.infer<typeof schema>;


export const StudentCreate = () => {
    const [open, setOpen] = React.useState(false);
    const query = useQueryClient();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<StudentCreateForm>({ resolver: zodResolver(schema) });
    const { fields, append, remove, replace } = useFieldArray({ name: "responsibles", control: control })
    const { CreateStudent } = StudentService()

    const handleOpen = () => {
        if (open == false) {
            setOpen(true)
            append({ name: "", phone: "" })
            reset()
        } else {
            reset()
            replace([])
            setOpen(false)
        }
    };


    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["createStudent"],
        mutationFn: CreateStudent,
        onSuccess() {
            toast.success("Student created successfully");
            query.invalidateQueries();
            handleOpen();
        },
        onError: () => {
            toast.error("Failed to create student");
        }
    })

    const onSubmit = async (data: StudentCreateForm) => {
        await mutateAsync({
            street: data.street,
            city: data.city,
            email: data.email,
            name: data.name,
            cpf: data.cpf,
            neighborhood: data.neighborhood,
            phone: data.phone,
            responsibles: data.responsibles,
            rg: data.rg,
            state: data.state,
            zipCode: data.zipCode,
        })
    }

    return (
        <>
            <Button onClick={handleOpen} color="green">Create student</Button>
            <Dialog size="md" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="flex flex-col gap-4 overflow-y-auto py-5 h-full max-h-[calc(100vh-200px)]">
                            <Typography variant="h6" color="blue-gray">Personal Information</Typography>

                            <div className="grid grid-cols-1 gap-2">
                                <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                                <Input label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} color="green" size="lg" type="email" {...register("email")} />
                                <Input label={!!errors.cpf ? `CPF - ${errors.cpf.message}` : "CPF"} error={!!errors.cpf} color="green" size="lg" {...register("cpf")} />
                                <Input label={!!errors.rg ? `RG - ${errors.rg.message}` : "RG"} error={!!errors.rg} color="green" size="lg" {...register("rg")} />
                                <Input label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} color="green" size="lg" {...register("phone")} />
                            </div>

                            <Typography variant="h6" color="blue-gray">Address Information</Typography>
                            <Input label={!!errors.city ? `City - ${errors.city.message}` : "City"} error={!!errors.city} color="green" size="lg" {...register("city")} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input label={!!errors.street ? `Street - ${errors.street.message}` : "Street"} error={!!errors.street} color="green" size="lg" {...register("street")} />
                                <Input label={!!errors.state ? `State - ${errors.state.message}` : "State"} error={!!errors.state} color="green" size="lg" {...register("state")} />
                                <Input label={!!errors.zipCode ? `Postal code - ${errors.zipCode.message}` : "Postal code"} error={!!errors.zipCode} color="green" size="lg" {...register("zipCode")} />
                                <Input label={!!errors.neighborhood ? `Neighborhood - ${errors.neighborhood.message}` : "Neighborhood"} error={!!errors.neighborhood} color="green" size="lg" {...register("neighborhood")} />
                            </div>

                            <div className="flex items-center justify-between">
                                <Typography variant="h6" color="blue-gray">Responsables Information</Typography>
                                <IconButton onClick={() => append({ name: "", phone: "" })} color="green" variant="text">
                                    <PlusCircle weight="duotone" className="w-4 h-4" />
                                </IconButton>
                            </div>
                            {fields.map((field, index) => (
                                <div key={index} className="flex w-full items-center gap-2">
                                    <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                                        <Input color="green" size="lg" {...register(`responsibles.${index}.name`)} label={!!errors.responsibles?.[index]?.name ? `Name - ${errors.responsibles?.[index]?.name?.message}` : "Name"} error={!!errors.responsibles?.[index]?.name} />
                                        <Input color="green" size="lg" {...register(`responsibles.${index}.phone`)} label={!!errors.responsibles?.[index]?.phone ? `Phone - ${errors.responsibles?.[index]?.phone?.message}` : "Phone"} error={!!errors.responsibles?.[index]?.phone} />
                                    </div>
                                    <div>
                                        <IconButton onClick={() => remove(index)} className="text-red-500" color="blue-gray" variant="text">
                                            <TrashSimple weight="duotone" className="w-4 h-4" />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}

                        </CardBody>
                        <CardFooter className="flex justify-end items-center w-full">
                            <Button variant="text" color="gray" onClick={handleOpen}>Cancel</Button>
                            <Button loading={isPending} variant="text" color="green" type="submit">Create</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    )
}