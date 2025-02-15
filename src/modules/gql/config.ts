import { join } from 'path';

import { ApolloDriver } from '@nestjs/apollo';

export const gqlConfig = {
  driver: ApolloDriver,
  debug: true,
  playground: true,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
};
