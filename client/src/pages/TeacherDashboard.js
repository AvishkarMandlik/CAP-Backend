import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import InternalMarksEntry from "../components/Teacher/InternalMarksEntry";
import EditInternalMarks from "../components/Teacher/EditInternalMarks";
import ExternalMarksEntry from "../components/Teacher/ExternalMarksEntry";
import EditExternalMarks from "../components/Teacher/EditExternalMarks";
import ViewStatus from "../components/Teacher/ViewStatus";
import TeacherMarksDashboard from "../components/Teacher/TeacherMarksDashboard";
import Footer from "../components/Footer";

function TeacherDashboard() {
  const [activeComponent, setActiveComponent] = useState(
    "TeacherMarksDashboard"
  );

  const teacherProps = {
    title: "TEACHER DASHBOARD",
    items: [
      {
        text: "Dashboard",
        icon: "fa-solid fa-house",
        callbackfunc: () => setActiveComponent("TeacherMarksDashboard"),
      },
      {
        text: "Int. Examiner - Marks Entry and Absentee",
        icon: "fa-solid fa-clipboard-list",
        callbackfunc: () => setActiveComponent("InternalMarksEntry"),
      },
      {
        text: "Int. Examiner - Edit Permission Internal",
        icon: "fa-solid fa-pen-to-square",
        callbackfunc: () => setActiveComponent("EditInternalMarks"),
      },
      {
        text: "Ext. Examiner - Marks Entry and Absentee",
        icon: "fa-solid fa-file-signature",
        callbackfunc: () => setActiveComponent("ExternalMarksEntry"),
      },
      {
        text: "Ext. Examiner - Edit Permission External",
        icon: "fa-solid fa-user-edit",
        callbackfunc: () => setActiveComponent("EditExternalMarks"),
      },
      {
        text: "View Status",
        icon: "fa-solid fa-chart-bar",
        callbackfunc: () => setActiveComponent("ViewStatus"),
      },
    ],
    content: "Welcome, teacher! Manage your tasks here.",
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "TeacherMarksDashboard":
        return <TeacherMarksDashboard />;
      case "InternalMarksEntry":
        return <InternalMarksEntry />;
      case "EditInternalMarks":
        return <EditInternalMarks />;
      case "ExternalMarksEntry":
        return <ExternalMarksEntry />;
      case "EditExternalMarks":
        return <EditExternalMarks />;
      case "ViewStatus":
        return <ViewStatus />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
          <SidePanel {...teacherProps} />
        <div className="flex-1 p-6 bg-gray-100">{renderActiveComponent()}</div>

    </div>
  );
}

export default TeacherDashboard;
