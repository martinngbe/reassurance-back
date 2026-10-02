import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';

loadEnv();

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'soleil',
  database: process.env.DB_DATABASE || 'reass',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

// Data source utilisé par la CLI TypeORM (migrations)
export default new DataSource(typeOrmConfig);
