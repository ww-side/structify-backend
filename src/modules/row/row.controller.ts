import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { RowValueService } from '~/modules/row-value/row-value.service';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { CreateRowDTO } from './dto/create-row.dto';
import { RowService } from './row.service';

@UseInterceptors(ResponseFormatInterceptor)
@UseGuards(AuthGuard)
@Controller('row')
export class RowController {
  constructor(
    private readonly rowService: RowService,
    private readonly rowValueService: RowValueService,
  ) {}

  @Post()
  create(@Body() createRowDTO: CreateRowDTO) {
    return this.rowService.create(createRowDTO);
  }

  @Get(':id')
  async findAll(
    @Headers('Authorization') authHeader: string,
    @Param('id') viewId: string,
  ) {
    await this.rowValueService.validateUserAccess({ authHeader, viewId });
    return this.rowService.findAll(viewId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rowService.delete(id);
  }
}
