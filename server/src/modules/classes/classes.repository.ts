import { Injectable } from "@nestjs/common";
import { paginator } from "@nodeteam/nestjs-prisma-pagination";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ClassesRepository {
    private readonly paginate = paginator({ page: 1, perPage: 10 });

    constructor(private readonly db: DatabaseService) { }

    async create(data: Prisma.ClasseCreateInput) {
        return await this.db.classe.create({ data })
    }

    async findAllPaginated(page: number, perPage: number, search: string) {
        if (search) {
            return await this.paginate(this.db.classe, {
                where: {
                    OR: [
                        { name: { mode: 'insensitive', contains: search.toLowerCase() } },
                        { email: { mode: 'insensitive', contains: search.toLowerCase() } },
                        { phone: { mode: 'insensitive', contains: search.toLowerCase() } },
                        { cpf: { mode: 'insensitive', contains: search.toLowerCase() } },
                        { rg: { mode: 'insensitive', contains: search.toLowerCase() } },
                    ]
                },
                include: { _count: { select: { students: true, teachers: true, lessons: true } } }
            }, { page, perPage });
        } else {
            return await this.paginate(this.db.classe, { include: { _count: { select: { students: true, teachers: true, lessons: true } } } }, { page, perPage });
        }
    }
    
    async findOneWithName(name: string) {
        return await this.db.classe.findMany({ where: { name } })
    }

    async findOne(id: string) {
        return await this.db.classe.findUnique({ where: { id } })
    }

    async update(id: string, data: Prisma.ClasseUpdateInput) {
        return await this.db.classe.update({ where: { id }, data })
    }

    async remove(id: string) {
        await this.db.lesson.deleteMany({ where: { classeId: id } })
        return await this.db.classe.delete({ where: { id } })
    }
}