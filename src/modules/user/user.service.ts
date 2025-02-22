import { Repository } from 'typeorm';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateData.username || updateData.email) {
      const existingUser = await this.userRepo.findOne({
        where: [{ username: updateData.username }, { email: updateData.email }],
      });

      if (existingUser) {
        if (existingUser.username === updateData.username) {
          throw new HttpException(
            'Username already taken',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (existingUser.email === updateData.email) {
          throw new HttpException(
            'Email already taken',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    Object.assign(user, updateData);

    await this.userRepo.save(user);

    return user;
  }
}
