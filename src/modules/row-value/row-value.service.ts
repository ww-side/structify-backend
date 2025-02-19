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

  async findRowValues(rowId: string) {
    const rowValue = await this.rowValueRepository.findOne({
      where: { rowId },
    });
    if (!rowValue) {
      throw new NotFoundException(`Row with ID ${rowId} not found`);
    }
    return { row: rowValue };
  }

  async findRowValue(id: string) {
    const rowValue = await this.rowValueRepository.findOne({
      where: { id },
    });
    if (!rowValue) {
      throw new NotFoundException(`Row values with ID ${id} not found`);
    }
    return { row: rowValue };
  }

  async update({
    id,
    updateRowValueDTO,
  }: {
    id: string;
    updateRowValueDTO: UpdateRowValueDTO;
  }) {
    const { row } = await this.findRowValue(id);

    Object.assign(row, { value: updateRowValueDTO.value });
    return await this.rowValueRepository.save(row);
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
