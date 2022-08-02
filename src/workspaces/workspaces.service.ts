import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from './entities/Workspaces';
import { Repository } from 'typeorm';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Channels } from 'src/channels/entities/Channels';
import { channel } from 'diagnostics_channel';
import { Users } from 'src/users/entities/Users';

@Injectable()
export class WorkspacesService {

    constructor(
        @InjectRepository(Workspaces)
        private workspaceRepository: Repository<Workspaces>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMemberRepository: Repository<WorkspaceMembers>,
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ){}

    async createWorkspace(name: string, url: string, myId: number){
        const workspace = this.workspaceRepository.create({
            name,
            url,
            OwnerId: myId
        });
    
    
    const returned = await this.workspaceRepository.save(workspace);
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;

    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;

    const [,channelReturned] = await Promise.all([
        this.workspaceMemberRepository.save(workspaceMember),
        this.channelsRepository.save(channel)
        ]);
    }

    async getWorkspaceMembers(url: string){
        this.userRepository.createQueryBuilder('user')
            .innerJoin('user.WorkspaceMembers','members')
    }
}
