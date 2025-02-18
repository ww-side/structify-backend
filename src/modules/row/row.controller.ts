import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';

import { CreateRowDTO } from './dto/create-row.dto';
import { RowService } from './row.service';

@UseInterceptors(ResponseFormatInterceptor)
@UseGuards(AuthGuard)
@Controller('row')
export class RowController {
  constructor(private readonly rowService: RowService) {}

  @Post()
  create(@Body() createRowDTO: CreateRowDTO) {
    return this.rowService.create(createRowDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rowService.delete(id);
  }
}
