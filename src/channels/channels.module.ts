import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from 'src/channels/entities/Channels';
import { ChannelChats } from 'src/channels/entities/ChannelChats';
import { Users } from 'src/users/entities/Users';
import { Workspaces } from 'src/workspaces/entities/Workspaces';
import { ChannelMembers } from 'src/channels/entities/ChannelMembers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      ChannelChats,
      Users,
      Workspaces,
      ChannelMembers,
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports:[TypeOrmModule]
})
export class ChannelsModule {}
