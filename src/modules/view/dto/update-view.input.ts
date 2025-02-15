import { IsArray } from 'class-validator';

import { Field, InputType, PartialType } from '@nestjs/graphql';

import { ViewFormat } from '~/modules/view/types/view-format';

import { IsString } from '~/shared/lib/validation';

import { CreateViewInput } from './create-view.input';

@InputType()
export class UpdateViewInput extends PartialType(CreateViewInput) {
  @Field()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  icon: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  formats: ViewFormat[];
}
