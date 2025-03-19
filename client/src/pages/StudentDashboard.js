import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import Footer from "../components/Footer";
import StudentProfile from "../components/Student/StudentProfile";
import ExamForm from "../components/Student/ExamForm";
import HallTicket from "../components/Student/HallTicket";
import Marksheet from "../components/Student/Marksheet";
import Revaluation from "../components/Student/Revaluation";
import Certificate from "../components/Student/Certificate";

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
      case "Results":
          return <Certificate />;
      case "Revaluation":
        return <Revaluation />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white"> */}
          <SidePanel {...studentProps} />
        {/* </div> */}
        <div className="flex-1 p-6 bg-gray-100">{renderActiveComponent()}</div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default StudentDashboard;
