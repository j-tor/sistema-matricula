import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  readonly sequelize = new Sequelize(
    process.env.DB_NAME || 'sistema_matricula',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5434),
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    },
  );

  async authenticate(): Promise<void> {
    await this.sequelize.authenticate();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.sequelize.close();
  }
}
