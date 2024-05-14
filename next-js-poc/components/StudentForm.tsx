"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateStudent: React.FC = () => {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/create-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentName, courseName }),
      });
      const data = await response.json();
      setMessage(data.message);
      router.push("/students");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div>
      <h1 className="head_text blue_gradient mb-5">Create Student</h1>
      <form
        onSubmit={handleSubmit}
        className="glassmorphism p-6 flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="form_input"
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="form_input"
        />
        <button type="submit" className="black_btn">
          Create
        </button>
      </form>
      {message && <p className="desc mt-2">{message}</p>}
    </div>
  );
};

export default CreateStudent;
