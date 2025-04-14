import { PartialType } from '@nestjs/mapped-types';

import { CreateCalendarDTO } from './create-calendar.dto';

export class UpdateCalendarDTO extends PartialType(CreateCalendarDTO) {}
