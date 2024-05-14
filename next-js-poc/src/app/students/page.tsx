import React from "react";
import GetStudents from "../../../components/GetStudents";

const StudentsPage = () => {
  return (
    <>
      <div className="app">
        <h1 className="head_text blue_gradient mb-5">Students Page</h1>
        <GetStudents />
      </div>
    </>
  );
};

export default StudentsPage;
