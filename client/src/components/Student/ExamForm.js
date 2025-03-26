import React from "react";
import { useState, useEffect } from "react";
import API from "../services/api";
import { currentUser } from "../../utils/currentUser";
import Swal from "sweetalert2";

const ExamForm = ({ type, setTable, course }) => {
  console.log(course.split("-")[4]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(["no"]);
  const [SubjectData, setSubjectData] = useState({});
  const [FeesContent, setFeesContent] = useState({
    "Form Fee": 30,
    "Exam Fee": 1360,
    "Passing Certificate Fee": 145,
    "CAP Fee": 0,
    "Statement Of Marks Fee": 145,
    "Project Fee/Dissertation": 510,
    "EVS Fee": 0,
    "Internal Marks Fee": 40,
    "Departmental Fee": 0,
    "Transcript Fee": 0,
    "Late Fee": 0,
    "Fine Fee": 0,
  });

  useEffect(() => {
    API.post("/student/getAdmission", { email: currentUser.email }).then(
      (res) => {
        if (res.data.status) {
          setUserData(res.data.adm);
          console.log(res.data.adm);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (userData) {
      API.post("/student/GetSubjects", {
        course: userData.personalInfo.course.slice(0, 3),
        year: userData.personalInfo.course[3],
      }).then((res) => {
        if (res.data) {
          setSubjectData(res.data);
        }
      });
    }
  }, [userData]);

  return (
    <div className="bg-gray-100  h-screen p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Personal Details Form
        </h1>
        <form>
          {/* Grid container for pairs of fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name of the Applicant */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="applicant-name"
              >
                Name of the Applicant
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="applicant-name"
                type="text"
                value={userData?.personalInfo?.name}
                readOnly
              />
            </div>

            {/* Name of the Applicant's Mother */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mother-name"
              >
                Name of the Applicant's Mother
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mother-name"
                type="text"
                value={userData?.personalInfo?.motherName}
                readOnly
              />
            </div>

            {/* Address for Communication */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address for Communication
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                value={userData?.personalInfo?.localAddress}
                readOnly
              />
            </div>

            {/* Email ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={currentUser.email}
                readOnly
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contact"
              >
                Contact Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contact"
                type="text"
                value={userData?.personalInfo?.mobileNumber}
                readOnly
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gender"
                type="text"
                value={userData?.personalInfo?.gender}
                readOnly
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                value={userData?.personalInfo?.category}
                readOnly
              />
            </div>

            {/* Divyang/Learning Disable */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="divyang"
              >
                Divyang/Learning Disable
              </label>
              <select
                value={formData[0]}
                onChange={(e) => {
                  const updatedFormData = formData.map((item, index) =>
                    index === 0 ? e.target.value : item
                  );
                  setFormData(updatedFormData);
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Medium of Instruction */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="medium"
              >
                Medium of Instruction
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="medium"
                type="text"
                value="English"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="medium"
              >
                ABC ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="medium"
                type="text"
                value={userData?.personalInfo?.abcid}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
      <div>
        {type === "regular" && userData && (
          <table id="subjectTable">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Compulsion</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.Subjects[course.split("-")[4].toLowerCase()].map(
                (subjectCode, index) => {
                  const subject = SubjectData?.[
                    course.split("-")[4].toLowerCase()
                  ]?.subjects?.find((sub) => sub.code === subjectCode);

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {subject ? subject.name : "N/A"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {subjectCode}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {subject ? subject.compulsion : "N/A"}
                      </td>
                      <td></td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
        <table id="feesTable">
          <thead>
            <tr>
              <th>Fee type</th>
              <th>Fee Amount</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(FeesContent).map((feeType) => (
              <tr
                key={feeType}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors leading-none"
              >
                <td>{feeType}</td>
                <td>{FeesContent[feeType]}</td>
                <td></td>
              </tr>
            ))}
            <tr className="font-bold border-b border-black hover:bg-gray-50 transition-colors leading-none">
              <td>Total</td>
              <td>{Object.values(FeesContent).reduce((a, b) => a + b, 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamForm;
