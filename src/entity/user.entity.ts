import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // To make it bi-directional
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  // This indicates that profile is references as foriegn table
  @JoinColumn()
  profile: Profile;
}
