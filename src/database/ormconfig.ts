import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from './dbconfig';

ConfigModule.forRoot({
  isGlobal: true,
});

const datasource = async () => {
  const data = config;
  delete data.cli;
  return new DataSource(data);
};
export default datasource();
