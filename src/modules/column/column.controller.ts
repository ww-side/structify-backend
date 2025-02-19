import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { HeaderManagerService } from '~/modules/headers-manager/header-manager.service';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { ColumnService } from './column.service';
import { CreateColumnDTO, UpdateColumnDTO } from './dto';

@UseGuards(AuthGuard)
@UseInterceptors(ResponseFormatInterceptor)
@Controller('column')
export class ColumnController {
  constructor(
    private readonly columnService: ColumnService,
    private readonly reqHeadersService: HeaderManagerService,
  ) {}

  @Post()
  create(@Request() req: Request, @Body() createColumnDTO: CreateColumnDTO) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.columnService.create({ userId, createColumnDTO });
  }

  @Get()
  findAllById(@Request() req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.columnService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.columnService.findOne({ id, userId });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: Request,
    @Body() updateColumnDTO: UpdateColumnDTO,
  ) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.columnService.update({ id, userId, updateColumnDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.columnService.delete({ id, userId });
  }
}
