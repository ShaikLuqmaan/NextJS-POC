import React from "react";
import CreateStudent from "../../../components/StudentForm";

const CreateStudentPage = () => {
  return (
    <div className="app">
      <h1 className="head_text blue_gradient mb-5">Add New Students</h1>
      <CreateStudent />
    </div>
  );
};

export default CreateStudentPage;
