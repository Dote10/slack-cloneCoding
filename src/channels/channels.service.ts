import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from '../workspaces/entities/Workspaces';
import { WorkspaceMembers } from '../workspaces/entities/WorkspaceMembers';
import { Channels } from './entities/Channels';
import { Users } from '../users/entities/Users';
import { Repository } from 'typeorm';
import { ChannelMembers } from './entities/ChannelMembers';
import { ChannelChats } from './entities/ChannelChats';

@Injectable()
export class ChannelsService {
    constructor(
        @InjectRepository(Workspaces)
        private workspaceRepository: Repository<Workspaces>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMemberRepository: Repository<WorkspaceMembers>,
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        @InjectRepository(ChannelChats)
        private channelChatsRepository: Repository<ChannelChats>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ){}

    async findById(id: number){
        return this.channelsRepository.findOne({where:{id}});
    }

    async getWorkspaceChannrls(url: string, myId: number){
        return this.channelsRepository
                .createQueryBuilder('channels')
                .innerJoinAndSelect(
                    'channels.ChannelMembers','channelMembers',
                    'channelMembers.userId = :myId', { myId }
                )
                .innerJoinAndSelect(
                    'channels.Workspace','workspace',
                    'workspace.url = :url', { url }
                )
                .getMany();
    }

}
