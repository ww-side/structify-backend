import { Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Row } from '~/modules/row/row.entity';

import { CreateRowDTO } from './dto/create-row.dto';

@Injectable()
export class RowService {
  constructor(@InjectRepository(Row) private rowRepo: Repository<Row>) {}

  async create({ viewId }: CreateRowDTO) {
    const newRow = this.rowRepo.create({
      viewId,
    });

    try {
      return await this.rowRepo.save(newRow);
    } catch (error) {
      if (error.code === '23503') {
        throw new InternalServerErrorException(
          `View with ID ${viewId} not found.`,
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the row.',
      );
    }
  }

  async findAll({
    page = 1,
    pageSize = 15,
    viewId,
  }: {
    page?: number;
    pageSize?: number;
    viewId: string;
  }) {
    const skip = (page - 1) * pageSize; // Количество записей, которые нужно пропустить
    const take = pageSize; // Количество записей для извлечения

    const [rows, total] = await this.rowRepo.findAndCount({
      where: { viewId },
      skip,
      take,
    });

    return { rows, total };
  }

  async delete(id: string) {
    const row = await this.rowRepo.findOne({ where: { id } });

    if (!row) {
      throw new NotFoundException(`Row with ID ${id} not found.`);
    }

    return await this.rowRepo.delete({ id });
  }
}
