import { Repository } from 'typeorm';

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { ViewService } from '~/modules/view/view.service';

import { getTokenFromAuthHeader, TokenMeta } from '~/shared/lib/token';

import { CreateRowValueDTO, UpdateRowValueDTO } from './dto';
import { RowValue } from './row-value.entity';

@Injectable()
export class RowValueService {
  constructor(
    @InjectRepository(RowValue)
    private readonly rowValueRepository: Repository<RowValue>,
    private readonly viewService: ViewService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createRowValueDTO: CreateRowValueDTO) {
    const { rowId, columnId, viewId } = createRowValueDTO;

    const existingRowValue = await this.rowValueRepository.findOne({
      where: { rowId, columnId, viewId },
    });

    if (existingRowValue) {
      throw new ConflictException(
        `Row value with rowId: ${rowId}, columnId: ${columnId}, and viewId: ${viewId} already exists`,
      );
    }

    const rowValue = this.rowValueRepository.create(createRowValueDTO);
    return await this.rowValueRepository.save(rowValue);
  }

  async findAll(viewId: string) {
    return await this.rowValueRepository.find({ where: { viewId } });
  }

  async findOne(rowId: string) {
    const rowValue = await this.rowValueRepository.findOne({
      where: { rowId },
    });
    if (!rowValue) {
      throw new NotFoundException(`Row values with ID ${rowId} not found`);
    }
    return rowValue;
  }

  async update({
    id,
    updateRowValueDTO,
  }: {
    id: string;
    updateRowValueDTO: UpdateRowValueDTO;
  }) {
    const rowValue = await this.findOne(id);
    Object.assign(rowValue, updateRowValueDTO.value);
    return await this.rowValueRepository.save(rowValue);
  }

  async delete(id: string) {
    const rowValue = await this.findOne(id);
    await this.rowValueRepository.remove(rowValue);
  }

  async validateUserAccess({
    viewId,
    authHeader,
  }: {
    authHeader: string;
    viewId: string;
  }) {
    const token = getTokenFromAuthHeader(authHeader);
    const userId = this.jwtService.decode<TokenMeta>(token).id;
    const view = await this.viewService.findOne({ id: viewId, userId });

    if (!view) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return userId;
  }
}
