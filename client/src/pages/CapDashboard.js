import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import AdmissionApproval from "../components/Cap/AdmissionApproval";
import CourseAdd from "../components/Cap/CourseAdd";
import Dashboard from "../components/Cap/Dashboard";
import ExamFormOpen from "../components/Cap/ExamFormOpen";
import Footer from "../components/Footer";

function CapDashboard() {
  const [AdmissionApprovalCheck, setAdmissionApproval] = useState(false);
  const [DashboardCheck, setDashboard] = useState(true);
  const [CourseAddCheck, setCourseAdd] = useState(false);
  const [ExamFormCheck, setExamForm] = useState(false);
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
        icon: "fa-solid fa-house",
        callbackfunc: () => {
          ManagePage("AdmissionApproval");
        },
      },

      {
        text: "Course Addition",
        icon: "fa-solid fa-square-check",
        callbackfunc: () => {
          ManagePage("CourseAdd");
        },
      },
      {
        text: "Exam Form Management",
        icon: "fa-solid fa-square-check",
        callbackfunc: () => {
          ManagePage("ExamFormOpen");
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
  };

  function turnFalse() {
    setAdmissionApproval(false);
    setDashboard(false);
    setCourseAdd(false);
    setExamForm(false);
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
    } else if (page === "CourseAdd") {
      turnFalse();
      setCourseAdd(true);
    }
    else if (page === "ExamFormOpen") {
      turnFalse();
      setExamForm(true);

    } else if (page === "Marksheet") {
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
    <div className="flex min-h-screen">
      <SidePanel {...capProps} />
        {AdmissionApprovalCheck ? <AdmissionApproval /> : null}
        {DashboardCheck ? <Dashboard /> : null}
        {CourseAddCheck ? <CourseAdd /> : null}
        {ExamFormCheck ? <ExamFormOpen /> : null}

    </div>
  );
}

export default CapDashboard;
