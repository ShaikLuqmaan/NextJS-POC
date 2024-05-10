import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Course } from "../entity/course.entity";
import { Enrollment } from "./enrollement.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.students, {
    eager: true,
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  @JoinTable()
  // Join Table indicates which side of the relationship is main entity
  courses: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
