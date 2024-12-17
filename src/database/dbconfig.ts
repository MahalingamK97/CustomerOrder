import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const config = {
  type: process.env.DB_TYPE as any,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
  migrations: [__dirname + '/./migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
  synchronize: false,
  logging: true,
};
