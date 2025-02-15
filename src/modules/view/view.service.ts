import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { View } from '~/modules/view/view.entity';

import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';

@Injectable()
export class ViewService {
  constructor(@InjectRepository(View) private viewRepo: Repository<View>) {}

  async create({
    createViewInput,
    userId,
  }: {
    createViewInput: CreateViewInput;
    userId: string;
  }): Promise<View> {
    const view = this.viewRepo.create({
      ...createViewInput,
      userId,
    });

    return await this.viewRepo.save(view);
  }

  findAllById(id: string) {
    return this.viewRepo.find({ where: { userId: id } });
  }

  findOne({ id, userId }: { id: string; userId: string }) {
    return this.viewRepo.findOne({ where: { userId, id } });
  }

  async update({
    updateViewInput,
    userId,
  }: {
    updateViewInput: UpdateViewInput;
    userId: string;
  }) {
    const { id, ...updateData } = updateViewInput;
    const view = await this.viewRepo.findOne({ where: { id, userId } });

    if (!view) {
      throw new NotFoundException(`View with ID ${id} not found.`);
    }

    Object.assign(view, updateData);
    return await this.viewRepo.save(view);
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const view = await this.viewRepo.findOne({ where: { id, userId } });

    if (!view) {
      throw new NotFoundException(`View with ID ${id} not found.`);
    }

    await this.viewRepo.remove(view);

    return view;
  }
}
