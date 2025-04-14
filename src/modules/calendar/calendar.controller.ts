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

import { CalendarService } from './calendar.service';
import { CreateCalendarDTO, UpdateCalendarDTO } from './dto';

@UseGuards(AuthGuard)
@UseInterceptors(ResponseFormatInterceptor)
@Controller('calendar')
export class CalendarController {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly reqHeadersService: HeaderManagerService,
  ) {}

  @Post()
  create(
    @Request() req: Request,
    @Body() createCalendarDTO: CreateCalendarDTO,
  ) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.calendarService.create(userId, createCalendarDTO);
  }

  @Get()
  findAll(@Request() req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.calendarService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req: Request, @Param('id') id: string) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.calendarService.findOne({ id, userId });
  }

  @Patch(':id')
  update(
    @Request() req: Request,
    @Param('id') id: string,
    @Body() updateCalendarDTO: UpdateCalendarDTO,
  ) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.calendarService.update({
      id,
      updateDTO: updateCalendarDTO,
      userId,
    });
  }

  @Delete(':id')
  remove(@Request() req: Request, @Param('id') id: string) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);
    return this.calendarService.remove({ id, userId });
  }
}
