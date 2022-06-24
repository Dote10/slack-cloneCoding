import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Workspaces } from "./Workspaces";

@Index("FK_workspaces_TO_mentions_1", ["workspaceId"], {})
@Index("FK_users_TO_mentions_1", ["senderId"], {})
@Index("FK_users_TO_mentions_2", ["receiverId"], {})
@Entity("mentions", { schema: "cat" })
export class Mentions {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", { name: "category", enum: ["chat", "dm", "system"] })
  category: "chat" | "dm" | "system";

  @Column("int", { name: "chatId", nullable: true })
  chatId: number | null;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column("int", { name: "WorkspaceId", nullable: true })
  workspaceId: number | null;

  @Column("int", { name: "SenderId", nullable: true })
  senderId: number | null;

  @Column("int", { name: "ReceiverId", nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Users, (users) => users.mentions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "SenderId", referencedColumnName: "id" }])
  sender: Users;

  @ManyToOne(() => Users, (users) => users.mentions2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ReceiverId", referencedColumnName: "id" }])
  receiver: Users;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.mentions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "WorkspaceId", referencedColumnName: "id" }])
  workspace: Workspaces;
}
