import { CreateRequesterDto } from './dto/create-requester.dto';
import { Requester } from './entities/requester.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from '../person/person.service';

@Injectable()
export class RequesterService {
  constructor(
    @InjectRepository(Requester)
    private readonly requesterRepository: Repository<Requester>,
    private readonly personService: PersonService,
  ) {}

  async create(dto: CreateRequesterDto): Promise<Requester> {
    const person = await this.personService.findOne(dto.personId);

    const requester = this.requesterRepository.create({
      ...dto,
      person,
    });

    return this.requesterRepository.save(requester);
  }

  async findOne(id: number): Promise<Requester> {
    const requester = await this.requesterRepository.findOne({
      where: { id },
      relations: { person: true },
    });
    if (!requester)
      throw new NotFoundException(`Requester with id ${id} not found`);
    return requester;
  }

  async findByPerson(personId: number): Promise<Requester> {
    const requester = await this.requesterRepository.findOne({
      where: { person: { id: personId } },
      relations: { person: true },
    });
    if (!requester)
      throw new NotFoundException(`Requester for person ${personId} not found`);
    return requester;
  }
}
