import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Revaluation from "../components/Student/Revaluation";
import Results from "../components/Student/Results";
import StudentProfile from "../components/Student/StudentProfile";
import ExamFormDashboard from "../components/Student/ExamFormDashboard";

function StudentDashboard() {
  const [activeComponent, setActiveComponent] = useState("StudentProfile");

  const studentProps = {
    title: "STUDENT DASHBOARD",
    items: [
      {
        text:"Student Profile",
        icon: "fa fa-user",
        callbackfunc: () => setActiveComponent("StudentProfile"),
      },
      {
        text: "Admission Form",
        icon: "fa fa-address-book",
        link: "/studentdashboard/admissionform",
      },
      {
        text: "Exam Form",
        icon: "fa-solid fa-square-check",
        callbackfunc: () => setActiveComponent("ExamForm"),
      },
      {
        text: "Revaluation",
        icon: "fa-solid fa-repeat",
        callbackfunc: () => setActiveComponent("Revaluation"),
      },
      {
        text: "Results",
        icon: "fa fa-file-text ",
        callbackfunc: () => setActiveComponent("Results"),
      },
    ],
    content: "Welcome, student! Here you can access your information.",
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "StudentProfile":
        return <StudentProfile />;
      case "AdmissionForm":
        return null;
      case "ExamForm":
        return <ExamFormDashboard />;
      case "Revaluation":
        return <Revaluation />;
      case "Results":
        return <Results />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
          <SidePanel {...studentProps} />
        <div className="flex-1 p-6 bg-gray-100">{renderActiveComponent()}</div>
    </div>
  );
}

export default StudentDashboard;
