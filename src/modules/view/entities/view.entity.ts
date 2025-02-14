import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class View {
  @Field()
  id: string;

  @Field()
  name: string;
}
