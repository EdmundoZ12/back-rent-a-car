import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(dto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(dto);
    return this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
    });
    if (!person) throw new NotFoundException(`Person with id ${id} not found`);
    return person;
  }

  async search(query: string): Promise<Person[]> {
    return this.personRepository.find({
      where: [
        { full_name: ILike(`%${query}%`) },
        { id_card: ILike(`%${query}%`) },
        { passport_number: ILike(`%${query}%`) },
      ],
    });
  }
}
