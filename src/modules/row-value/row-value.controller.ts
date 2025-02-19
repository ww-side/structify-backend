import {
  Body,
  Controller,
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
  async findRowValues(
    @Headers('Authorization') authHeader: string,
    @Param('id') rowId: string,
    @Body() viewId: string,
  ) {
    await this.rowValueService.validateUserAccess({ authHeader, viewId });
    return this.rowValueService.findRowValues(rowId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
    @Body() updateRowValueDTO: UpdateRowValueDTO,
  ) {
    const { row } = await this.rowValueService.findRowValue(id);
    await this.rowValueService.validateUserAccess({
      authHeader,
      viewId: row.viewId,
    });
    return this.rowValueService.update({ id, updateRowValueDTO });
  }
}
