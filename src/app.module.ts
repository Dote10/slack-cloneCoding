import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import * as ormconfig from '../ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChannelChats } from './channels/entities/ChannelChats';
import { ChannelMembers } from './channels/entities/ChannelMembers';
import { Channels } from './channels/entities/Channels';
import { DMs } from './dms/entities/DMs';
import { Mentions } from './mentions/entities/Mentions';
import { Users } from './users/entities/Users';
import { WorkspaceMembers } from './workspaces/entities/WorkspaceMembers';
import { Workspaces } from './workspaces/entities/Workspaces';
import { MentionsModule } from './mentions/mentions.module';

const getEnv = () => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: 3308,
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
    cli: { migrationsDir: 'src/migrations' },
    logging: true,
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: false,
    keepConnectionAlive: true,
  };
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: 3308,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [],
          migrations: [__dirname + '/src/migration/*.ts'],
          cli: { migrationsDir: 'src/migrations' },
          seeds: ['src/seeds/**/*{.ts,.js}'],
          factories: ['src/factories/**/*{.ts,.js}'],
          logging: true,
          autoLoadEntities: true,
          charset: 'utf8mb4',
          synchronize: false,
          keepConnectionAlive: false,
        };
      },
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    MentionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
