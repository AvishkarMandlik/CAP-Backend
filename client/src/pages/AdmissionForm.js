import SidePanel from "../components/SidePanel";
import { useState } from "react";
import Dashboard from "../components/Student/Dashboard";
import PersonalInfo from "../components/Student/Personalinfo";
import EducationalInfo from "../components/Student/Educationalinfo";
import PhotoSignature from "../components/Student/PhotoSignature";
import SelectionSubject from "../components/Student/SelectionSubject";
import CoursePayment from "../components/Student/CoursePayment";
import SubmitForm from "../components/Student/SubmitForm";

// import SubmitApplication from '../components/Student/SubmitApplication';

function Admission() {
  const [DashboardCheck, setDashboard] = useState(true);
  const [PersonalInfoCheck, setPersonalInfo] = useState(false);
  const [EducationalInfoCheck, setEducationInfo] = useState(false);
  const [PhotoSignatureCheck, setPhotoSignature] = useState(false);
  const [SelectionSubjectCheck, setSelectionSubject] = useState(false);
  const [CoursePaymentCheck, setCoursePayment] = useState(false);
  const [SubmitApplicationCheck, setSubmitApplication] = useState(false);

  const studentProps = {
    items: [
      {
        text: "Dashboard",
        icon: "fa-solid fa-square-check",
        callbackfunc: () => {
          ManagePage("Dashboard");
        },
      },
      {
        text: "Personal Info",
        icon: "fa fa-address-book",
        callbackfunc: () => {
          ManagePage("PersonalInfo");
        },
      },
      {
        text: "Educational Info",
        icon: "fa-solid fa-repeat",
        callbackfunc: () => {
          ManagePage("EducationalInfo");
        },
      },
      {
        text: "Photo & Signature",
        icon: "fa fa-file-text",
        callbackfunc: () => {
          ManagePage("PhotoSignature");
        },
      },
      {
        text: "Selection of Subject",
        icon: "fa fa-file-text",
        callbackfunc: () => {
          ManagePage("SelectionSubject");
        },
      },
      {
        text: "Make Payment",
        icon: "fa fa-file-text",
        callbackfunc: () => {
          ManagePage("CoursePayment");
        },
      },
      {
        text: "Submit Application",
        icon: "fa fa-file-text",
        callbackfunc: () => {
          ManagePage("SubmitApplication");
        },
      },
      {
        text: "Exit to Main Dashboard",
        icon: "fa fa-file-text",
        link: "/studentdashboard",
      },
    ],
  };
  function turnFalse() {
    setDashboard(false);
    setPersonalInfo(false);
    setEducationInfo(false);
    setPhotoSignature(false);
    setSelectionSubject(false);
    setCoursePayment(false);
    setSubmitApplication(false);
  }
  function ManagePage(page) {
    if (page === "PersonalInfo") {
      turnFalse();
      setPersonalInfo(true);
    } else if (page === "Dashboard") {
      turnFalse();
      setDashboard(true);
    } else if (page === "EducationalInfo") {
      turnFalse();
      setEducationInfo(true);
    } else if (page === "PhotoSignature") {
      turnFalse();
      setPhotoSignature(true);
    } else if (page === "SelectionSubject") {
      turnFalse();
      setSelectionSubject(true);
    } else if (page === "CoursePayment") {
      turnFalse();
      setCoursePayment(true);
    } else if (page === "SubmitApplication") {
      turnFalse();
      setSubmitApplication(true);
    }
  }
  return (
    <div className="flex min-h-screen">
      {/* SidePanel on the left */}
      <div className="w-70 bg-gray-800 text-white">
        <SidePanel {...studentProps} />
      </div>
      <div className="flex-1 p-2 bg-gray-100">
        <div className="text-gray-600">
          {DashboardCheck ? <Dashboard /> : null}
          {PersonalInfoCheck ? <PersonalInfo func={ManagePage}/> : null}
          {EducationalInfoCheck ? <EducationalInfo func={ManagePage}/> : null}
          {PhotoSignatureCheck ? <PhotoSignature func={ManagePage}/> : null}
          {SelectionSubjectCheck ? <SelectionSubject func={ManagePage}/> : null}
          {CoursePaymentCheck ? <CoursePayment /> : null}
          {SubmitApplicationCheck ? <SubmitForm/> : null} 
        </div>
      </div>
    </div>
  );
}

export default Admission;

// import React, { useState } from 'react';
// import SidePanel from '../components/SidePanel';
// import Personalinfo from '../components/Student/Personalinfo';
// import Educationalinfo from '../components/Student/Educationalinfo';
// // import PhotoSignature from '../components/Student/Photosignature';
// // import SelectionSubject from '../components/Student/Selectionsubject';
// // import CoursePayment from '../components/Student/Coursepayment';
// // import SubmitApplication from '../components/Student/Submitapplication';

// function Admission() {
//   const [activeComponent, setActiveComponent] = useState("PersonalInfo"); // Default component

//   // Function to handle menu clicks
//   const handleMenuClick = (component) => {
//     setActiveComponent(component);
//   };

//   const studentProps = {
//     items: [
//       { text: "Dashboard", icon: "fa-solid fa-square-check", link: "#" },
//       { text: "Personal Info", icon: "fa fa-address-book", link:"", onClick: () => handleMenuClick("PersonalInfo") },
//       { text: "Educational Info", icon: "fa-solid fa-repeat", link: "", onClick: () => handleMenuClick("Educationalinfo") },
//       { text: "Photo & Signature", icon: "fa fa-file-text", link: "#", onClick: () => handleMenuClick("PhotoSignature") },
//       { text: "Selection of Subject", icon: "fa fa-file-text", link: "#", onClick: () => handleMenuClick("SelectionSubject") },
//       { text: "Course Payment", icon: "fa fa-file-text", link: "#", onClick: () => handleMenuClick("CoursePayment") },
//       { text: "Submit Application", icon: "fa fa-file-text", link: "#", onClick: () => handleMenuClick("SubmitApplication") },
//       { text: "Exit to Main Dashboard", icon: "fa fa-file-text", link: "/studentdashboard" }
//     ],
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* SidePanel on the left */}
//       <div className="w-100 bg-gray-800 text-white">
//         <SidePanel {...studentProps} />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 p-6 bg-gray-100">
//         <div className="mt-4 text-gray-600">
//           {activeComponent === "PersonalInfo" && <Personalinfo />}
//           {activeComponent === "EducationalInfo" && <Educationalinfo />}
//           {/* {activeComponent === "PhotoSignature" && <PhotoSignature />} */}
//           {/* {activeComponent === "SelectionSubject" && <SelectionSubject />} */}
//           {/* {activeComponent === "CoursePayment" && <CoursePayment />} */}
//           {/* {activeComponent === "SubmitApplication" && <SubmitApplication />} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admission;
