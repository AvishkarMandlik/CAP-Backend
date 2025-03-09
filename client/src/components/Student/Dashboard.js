import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "tailwind-toastify";

const stepsData = [
  { id: 1, text: "Update Your Basic Information" },
  { id: 2, text: "Fill Your Educational Information" },
  { id: 3, text: "Upload Your Photo and Signature" },
  { id: 4, text: "Select Your Subjects" },
  { id: 5, text: "Make Payment" },
  { id: 6, text: "Submit Application Form Online" },
];

const Dashboard = () => {
  const [steps, setSteps] = useState(
    stepsData.map((step) => ({ ...step, status: "pending" }))
  );
  const [Verified, setVerified] = useState("pending");
  const [Payment, setPayment] = useState("pending");

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (steps[5].status === "completed") {
      VerifyAdmission();
    }
  },[steps])

  function VerifyAdmission() {

    console.log("Verification called");
    axios
      .post("http://localhost:5000/student/checkAdmission", {
        email: JSON.parse(localStorage.getItem("User Data")).email,
      })
      .then((response) => {
        if (response.data.status) {
          if (response.data.verify) {
            setVerified("completed");
            showAlert("success", "Success", "Admission Verified");
          }
        } else {
          showAlert("error", "Error", "Admission Not Verified Yet");
        }
      })
      .catch((error) => {
        console.error(error);
        showAlert("error", "Error", "Some Error Occured");
      });
  }
  
  async function checkStatus() {
    if (localStorage.getItem("personalInfo")) {
      updateStatus(1, "saved");
    }
    if (localStorage.getItem("EducationalInfo")) {
      updateStatus(2, "saved");
    }
    if (localStorage.getItem("PhotoSignature")) {
      updateStatus(3, "saved");
    }
    if (localStorage.getItem("Subjects")) {
      updateStatus(4, "saved");
    }
    if (localStorage.getItem("CoursePayment")) {
      updateStatus(5, "completed");
    }
    
    axios
      .post("http://localhost:5000/student/checkSubmit", {
        email: JSON.parse(localStorage.getItem("User Data")).email,
      })
      .then((response) => {
        if (response.data.status) {
          updateStatus(1, "completed");
          updateStatus(2, "completed");
          updateStatus(3, "completed");
          updateStatus(4, "completed");
          updateStatus(6, "completed");
        }
      });
  }

  // Function to update the status dynamically
  const updateStatus = (id, newStatus) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, status: newStatus } : step
      )
    );
  };

  // Status styles mapping
  const statusStyles = {
    completed: "text-green-600 font-bold",
    saved: "text-yellow-600 font-bold",
    pending: "text-red-600 font-bold",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600 font-semibold mb-3">
          Steps to fill application
        </p>
        <ul className="space-y-2">
          {steps.map((step) => (
            <li
              key={step.id}
              className="text-lg font-medium flex justify-between items-center"
            >
              <div>
                <span className="font-bold">{step.id}.</span>{" "}
                <span className={`${statusStyles[step.status]}`}>
                  [{step.status.charAt(0).toUpperCase() + step.status.slice(1)}]
                </span>{" "}
                <span className="text-gray-800">{step.text}.</span>
              </div>
            </li>
          ))}
          <li className="text-lg font-medium flex justify-between items-center">
            <div>
              <span className="font-bold">7.</span>{" "}
              <span className={`${statusStyles[Verified]}`}>
                [{Verified.charAt(0).toUpperCase() + Verified.slice(1)}]
              </span>{" "}
              <span className="text-gray-800">
                Form Verification by College.
              </span>
            </div>
          </li>
          <li className="text-lg font-medium flex justify-between items-center">
            <div>
              <span className="font-bold">8.</span>{" "}
              <span className={`${statusStyles[Payment]}`}>
                [{Payment.charAt(0).toUpperCase() + Payment.slice(1)}]
              </span>{" "}
              <span className="text-gray-800">
                After Eligible Admission Course Fee Payment.
              </span>
            </div>
          </li>
        </ul>
        {steps[5].status === "completed" ? (
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Print Application Form
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
