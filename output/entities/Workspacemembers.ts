import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { Workspaces } from "./Workspaces";

@Index("FK_users_TO_workspacemembers_1", ["userId"], {})
@Entity("workspacemembers", { schema: "cat" })
export class Workspacemembers {
  @PrimaryGeneratedColumn({ type: "int", name: "WorkspaceId" })
  workspaceId: number;

  @Column("int", { primary: true, name: "UserId" })
  userId: number;

  @Column("datetime", { name: "loggedInAt", nullable: true })
  loggedInAt: Date | null;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.workspacemembers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.workspacemembers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "WorkspaceId", referencedColumnName: "id" }])
  workspace: Workspaces;
}
