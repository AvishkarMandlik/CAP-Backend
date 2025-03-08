import React from "react";

const PersonalDetails = () => {
  return (
<div className="container mx-auto p-4 h-[calc(100vh-8rem)] overflow-y-auto">
  <h2 className="text-2xl font-bold text-center">Savitribai Phule Pune University</h2>
  <h3 className="text-lg font-semibold text-center mt-2">Examination Form Oct/Nov 2024</h3>

  {/* Course Details */}
  <div className="mb-6">
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">PRN</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Eligibility No.</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Total Fee to be Paid</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">PUNCODE</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">College</label>
        <input
          type="text"
          value=""
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  </div>

  {/* Instructions */}
  <p className="text-lg font-semibold mt-4">Instructions to the Candidate:</p>
  <ul className="list-disc ml-5 text-gray-700">
    <li>This Exam form along with fee amount should be submitted to the concerned college.</li>
    <li>Repeater students should attach attested true copy of the latest mark sheet along with this form.</li>
    <li>
      This form will be considered <b>ONLY AFTER APPROVAL</b> from the concerned College Login.
    </li>
  </ul>

  <p className="mt-4 text-lg font-semibold">
    To,<br />Director,<br />Board of Examination & Evaluation, Savitribai Phule Pune University, Pune-411 007.
  </p>
  <p className="mt-2">
    Sir/Madam,<br />I request permission to present myself at the examination courses, mentioned below.
  </p>

  <h4 className="text-lg font-semibold mt-4">1. Personal Details:</h4>
  <div className="grid grid-cols-1 gap-4 mt-2">
    {[
      ["Name of the Applicant", ""],
      ["Name of the Applicant's Mother", ""],
      ["Address for Communication", ""],
      ["Email-ID", ""],
      ["Contact Number", ""],
      ["Gender", ""],
      ["Divyang/ Learning Disable", ""],
      ["Medium of Instruction", ""],
      ["ABC ID", ""],
    ].map(([label, value], index) => (
      <div key={index} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
        </div>
        <div>
          {label === "Address for Communication" ? (
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={value}
  
            />
          ) : (
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={value}
  
            />
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Submit Button */}
  <div className="text-center mt-4">
    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit</button>
  </div>
</div>
  );
};

export default PersonalDetails;
