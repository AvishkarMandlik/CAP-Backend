import React from "react";

const PrintAdmissionForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 underline">
        Print Admission Form
      </h2>
      
      {/* Personal Information Section */}
      <div className="mb-6 border p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Date of Birth:</strong> January 1, 2000</p>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>Contact Number:</strong> +91-9876543210</p>
        </div>
      </div>
      
      {/* Educational Information Section */}
      <div className="mb-6 border p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Educational Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Last Exam Passed:</strong> 12th Grade</p>
          <p><strong>Marks Obtained:</strong> 85%</p>
          <p><strong>Year of Passing:</strong> 2022</p>
          <p><strong>Board:</strong> CBSE</p>
        </div>
      </div>
      
      {/* Course Details Section */}
      <div className="mb-6 border p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Course Details</h3>
        <p><strong>Selected Course:</strong> Bachelor of Science (BSc)</p>
        <p><strong>Specialization:</strong> Computer Science</p>
        <p><strong>Duration:</strong> 3 Years</p>
      </div>
      
      {/* Documents Section */}
      <div className="mb-6 border p-4 rounded-md">
        <h3 className="text-lg font-bold mb-2 border-b pb-1">Uploaded Documents</h3>
        <ul className="list-disc pl-5">
          <li>10th Marksheet</li>
          <li>12th Marksheet</li>
          <li>Aadhar Card</li>
          <li>Passport Size Photo</li>
        </ul>
      </div>
      
      {/* Signature Section */}
      <div className="mb-6 flex justify-between">
        <div>
          <p className="font-bold">Applicant's Signature</p>
          <div className="border w-40 h-12 mt-2"></div>
        </div>
        <div>
          <p className="font-bold">Parent/Guardian Signature</p>
          <div className="border w-40 h-12 mt-2"></div>
        </div>
      </div>
      
      {/* Print Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
          Print Form
        </button>
      </div>
    </div>
  );
};

export default PrintAdmissionForm;
