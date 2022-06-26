import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channels } from '../../channels/entities/Channels';
import { DMs } from '../../dms/entities/DMs';
import { Mentions } from '../../mentions/entities/Mentions';
import { WorkspaceMembers } from './WorkspaceMembers';
import { Users } from '../../users/entities/Users';

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('OwnerId', ['OwnerId'], {})
@Entity({ schema: 'cat', name: 'workspaces' })
export class Workspaces {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @Column('varchar', { name: 'url', unique: true, length: 30 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('int', { name: 'OwnerId', nullable: true })
  OwnerId: number | null;

  @OneToMany(() => Channels, (channels) => channels.Workspace)
  Channels: Channels[];

  @OneToMany(() => DMs, (dms) => dms.Workspace)
  DMs: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.Workspace)
  Mentions: Mentions[];

  @OneToMany(
    () => WorkspaceMembers,
    (workspacemembers) => workspacemembers.Workspace,
    { cascade: ['insert'] },
  )
  WorkspaceMembers: WorkspaceMembers[];

 // @ManyToOne(() => Users, (users) => users.Workspaces, {
 //   onDelete: 'SET NULL',
 //   onUpdate: 'CASCADE',
 // })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: Users;

  @ManyToMany(() => Users, (users) => users.Workspaces)
  Members: Users[];
}
