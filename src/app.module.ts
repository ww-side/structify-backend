import { Module } from '@nestjs/common';
import { ViewModule } from './modules/view/view.module';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from '~/modules/auth/auth.module';
import { UserModule } from '~/modules/user/user.module';

@Module({
  imports: [
    ViewModule,
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
