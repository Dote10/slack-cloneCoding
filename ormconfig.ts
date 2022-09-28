import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelChats } from './src/channels/entities/ChannelChats';
import { ChannelMembers } from './src/channels/entities/ChannelMembers';
import { Channels } from './src/channels/entities/Channels';
import { DMs } from './src/dms/entities/DMs';
import { Mentions } from './src/mentions/entities/Mentions';
import { Users } from './src/users/entities/Users';
import { WorkspaceMembers } from './src/workspaces/entities/WorkspaceMembers';
import { Workspaces } from './src/workspaces/entities/Workspaces';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

export const typeConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3307,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  migrations: [__dirname + '/src/migration/*.ts'],
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
  logging: true,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  keepConnectionAlive: true,
};

module.exports = typeConfig;
