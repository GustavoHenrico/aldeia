import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassesRepository } from './classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) { }

  async create(createClassDto: CreateClassDto) {
    const classe = await this.classesRepository.findOneWithName(createClassDto.name);

    if (classe) {
      throw new ConflictException('Class already exists');
    }

    return await this.classesRepository.create({
      name: createClassDto.name,
    });
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    return await this.classesRepository.findAllPaginated(page, perPage, search);
  }


  findOne(id: string) {
    const classe = this.classesRepository.findOne(id);

    if (!classe) {
      throw new BadRequestException('Class not found');
    }

    return classe;
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    const classe = this.classesRepository.findOne(id);

    if (!classe) {
      throw new BadRequestException('Class not found');
    }

    return this.classesRepository.update(id, updateClassDto);
  }

  remove(id: string) {
    const classe = this.classesRepository.findOne(id);

    if (!classe) {
      throw new BadRequestException('Class not found');
    }

    return this.classesRepository.remove(id);
  }
}
