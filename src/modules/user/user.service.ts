import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateUserDTO } from '~/modules/user/dto/update-user.dto';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async delete(userId: string) {
    const res = await this.userRepo.delete(userId);

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async me(token: string) {
    const id = this.jwtService.decode(token).id;
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update({ id, updateData }: { id: string; updateData: UpdateUserDTO }) {
    if (updateData.username) {
      const existingUser = await this.userRepo.findOne({
        where: { username: updateData.username },
      });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Username is already taken');
      }
    }

    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateData);

    await this.userRepo.save(user);

    return user;
  }
}
