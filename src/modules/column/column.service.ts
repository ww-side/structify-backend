import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Column } from './column.entity';
import { CreateColumnDTO, UpdateColumnDTO } from './dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepo: Repository<Column>,
  ) {}

  async create({
    userId,
    createColumnDTO,
  }: {
    userId: string;
    createColumnDTO: CreateColumnDTO;
  }) {
    const column = this.columnRepo.create({
      ...createColumnDTO,
      userId,
      variants: createColumnDTO.variants ?? [],
    });
    return await this.columnRepo.save(column);
  }

  async findAll({ userId, viewId }: { userId: string; viewId?: string }) {
    const where: { userId: string; viewId?: string } = { userId };

    if (viewId) {
      where.viewId = viewId;
    }

    const columns = await this.columnRepo.find({ where });
    return { columns };
  }

  async findOne({ id, userId }: { id: string; userId: string }) {
    const column = await this.columnRepo.findOne({ where: { id, userId } });
    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }
    return column;
  }

  async update({
    id,
    userId,
    updateColumnDTO,
  }: {
    id: string;
    userId: string;
    updateColumnDTO: UpdateColumnDTO;
  }) {
    const column = await this.findOne({ id, userId });

    if (!column) {
      throw new NotFoundException(`Column with id ${id} not found`);
    }

    await this.columnRepo.update(id, updateColumnDTO);
    return await this.findOne({ id, userId });
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const column = await this.findOne({ id, userId });
    await this.columnRepo.remove(column);
  }
}
