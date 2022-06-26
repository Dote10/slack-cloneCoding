import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/Users';
import { Workspaces } from './entities/Workspaces';
import { Channels } from 'src/channels/entities/Channels';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { ChannelMembers } from 'src/channels/entities/ChannelMembers';
import { Mentions } from 'src/mentions/entities/Mentions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      WorkspaceMembers,
      ChannelMembers,
      Mentions
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
