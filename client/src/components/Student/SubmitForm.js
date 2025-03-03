import React, { useState, useEffect } from "react";
import TextView1 from "../ui/TextView1";
import axios from "axios";
import { showAlert } from "tailwind-toastify";

const SubmitForm = () => {
  // State to hold personal, educational info, and documents
  const [personalInfo, setPersonalInfo] = useState(null);
  const [educationalInfo, setEducationalInfo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null); // For modal
  const [photo, setPhoto] = useState(null); // For photo
  const [signature, setSignature] = useState(null); // For signature
  const [Subjects, setSubjects] = useState(null);
  const [SubjectCodes, setSubjectCodes] = useState(null);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem("personalInfo");
    const storedEducationalInfo = localStorage.getItem("EducationalInfo");
    const storedDocuments = localStorage.getItem("PhotoSignature"); // Assuming documents are stored separately

    if (storedPersonalInfo) {
      setPersonalInfo(JSON.parse(storedPersonalInfo));
    }

    if (storedEducationalInfo) {
      setEducationalInfo(JSON.parse(storedEducationalInfo));
    }

    if (storedDocuments) {
      const documents = JSON.parse(storedDocuments);
      setPhoto(documents.photo);
      setSignature(documents.signature);
    }
  }, []);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("personalInfo")).course;
    const storedSubjects = localStorage.getItem("Subjects");
    if (storedSubjects) {
      setSubjectCodes(JSON.parse(storedSubjects));
      axios
        .post("http://localhost:5000/student/GetSubjects", {
          course: [info[0], info[1], info[2]],
          year: info[3],
        })
        .then((response) => {
          console.log(response.data);
          setSubjects(response.data);
        });
    }
  }, [personalInfo]);

  // If data is not yet loaded, show a loading message
  if (!personalInfo || !educationalInfo) {
    return <div className="text-center py-4">Loading information...</div>;
  }

  // Function to handle form submission
  const handleSubmit = async () => {
    if (
      personalInfo &&
      educationalInfo &&
      photo &&
      signature &&
      SubjectCodes &&
      localStorage.getItem("CoursePayment")
    ) {
      axios
        .post("http://localhost:5000/student/newAdmission", {
          email: localStorage.getItem("mail"),
          personalInfo,
          educationalInfo,
          PhotoSignature: { photo, signature },
          Subjects: SubjectCodes,
        })
        .then((response) => {
          if (response.data.status) {
            showAlert(
              "success",
              "Success",
              "Application submitted successfully."
            );
          } else {
            showAlert("error", "Error", "Application submission failed.");
          }
        });
    } else {
      showAlert("error", "Please fill all information before submitting.");
    }
  };

  // Function to open modal with the selected document
  const openModal = (document) => {
    setSelectedDocument(document);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Submit Form</h2>

      {/* Personal Information Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-3">
            <TextView1 title="Name" value={personalInfo.name} />
            <TextView1 title="Address" value={personalInfo.address} />
            <TextView1 title="State" value={personalInfo.state} />
            <TextView1 title="City" value={personalInfo.city} />
            <TextView1 title="Gender" value={personalInfo.gender} />
            <TextView1
              title="Marital Status"
              value={personalInfo.maritalStatus}
            />
            <TextView1 title="Mother's Name" value={personalInfo.motherName} />
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <TextView1 title="Pincode" value={personalInfo.pincode} />
            <TextView1
              title="Local Address"
              value={personalInfo.localAddress}
            />
            <TextView1 title="Date of Birth" value={personalInfo.DOB} />
            <TextView1
              title="Mobile Number"
              value={personalInfo.mobileNumber}
            />
            <TextView1 title="Email" value={personalInfo.email} />
            <TextView1 title="Place of Birth" value={personalInfo.POB} />
            <TextView1 title="Handicap" value={personalInfo.handicap} />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextView1 title="Father's Name" value={personalInfo.fatherName} />
          <TextView1
            title="Father's Mobile Number"
            value={personalInfo.fatherMobileNumber}
          />
          <TextView1
            title="Father's Occupation"
            value={personalInfo.fatherOccupation}
          />
          <TextView1 title="Income" value={personalInfo.income} />
          <TextView1 title="Category" value={personalInfo.category} />
          <TextView1 title="Religion" value={personalInfo.religion} />
          <TextView1 title="Caste" value={personalInfo.caste} />
          <TextView1 title="Blood Group" value={personalInfo.bloodGroup} />
          <TextView1 title="Aadhar Number" value={personalInfo.aadharNumber} />
          <TextView1 title="ABC ID" value={personalInfo.abcid} />
          <TextView1 title="Course" value={personalInfo.course.join(", ")} />
        </div>
      </div>

      {/* Educational Information Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Educational Information
        </h3>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Document
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* FY Marksheet Row */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-700">FY Marksheet</td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {educationalInfo.FYMarksheet ? (
                  <span className="text-green-600 font-medium">Uploaded</span>
                ) : (
                  <span className="text-red-600 font-medium">Not Uploaded</span>
                )}
              </td>
              <td className="py-3 px-4">
                {educationalInfo.FYMarksheet && (
                  <button
                    onClick={() => openModal(educationalInfo.FYMarksheet)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>

            {/* SY Marksheet Row */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-700">SY Marksheet</td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {educationalInfo.SYMarksheet ? (
                  <span className="text-green-600 font-medium">Uploaded</span>
                ) : (
                  <span className="text-red-600 font-medium">Not Uploaded</span>
                )}
              </td>
              <td className="py-3 px-4">
                {educationalInfo.SYMarksheet && (
                  <button
                    onClick={() => openModal(educationalInfo.SYMarksheet)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>

            {/* Aadhar Row */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-700">Aadhar</td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {educationalInfo.aadhar ? (
                  <span className="text-green-600 font-medium">Uploaded</span>
                ) : (
                  <span className="text-red-600 font-medium">Not Uploaded</span>
                )}
              </td>
              <td className="py-3 px-4">
                {educationalInfo.aadhar && (
                  <button
                    onClick={() => openModal(educationalInfo.aadhar)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>

            {/* Final Marksheet Row */}
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-700">
                Final Marksheet
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {educationalInfo.FinalMarksheet ? (
                  <span className="text-green-600 font-medium">Uploaded</span>
                ) : (
                  <span className="text-red-600 font-medium">Not Uploaded</span>
                )}
              </td>
              <td className="py-3 px-4">
                {educationalInfo.FinalMarksheet && (
                  <button
                    onClick={() => openModal(educationalInfo.FinalMarksheet)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Photo and Signature Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Photo and Signature
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Photo</h4>
            {photo ? (
              <img
                src={photo}
                alt="Applicant Photo"
                className="w-48 h-48 object-cover rounded-lg border border-gray-200"
              />
            ) : (
              <p className="text-gray-500">No photo uploaded</p>
            )}
          </div>

          {/* Signature */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Signature
            </h4>
            {signature ? (
              <img
                src={signature}
                alt="Applicant Signature"
                className="w-48 h-24 object-contain rounded-lg border border-gray-200"
              />
            ) : (
              <p className="text-gray-500">No signature uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      {/* Subjects Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Subjects
        </h3>

        {/* Sem 1 Subjects */}
        {Subjects && SubjectCodes ? (
          <>
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              {Subjects.sem1.title}
            </h4>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Sr.No.
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Subject Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Subject Code
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Compulsion
                  </th>
                </tr>
              </thead>
              <tbody>
                {SubjectCodes.sem1.map((subjectCode, index) => {
                  const subject = Subjects.sem1.subjects.find(
                    (sub) => sub.code === subjectCode
                  );

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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-gray-500">Loading Sem1 subjects...</p>
        )}

        {/* Sem 2 Subjects */}
        {Subjects && SubjectCodes ? (
          <>
            <h4 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
              {Subjects.sem2.title}
            </h4>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Sr.No.
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Subject Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Subject Code
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                    Compulsion
                  </th>
                </tr>
              </thead>
              <tbody>
                {SubjectCodes.sem2.map((subjectCode, index) => {
                  const subject = Subjects.sem2.subjects.find(
                    (sub) => sub.code === subjectCode
                  );

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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-gray-500">Loading Sem2 subjects...</p>
        )}
      </div>
      {/* Centered Submit Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer hover:text-yellow-300 active:scale-95" onClick={()=>{handleSubmit()}}>
          Submit Form
        </button>
      </div>

      {/* Modal for Viewing Documents */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 ">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden min-w-[860px]">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-1 border-b border-gray-200 m-0">
              <h3 className="text-lg font-semibold text-gray-800 ms-5 mt-1">
                Document Viewer
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none me-4 mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-1">
              <iframe
                src={`${selectedDocument}`}
                className="w-full h-full border border-gray-200 rounded-lg"
                title="Document Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
