"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Student {
  id: number;
  name: string;
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
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>Name: {student.name}</li>
        ))}
      </ul>
      <button onClick={() => router.push("/")}>&lt; Back</button>
    </div>
  );
};

export default GetStudents;
