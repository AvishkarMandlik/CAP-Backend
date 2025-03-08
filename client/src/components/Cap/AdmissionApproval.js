import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API calls
import TextView1 from "../ui/TextView1";

const AdmissionApproval = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [Subjects, setSubjects] = useState(null);
  const [SubjectCodes, setSubjectCodes] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  // Fetch unverified documents from the backend
  useEffect(() => {
    const fetchUnverifiedDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/cap/Admissionverification"
        );
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUnverifiedDocuments();
  }, []);

  useEffect(() => {
    if (modalData) {
      const info = modalData.personalInfo.course;
      if (modalData.Subjects) {
        setSubjectCodes(modalData.Subjects);
        axios
          .post("http://localhost:5000/student/GetSubjects", {
            course: [info[0], info[1], info[2]],
            year: info[3],
          })
          .then((response) => {
            console.log(response.data);
            setSubjects(response.data);
            setModal(true);
          });
      }
    } else {
      setSubjects(null);
      setSubjectCodes(null);
      setModal(false);
    }
  }, [modalData]);

  const handleView = (doc) => {
    setModalData(doc);
  };
  const openModal = (document) => {
    setSelectedDocument(document);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedDocument(null);
  };

  // Function to handle verification
  const handleVerify = async (email) => {
    try {
      // Call the backend API to verify the document
      await axios.put(`http://localhost:5000/cap/verifyAdmission`, {
        email: email,
      }); // Replace with your API endpoint

      // Update the local state to remove the verified document
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.email !== email));
    } catch (err) {
      console.error("Error verifying document:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Unverified Admissions
      </h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No unverified documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">
                    Applied For:{" "}
                  </span>{" "}
                  <span className="text-gray-600">
                    {doc.personalInfo.course.toString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Student Name:
                  </span>{" "}
                  <span className="text-gray-600">{doc.personalInfo.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  <span className="text-gray-600">{doc.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Submitted On:
                  </span>{" "}
                  <span className="text-gray-600">{doc.submittedOn}</span>
                </div>
              </div>
              <button
                onClick={() => handleVerify(doc.email)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Verify
              </button>
              <button
                onClick={() => handleView(doc)}
                className=" ms-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Application
              </button>
            </li>
          ))}
        </ul>
      )}
      {modal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col overflow-y-auto min-w-[860px]">
            <div className="flex justify-between items-center p-1 border-b border-gray-200 m-0">
              <h2 className="text-2xl font-bold text-center mb-6 p-6">
                Application Details
              </h2>

              <button
                onClick={() => setModalData(null)}
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
            {/* Personal Information Section */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <TextView1 title="Name" value={modalData.personalInfo.name} />
                  <TextView1
                    title="Address"
                    value={modalData.personalInfo.address}
                  />
                  <TextView1
                    title="State"
                    value={modalData.personalInfo.state}
                  />
                  <TextView1 title="City" value={modalData.personalInfo.city} />
                  <TextView1
                    title="Gender"
                    value={modalData.personalInfo.gender}
                  />
                  <TextView1
                    title="Marital Status"
                    value={modalData.personalInfo.maritalStatus}
                  />
                  <TextView1
                    title="Mother's Name"
                    value={modalData.personalInfo.motherName}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <TextView1
                    title="Pincode"
                    value={modalData.personalInfo.pincode}
                  />
                  <TextView1
                    title="Local Address"
                    value={modalData.personalInfo.localAddress}
                  />
                  <TextView1
                    title="Date of Birth"
                    value={modalData.personalInfo.DOB}
                  />
                  <TextView1
                    title="Mobile Number"
                    value={modalData.personalInfo.mobileNumber}
                  />
                  <TextView1
                    title="Email"
                    value={modalData.personalInfo.email}
                  />
                  <TextView1
                    title="Place of Birth"
                    value={modalData.personalInfo.POB}
                  />
                  <TextView1
                    title="Handicap"
                    value={modalData.personalInfo.handicap}
                  />
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextView1
                  title="Father's Name"
                  value={modalData.personalInfo.fatherName}
                />
                <TextView1
                  title="Father's Mobile Number"
                  value={modalData.personalInfo.fatherMobileNumber}
                />
                <TextView1
                  title="Father's Occupation"
                  value={modalData.personalInfo.fatherOccupation}
                />
                <TextView1
                  title="Income"
                  value={modalData.personalInfo.income}
                />
                <TextView1
                  title="Category"
                  value={modalData.personalInfo.category}
                />
                <TextView1
                  title="Religion"
                  value={modalData.personalInfo.religion}
                />
                <TextView1 title="Caste" value={modalData.personalInfo.caste} />
                <TextView1
                  title="Blood Group"
                  value={modalData.personalInfo.bloodGroup}
                />
                <TextView1
                  title="Aadhar Number"
                  value={modalData.personalInfo.aadharNumber}
                />
                <TextView1
                  title="ABC ID"
                  value={modalData.personalInfo.abcid}
                />
                <TextView1
                  title="Course"
                  value={modalData.personalInfo.course.join(", ")}
                />
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
                    <td className="py-3 px-4 text-sm text-gray-700">
                      FY Marksheet
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {modalData.educationalInfo.FYMarksheet ? (
                        <span className="text-green-600 font-medium">
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Not Uploaded
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {modalData.educationalInfo.FYMarksheet && (
                      <button
                        onClick={() =>
                          openModal(modalData.educationalInfo.FYMarksheet)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        View
                      </button>
                    )}
                    </td>
                  </tr>

                  {/* SY Marksheet Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      SY Marksheet
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {modalData.educationalInfo.SYMarksheet ? (
                        <span className="text-green-600 font-medium">
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Not Uploaded
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {modalData.educationalInfo.SYMarksheet && (
                      <button
                        onClick={() =>
                          openModal(modalData.educationalInfo.SYMarksheet)
                        }
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
                      {modalData.educationalInfo.aadhar ? (
                        <span className="text-green-600 font-medium">
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Not Uploaded
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {modalData.educationalInfo.aadhar && (
                      <button
                        onClick={() =>
                          openModal(modalData.educationalInfo.aadhar)
                        }
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
                      {modalData.educationalInfo.FinalMarksheet ? (
                        <span className="text-green-600 font-medium">
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Not Uploaded
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {modalData.educationalInfo.FinalMarksheet && (
                      <button
                        onClick={() =>
                          openModal(modalData.educationalInfo.FinalMarksheet)
                        }
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
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    Photo
                  </h4>
                  {modalData.PhotoSignature.photo ? (
                    <img
                      src={modalData.PhotoSignature.photo}
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
                  {modalData.PhotoSignature.signature ? (
                    <img
                      src={modalData.PhotoSignature.signature}
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
        </div>
      )}
    </div>
  );
};

export default AdmissionApproval;
