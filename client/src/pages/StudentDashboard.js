import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Footer from "../components/Footer";
import ExamForm from "../components/Student/ExamForm";
import Revaluation from "../components/Student/Revaluation";
import Results from "../components/Student/Results";

function StudentDashboard() {
  const [activeComponent, setActiveComponent] = useState("AdmissionForm");

  const studentProps = {
    title: "STUDENT DASHBOARD",
    items: [
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
      case "AdmissionForm":
        return null;
      case "ExamForm":
        console.log("active comp: " + activeComponent);
        return <ExamForm />;
      case "Revaluation":
        return <Revaluation />;
      case "Results":
        return <Results />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <SidePanel {...studentProps} />
        </div>
        <div className="flex-1 p-6 bg-gray-100">{renderActiveComponent()}</div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
