import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Student } from "../entity/student.entity";
import { Course } from "../entity/course.entity";
import { Enrollment } from "../entity/enrollement.entity";

export class StudentController {
  async createStudent(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    // const courseRepo = myDataSource.getRepository(Course);

    try {
      const newStudent = new Student();
      const newCourse = new Course();

      newCourse.name = req.body.courseName;
      newStudent.name = req.body.studentName;

      newStudent.courses = [newCourse];

      await studentRepo.save(newStudent);

      res.send({
        message: "Student created",
        student: newStudent,
      });
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
  }

  async getStudents(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    res.send(await studentRepo.find());
  }

  async enrolledCourse(req: Request, res: Response) {
    const courseRepo = myDataSource.getRepository(Course);
    try {
      const newCourse = new Course();

      let student = [];
      newCourse.name = req.body.courseName;
      newCourse.students = req.body.students;
      await courseRepo.save(newCourse);

      res.send({
        message: "Course created with students",
        course: newCourse,
      });
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
  }

  async getCourses(req: Request, res: Response) {
    const courseRepo = myDataSource.getRepository(Course);
    res.send(await courseRepo.find());
  }

  async addCourseToStudent(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    const courseRepo = myDataSource.getRepository(Course);

    const studentName = req.body.studentName;
    const courseName = req.body.courseName;

    try {
      const student = await studentRepo.findOneBy({
        name: studentName,
      });
      const course = await courseRepo.findOneBy({ name: courseName });

      if (!student) {
        return res.status(404).send({ error: "Student not found" });
      }
      if (!course) {
        return res.status(404).send({ error: "Course not found" });
      }

      if (student.courses.find((c) => c.id === course.id)) {
        return res
          .status(400)
          .send({ error: "Student is already enrolled in this course" });
      }

      student.courses.push(course);
      await studentRepo.save(student);

      res.send({
        message: "Course added to student",
        student,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getCoursesByStudentId(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    const studentId = parseInt(req.params.studentId);

    try {
      const student = await studentRepo.findOneBy({
        id: studentId,
      });

      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }

      res.send({
        studentId: student.id,
        studentName: student.name,
        courses: student.courses,
      });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  }

  async getStudentsByCourseId(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    const courseId = parseInt(req.params.courseId);

    try {
      const students = await studentRepo
        .createQueryBuilder("student")
        .innerJoinAndSelect("student.courses", "course")
        .where("course.id = :courseId", { courseId })
        .getMany();

      if (!students.length) {
        return res.status(404).send({ message: "No students found " });
      }

      res.send(students);
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  }

  async createEnrollment(req: Request, res: Response) {
    const studentRepo = myDataSource.getRepository(Student);
    const courseRepo = myDataSource.getRepository(Course);
    const enrollmentRepo = myDataSource.getRepository(Enrollment);

    try {
      const student = await studentRepo.findOneBy({
        name: req.body.studentName,
      });
      const course = await courseRepo.findOneBy({
        name: req.body.courseName,
      });

      const enrollment = new Enrollment();
      const parsedDate = new Date(req.body.enrollmentDate);

      enrollment.student = student;
      enrollment.course = course;
      enrollment.enrollmentDate = parsedDate;

      await enrollmentRepo.save(enrollment);
      res.send({
        student: student,
        enrollment: enrollment,
      });
    } catch (error) {
      res.status(500).send({ message: "Error", error: error.message });
    }
  }
}
