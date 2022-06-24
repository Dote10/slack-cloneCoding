import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { Workspaces } from "./Workspaces";

@Index("FK_workspaces_TO_dms_1", ["workspaceId"], {})
@Index("FK_users_TO_dms_1", ["senderId"], {})
@Index("FK_users_TO_dms_2", ["receiverId"], {})
@Entity("dms", { schema: "cat" })
export class Dms {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "content" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column("int", { name: "WorkspaceId", nullable: true })
  workspaceId: number | null;

  @Column("int", { name: "SenderId", nullable: true })
  senderId: number | null;

  @Column("int", { name: "ReceiverId", nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Users, (users) => users.dms, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "SenderId", referencedColumnName: "id" }])
  sender: Users;

  @ManyToOne(() => Users, (users) => users.dms2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ReceiverId", referencedColumnName: "id" }])
  receiver: Users;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.dms, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "WorkspaceId", referencedColumnName: "id" }])
  workspace: Workspaces;
}
