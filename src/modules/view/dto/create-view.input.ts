import { Field, InputType } from '@nestjs/graphql';

import { ViewFormat } from '~/modules/view/types/view-format';

import { IsArray, IsOptional, IsString } from '~/shared/lib/validation';

@InputType()
export class CreateViewInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => [String])
  @IsArray()
  formats: ViewFormat[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  icon: string;
}
