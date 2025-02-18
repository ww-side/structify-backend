import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { CreateRowValueDTO, UpdateRowValueDTO } from './dto';
import { RowValueService } from './row-value.service';

@UseGuards(AuthGuard)
@UseInterceptors(ResponseFormatInterceptor)
@Controller('row-value')
export class RowValueController {
  constructor(private readonly rowValueService: RowValueService) {}

  @Post()
  create(@Body() createRowValueDTO: CreateRowValueDTO) {
    return this.rowValueService.create(createRowValueDTO);
  }

  @Get(':id')
  async findAll(
    @Headers('Authorization') authHeader: string,
    @Param('id') viewId: string,
  ) {
    await this.rowValueService.validateUserAccess({ authHeader, viewId });
    return this.rowValueService.findAll(viewId);
  }

  @Get('/detail/:id')
  async findOne(
    @Headers('Authorization') authHeader: string,
    @Param('id') rowId: string,
    @Body() viewId: string,
  ) {
    await this.rowValueService.validateUserAccess({ authHeader, viewId });
    return this.rowValueService.findOne(rowId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
    @Body() updateRowValueDTO: UpdateRowValueDTO,
  ) {
    await this.rowValueService.validateUserAccess({
      authHeader,
      viewId: updateRowValueDTO.viewId,
    });
    return this.rowValueService.update({ id, updateRowValueDTO });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
    @Body() viewId: string,
  ) {
    await this.rowValueService.validateUserAccess({ authHeader, viewId });
    return this.rowValueService.delete(id);
  }
}
