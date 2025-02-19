import {
  Controller,
  Get,
  Headers,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ViewDataService } from '~/modules/view-data/view-data.service';

import { AuthGuard } from '~/shared/guards/auth-guard';
import { ResponseFormatInterceptor } from '~/shared/interceptors/response-format';
import { getTokenFromAuthHeader } from '~/shared/lib/token';

@UseGuards(AuthGuard)
@UseInterceptors(ResponseFormatInterceptor)
@Controller('view-data')
export class ViewDataController {
  constructor(
    private readonly viewDataService: ViewDataService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getData(
    @Headers('Authorization') authHeader: string,
    @Query('viewId') viewId: string,
    @Query('page') page: number = 1,
    @Query('page_size') pageSize: number = 15,
  ) {
    const token = getTokenFromAuthHeader(authHeader);
    const userId = this.jwtService.decode(token).id;
    return this.viewDataService.getViewData({ userId, viewId, page, pageSize });
  }
}
