import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/channels/entities/ChannelMembers';
import { Mentions } from 'src/mentions/entities/Mentions';
import { WorkspaceMembers } from 'src/workspaces/entities/WorkspaceMembers';
import { Users } from './entities/Users';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, ChannelMembers, WorkspaceMembers, Mentions]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule],
})
export class UsersModule {}
