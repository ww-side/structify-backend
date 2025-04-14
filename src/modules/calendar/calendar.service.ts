import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Calendar } from './calendar.entity';
import { CreateCalendarDTO, UpdateCalendarDTO } from './dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  async create(userId: string, createDto: CreateCalendarDTO) {
    const calendar = this.calendarRepository.create({ ...createDto, userId });
    return await this.calendarRepository.save(calendar);
  }

  async findAll(userId: string) {
    const events = await this.calendarRepository.find({ where: { userId } });
    return { events };
  }

  async findOne({ id, userId }: { id: string; userId: string }) {
    const event = await this.calendarRepository.findOne({
      where: { id, userId },
    });
    if (!event) {
      throw new NotFoundException(`Calendar event with id ${id} not found`);
    }
    return event;
  }

  async update({
    id,
    updateDTO,
    userId,
  }: {
    id: string;
    userId: string;
    updateDTO: UpdateCalendarDTO;
  }) {
    const event = await this.findOne({ id, userId });
    Object.assign(event, updateDTO);
    return await this.calendarRepository.save(event);
  }

  async remove({ id, userId }: { id: string; userId: string }) {
    const event = await this.findOne({ id, userId });
    await this.calendarRepository.remove(event);
  }
}
