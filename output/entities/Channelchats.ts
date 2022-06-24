import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Users } from "./Users";

@Index("FK_channels_TO_channelChats_1", ["channelId"], {})
@Index("FK_users_TO_channelChats_1", ["userId"], {})
@Entity("channelchats", { schema: "cat" })
export class Channelchats {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "content" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("int", { name: "ChannelId", nullable: true })
  channelId: number | null;

  @Column("int", { name: "UserId", nullable: true })
  userId: number | null;

  @ManyToOne(() => Channels, (channels) => channels.channelchats, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ChannelId", referencedColumnName: "id" }])
  channel: Channels;

  @ManyToOne(() => Users, (users) => users.channelchats, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
