import React from "react";

function ApplicationForm() {
  return (
    <div className="text-center p-2">
      {/* Header Section */}
      <div className="mb-4">
        <strong className="text-xl text-black">
          Dr. D. Y. Patil Unitech Society's{" "}
        </strong>

        <h1 className="text-2xl font-bold mt-2 mb-1">
          Dr. D.Y. Patil Arts, Commerce & Science College
        </h1>
        <p className="text-lg">Pimpri, Pune - 411018</p>

        <small className="text-sm block">
          (Affiliated to Savitribai Phule Pune University and Recognized by Govt. of Maharashtra)
        </small>
        <small className="text-sm block">
          ID No. PU/PN/ACS/111/1995 Re-accredited by NAAC with A Grade (CGPA 3.55 out of 4)
        </small>
        <small className="text-sm block">
          ISO 9001: 2008 and 14001: 2004 Certified
        </small>
        <small className="text-sm block">
          Recipient of Best College Award of SPPU for Academic Year 2023-24
        </small>
      </div>

      {/* Application Form Title */}
      <div className="mb-4">
        <b className="text-xl">
          APPLICATION FORM FOR ADMISSION &nbsp;
          <span>Master Of Computer Science</span>
        </b>
        <p className="text-lg mt-2">
          Admission for the Class{" "}
          <b>S.Y.M.Sc.(Comp. Sci.)</b> Year <b>2024-2025</b>
        </p>
      </div>
    </div>
  );
}

export default ApplicationForm;