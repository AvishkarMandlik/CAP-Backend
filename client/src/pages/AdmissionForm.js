import React, { useState } from "react";
import SidePanel from "../components/SidePanel";
import PersonalInfo from "../components/Student/Personalinfo";
import EducationalInfo from "../components/Student/Educationalinfo";
import PhotoSignature from "../components/Student/PhotoSignature";
import SelectionSubject from "../components/Student/SelectionSubject";
import CoursePayment from "../components/Student/CoursePayment";
// import SubmitApplication from '../components/Student/SubmitApplication';

function Admission() {
  const [activeComponent, setActiveComponent] = useState("PersonalInfo");

  const studentProps = {
    items: [
      // {
      //   text: "Dashboard",
      //   icon: "fa-solid fa-square-check",
      //   callbackfunc: () => setActiveComponent("Dashboard"),
      // },
      {
        text: "Personal Info",
        icon: "fa fa-address-book",
        callbackfunc: () => setActiveComponent("PersonalInfo"),
      },
      {
        text: "Educational Info",
        icon: "fa-solid fa-repeat",
        callbackfunc: () => setActiveComponent("EducationalInfo"),
      },
      {
        text: "Photo & Signature",
        icon: "fa fa-file-text",
        callbackfunc: () => setActiveComponent("PhotoSignature"),
      },
      {
        text: "Selection of Subject",
        icon: "fa fa-file-text",
        callbackfunc: () => setActiveComponent("SelectionSubject"),
      },
      {
        text: "Course Payment",
        icon: "fa fa-file-text",
        callbackfunc: () => setActiveComponent("CoursePayment"),
      },
      {
        text: "Submit Application",
        icon: "fa fa-file-text",
        callbackfunc: () => setActiveComponent("SubmitApplication"),
      },
      {
        text: "Exit to Main Dashboard",
        icon: "fa fa-file-text",
        link: "/studentdashboard",
      },
    ],
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <div>Dashboard Content</div>; 
      case "PersonalInfo":
        return <PersonalInfo />;
      case "EducationalInfo":
        return <EducationalInfo />;
      case "PhotoSignature":
        return <PhotoSignature />;
      case "SelectionSubject":
        return <SelectionSubject />;
      case "CoursePayment":
        return <CoursePayment />;
      case "SubmitApplication":
        return <div>Submit Application Content</div>; 
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* SidePanel on the left */}
      <div className="w-100 bg-gray-800 text-white">
        <SidePanel {...studentProps} />
      </div>
      {/* Main content area */}
      <div className="flex-1 p-2 bg-gray-100">
        <div className="text-gray-600">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}

export default Admission;