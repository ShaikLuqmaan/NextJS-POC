// src/entity/Enrollment.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "../entity/student.entity";
import { Course } from "../entity/course.entity";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollmentDate: Date;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: "student_id" })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: "course_id" })
  course: Course;
}
