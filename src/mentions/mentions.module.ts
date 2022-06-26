import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/channels/entities/ChannelMembers';
import { Channels } from 'src/channels/entities/Channels';
import { Users } from 'src/users/entities/Users';
import { WorkspaceMembers } from 'src/workspaces/entities/WorkspaceMembers';
import { Workspaces } from 'src/workspaces/entities/Workspaces';
import { Mentions } from './entities/Mentions';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Mentions,
      Users,
      Workspaces,
      Channels,
      WorkspaceMembers,
      ChannelMembers,
    ])
  ]

})
export class MentionsModule {}
