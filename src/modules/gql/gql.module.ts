import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { gqlConfig } from './config';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>(gqlConfig)],
})
export class GqlModule {}
