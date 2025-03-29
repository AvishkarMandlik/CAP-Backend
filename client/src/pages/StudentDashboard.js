import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Footer from "../components/Footer";
import StudentProfile from "../components/Student/StudentProfile";
import HallTicket from "../components/Student/HallTicket";
import Marksheet from "../components/Student/Marksheet";
import ExamForm from "../components/Student/ExamForm";
import Revaluation from "../components/Student/Revaluation";
import Certificate from "../components/Student/Certificate";
import ExamFormDashboard from "../components/Student/ExamFormDashboard";

function StudentDashboard() {
  const [activeComponent, setActiveComponent] = useState("StudentProfile");

  const studentProps = {
    title: "STUDENT DASHBOARD",
    items: [
      {
        text: "Dashboard",
        icon: "fa-solid fa-house",
        callbackfunc: () => setActiveComponent("StudentProfile"),
      },
      {
        text: "Admission Form",
        icon: "fa fa-address-book",
        link: "/studentdashboard/admissionform",
      },
      {
        text: "Exam Form",
        icon: "fa-solid fa-clipboard-check",
        callbackfunc: () => setActiveComponent("ExamForm"),
      },
      {
        text: "Hall Ticket",
        icon: "fa-solid fa-ticket-alt",
        callbackfunc: () => setActiveComponent("HallTicket"),
      },
      {
        text: "Marksheet",
        icon: "fa-solid fa-file-lines",
        callbackfunc: () => setActiveComponent("Marksheet"),
      },
      {
        text: "Revaluation",
        icon: "fa-solid fa-arrows-rotate",
        callbackfunc: () => setActiveComponent("Revaluation"),
      },
      {
        text: "Certificate",
        icon: "fa-solid fa-certificate",
        callbackfunc: () => setActiveComponent("Certificate"),
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
        console.log("active comp: " + activeComponent);
        return <ExamForm />;
      case "HallTicket":
        return <HallTicket />;
      case "Marksheet":
        return <Marksheet />;
      case "Revaluation":
        return <Revaluation />;
      case "Certificate":
        return <Certificate />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <div className=" h-screen shadow-md">
        <SidePanel {...studentProps} />
      </div>
      <div className="w-4/4 bg-gray-100 overflow-y-auto">
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default StudentDashboard;
