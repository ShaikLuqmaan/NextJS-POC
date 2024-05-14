"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  name: string;
}
interface Student {
  id: number;
  name: string;
  courses: Course[];
}

const GetStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error getting students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="app">
      <h1 className="head_text mb-5">Students and Their Courses</h1>
      <ul className="list-none p-0 m-0">
        {students.map((student) => (
          <li
            key={student.id}
            className="py-4 px-6 bg-white shadow-md rounded-lg my-2  "
          >
            Name:{" "}
            <span className="text-gray-700 font-medium">{student.name}</span>
            <ul className="list-none pl-4">
              {student.courses.map((course) => (
                <li key={course.id} className="text-gray-600">
                  Course: {course.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("/")} className="outline_btn mt-4">
        Back
      </button>
    </div>
  );
};

export default GetStudents;
