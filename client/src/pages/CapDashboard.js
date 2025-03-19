import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import AdmissionApproval from "../components/Cap/AdmissionApproval";
import CourseAdd from "../components/Cap/CourseAdd";
import Dashboard from "../components/Cap/Dashboard";
import CourseUpdate from "../components/Cap/CourseUpdate";
import Footer from "../components/Footer";
import HallTicketGeneration from "../components/Cap/HallTicketGeneration";

function CapDashboard() {
  const [AdmissionApprovalCheck, setAdmissionApproval] = useState(false);
  const [DashboardCheck, setDashboard] = useState(true);
  const [CourseUpdateCheck, setCourseUpdate] = useState(false);
  const [CourseAddCheck, setCourseAdd] = useState(false);
  const [HallTicketGenerationCheck, setHallTicketGeneration] = useState(false);
  const [MarksheetCheck, setMarksheet] = useState(false);
  const [AtktFailPassCheck, setAtktFailPass] = useState(false);
  const [RevaluationCheck, setRevaluation] = useState(false);
  const [AnalysisCheck, setAnalysis] = useState(false);

  const capProps = {
    title: "CAP DASHBOARD",
    items: [
      {
        text: "Dashboard",
        icon: "fa-solid fa-house",
        callbackfunc: () => {
          ManagePage("Dashboard");
        },
      },
      {
        text: "Admission Approval",
        icon: "fa-solid fa-user-check",
        callbackfunc: () => {
          ManagePage("AdmissionApproval");
        },
      },
      // {
      //   text: "Course Update",
      //   icon: "fa-solid fa-square-check",
      //   callbackfunc: () => {
      //     ManagePage("CourseUpdate");
      //   },
      // },
      {
        text: "Course Addition",
        icon: "fa-solid fa-square-check",
        callbackfunc: () => {
          ManagePage("CourseAdd");
        },
      },
      {
        text: "Hall Ticket Generation",
        icon: "fa-solid fa-ticket-alt",
        callbackfunc: () => {
          ManagePage("HallTicketGeneration");
        },
      },
      {
        text: "Marksheet",
        icon: "fa-regular fa-file-lines",
        callbackfunc: () => {
          ManagePage("Marksheet");
        },
      },
      {
        text: "ATKT/FAIL/PASS",
        icon: "fa-solid fa-f",
        callbackfunc: () => {
          ManagePage("AtktFailPass");
        },
      },
      {
        text: "REVALUATION",
        icon: "fa-solid fa-repeat",
        callbackfunc: () => {
          ManagePage("Revaluation");
        },
      },
      {
        text: "ANALYSIS",
        icon: "fa-solid fa-square-poll-vertical",
        callbackfunc: () => {
          ManagePage("Analysis");
        },
      },
    ],
    bodyContent: (
      <div className="NewStream mt-6">
        <input
          type="text"
          name="stream"
          id="stream"
          className="border p-2 mr-2"
          placeholder="Enter Stream"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => alert("Stream added!")}
        >
          Add
        </button>
      </div>
    ),
  };

  function turnFalse() {
    setAdmissionApproval(false);
    setDashboard(false);
    setCourseUpdate(false);
    setCourseAdd(false);
    setHallTicketGeneration(false);
    setMarksheet(false);
    setAtktFailPass(false);
    setRevaluation(false);
    setAnalysis(false);
  }

  function ManagePage(page) {
    if (page === "Dashboard") {
      turnFalse();
      setDashboard(true);
    } else if (page === "AdmissionApproval") {
      turnFalse();
      setAdmissionApproval(true);
    } else if (page === "CourseUpdate") {
      turnFalse();
      setCourseUpdate(true);
    } else if (page === "CourseAdd") {
      turnFalse();
      setCourseAdd(true);
    } else if (page === "HallTicketGeneration") {
      turnFalse();
      setHallTicketGeneration(true);
    }
    else if (page === "Marksheet") {
      turnFalse();
      setMarksheet(true);
    } else if (page === "AtktFailPass") {
      turnFalse();
      setAtktFailPass(true);
    } else if (page === "Revaluation") {
      turnFalse();
      setRevaluation(true);
    } else if (page === "Analysis") {
      turnFalse();
      setAnalysis(true);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <div className="flex flex-1">
        <div className="w-60 bg-gray-800 text-white"> */}
      <SidePanel {...capProps} />
      {/* </div> */}

      {/* <div className="flex-1 p-2 bg-gray-100"> */}
      {/* <div className="text-gray-600"> */}
        {AdmissionApprovalCheck ? <AdmissionApproval /> : null}
        {DashboardCheck ? <Dashboard /> : null}
        {CourseUpdateCheck ? <CourseUpdate /> : null}
        {CourseAddCheck ? <CourseAdd /> : null}
        {HallTicketGenerationCheck ? <HallTicketGeneration /> : null}
        {/* </div> */}
        {/* </div> */}
      {/* </div> */}

      <Footer />
    </div>
  );
}

export default CapDashboard;
