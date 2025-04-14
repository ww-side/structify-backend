import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Type,
} from '~/shared/lib/validation';

export class CreateCalendarDTO {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
