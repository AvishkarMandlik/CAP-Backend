import React, { useState, useEffect } from 'react';
import API from '../components/services/api';

const ApplicationForm = () => {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admission data based on appNo
  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await API.get('http://localhost:5000/student/getAdmission/2');
        console.log('Application Form API Response:', response.data);

        if (response.data) {
          // Transform the data to match the expected structure
          const transformedData = {
            AppNo: response.data.data.AppNo,
            MothersName: response.data.data.personalInfo.motherName,
            CandidateName: response.data.data.personalInfo.name,
            AadharCardNo: response.data.data.personalInfo.aadharNumber,
            MobileNo: response.data.data.personalInfo.mobileNumber,
            EmailID: response.data.data.personalInfo.email,
            DateOfBirth: response.data.data.personalInfo.DOB,
            PlaceOfBirth: response.data.data.personalInfo.POB,
            BloodGroup: response.data.data.personalInfo.bloodGroup,
            OrganDonation: response.data.handicap === "No" ? "No" : "Yes",
            Nationality: "Indian", // Assuming nationality is Indian
            StateOfDomicile: response.data.data.personalInfo.state,
            Gender: response.data.data.personalInfo.gender,
            MaritalStatus: response.data.data.personalInfo.maritalStatus,
            Religion: response.data.data.personalInfo.religion,
            Category: response.data.data.personalInfo.category,
            Caste: response.data.data.personalInfo.caste,
            PresentAddress: response.data.data.personalInfo.localAddress,
            PermanentAddress: response.data.data.personalInfo.address,
            MotherTongue: "Marathi", // Assuming mother tongue is Marathi
            ExServiceMan: "No", // Assuming not an ex-serviceman
            FeesCategory: response.data.data.personalInfo.category,
            DivyangCategory: response.data.data.personalInfo.handicap === "No" ? "No" : "Yes",
            DivyangNo: response.data.data.personalInfo.handicap === "No" ? "----" : "123456", // Example value
            RuralUrban: response.data.data.personalInfo.city === "AHMEDNAGAR" ? "Urban" : "Rural",
            PhotoURL: response.data.data.PhotoSignature.photo,
            SignatureURL: response.data.data.PhotoSignature.signature,
            ParentsName: response.data.data.personalInfo.fatherName,
            ParentsAddress: response.data.data.personalInfo.address,
            ParentsMobileNo: response.data.data.personalInfo.fatherMobileNumber,
            ParentsEmailID: response.data.data.personalInfo.email,
            ParentsOccupation: response.data.data.personalInfo.fatherOccupation,
            CentralGovtEmployee: "No", // Assuming not a central govt employee
            Relation: "Father",
            AnnualIncome: response.data.data.personalInfo.income,
            AcademicInfo: [
              {
                Exam: response.data.lastExam,
                BoardUniversity: "Savitribai Phule Pune University",
                YearOfPassing: "2023",
                CenterSeatMark: "Pune",
                ObtainedMarks: "450",
                TotalMarks: "600",
                Percentage: "75",
                SchoolCollege: "Dr. D. Y. Patil College",
              },
            ],
            SubjectsOfChoice: response.data.data.Subjects.sem1.map((subject, index) => ({
              SubjectName: "subjectName",
              SubjectCode: subject,
              Semester: "Semester 1",
            })),
          };

          setAdmissionData(transformedData);
        } else {
          setError("No data found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!admissionData) {
    return <div>No admission data found.</div>;
  }

  return (
    <>
      <div className="font-sans">
        {/* First Page */}
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md print:shadow-none print:p-1 print:page-break-after-always">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-6 border border-gray-400">
            {/* Logo */}
            <div className="md:col-span-1 p-4 border-b md:border-b-0 md:border-r border-gray-400 flex items-center justify-center">
              <div className="text-4xl font-bold text-red-800">D'PU</div>
            </div>
            
            {/* College Info */}
            <div className="md:col-span-5 p-4 text-center">
              <p className="text-sm">Dr. D. Y. Patil Unitech Society</p>
              <h1 className="text-xl font-bold">Dr. D. Y. Patil Arts, Commerce & Science College</h1>
              <p className="text-sm">Pimpri, Pune - 411018</p>
              <p className="text-xs">(Affiliated to Savitribai Phule University ID. NO PUPU/NS/AC/111/1995)</p>
              <p className="text-xs">Phone:020-27805899,Email:info.acs@dypvp.edu.in</p>
              <h2 className="text-lg font-bold mt-2">APPLICATION FORM FOR ADMISSION</h2>
              <p className="text-sm">Admission for the Course F.Y.M.Sc.(Comp. Sci.)</p>
              <p className="text-sm">Year 2023-2024</p>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 mt-2 gap-0">
            <div className="col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-400">
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Application No:</span> {admissionData.AppNo}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Mother's Name:</span> {admissionData.MothersName}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Candidate's Name:</span> {admissionData.CandidateName}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Aadhar Card No:</span> {admissionData.AadharCardNo}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Mobile No:</span> {admissionData.MobileNo}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Email ID:</span> {admissionData.EmailID}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Date of Birth:</span> {admissionData.DateOfBirth}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Place of Birth:</span> {admissionData.PlaceOfBirth}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Blood Group:</span> {admissionData.BloodGroup}</p>
                  <p className="text-sm"><span className="font-semibold">Organ Donation:</span> {admissionData.OrganDonation}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Nationality:</span> {admissionData.Nationality}</p>
                  <p className="text-sm"><span className="font-semibold">State of Domicile:</span> {admissionData.StateOfDomicile}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Gender:</span> {admissionData.Gender}</p>
                  <p className="text-sm"><span className="font-semibold">Marital Status:</span> {admissionData.MaritalStatus}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Religion:</span> {admissionData.Religion}</p>
                  <p className="text-sm"><span className="font-semibold">Category:</span> {admissionData.Category}</p>
                  <p className="text-sm"><span className="font-semibold">Caste:</span> {admissionData.Caste}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Present Address:</span> {admissionData.PresentAddress}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Permanent Address:</span> {admissionData.PermanentAddress}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Mother Tongue:</span> {admissionData.MotherTongue}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">EX.ServiceMan:</span> {admissionData.ExServiceMan}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Fees Category:</span> {admissionData.FeesCategory}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Divyang Category:</span> {admissionData.DivyangCategory}</p>
                </div>
                <div className="p-2 border-b md:border-r border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Divyang No:</span> {admissionData.DivyangNo}</p>
                </div>
                <div className="p-2 border-b border-gray-400">
                  <p className="text-sm"><span className="font-semibold">Rural/Urban:</span> {admissionData.RuralUrban}</p>
                </div>
              </div>
            </div>
            
            {/* Photo and Signature */}
            <div className="col-span-1">
              <div className="border border-gray-400 h-full flex flex-col">
                <div className="border-b border-gray-400 py-5 flex justify-center">
                  <div className="bg-blue-100 h-42 w-40 flex items-center justify-center border border-gray-400">
                    <img src={admissionData.PhotoURL} alt="Student" className="max-h-full w-full" />
                  </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                  <div className="bg-gray-100 h-16 w-36 mb-2 border border-gray-400">
                    <img src={admissionData.SignatureURL} alt="Student" className="max-h-full w-full" />
                  </div>
                  <p className="text-sm text-center">Signature of the Candidate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Parents Information */}
          <div className="mt-2">
            <div className="bg-gray-200 p-2 text-center font-semibold border border-gray-400">
              INFORMATION OF THE PARENT'S / GUARDIAN
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-b border-gray-400">
              <div className="p-2 border-b md:border-r border-gray-400">
                <p className="text-sm"><span className="font-semibold">Parent's Name:</span> {admissionData.ParentsName}</p>
              </div>
              <div className="p-2 border-b border-gray-400">
                <p className="text-sm"><span className="font-semibold">Address:</span> {admissionData.ParentsAddress}</p>
              </div>
              <div className="p-2 border-b md:border-r border-gray-400">
                <p className="text-sm"><span className="font-semibold">Parent's Mobile No:</span> {admissionData.ParentsMobileNo}</p>
              </div>
              <div className="p-2 border-b border-gray-400">
                <p className="text-sm"><span className="font-semibold">Email ID:</span> {admissionData.ParentsEmailID}</p>
              </div>
              <div className="p-2 border-b md:border-r border-gray-400">
                <p className="text-sm"><span className="font-semibold">Occupation:</span> {admissionData.ParentsOccupation}</p>
              </div>
              <div className="p-2 border-b border-gray-400">
                <p className="text-sm"><span className="font-semibold">Central Govt. Employee:</span> {admissionData.CentralGovtEmployee}</p>
              </div>
              <div className="p-2 md:border-r border-gray-400">
                <p className="text-sm"><span className="font-semibold">Relation:</span> {admissionData.Relation}</p>
              </div>
              <div className="p-2">
                <p className="text-sm"><span className="font-semibold">Annual Income:</span> {admissionData.AnnualIncome}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="mt-2">
            <div className="bg-gray-200 p-2 text-center font-semibold border border-gray-400">
              ACADEMIC INFORMATION (PREVIOUS EXAMINATION PASSED)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border border-gray-400 text-sm">Exam</th>
                    <th className="p-2 border border-gray-400 text-sm">H.S.C Board/ University Pune</th>
                    <th className="p-2 border border-gray-400 text-sm">Year of Passing</th>
                    <th className="p-2 border border-gray-400 text-sm">Center & Seat Mark</th>
                    <th className="p-2 border border-gray-400 text-sm">Obtained/Total Marks</th>
                    <th className="p-2 border border-gray-400 text-sm">Percentage</th>
                    <th className="p-2 border border-gray-400 text-sm">School/College from Which</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionData.AcademicInfo.map((info, index) => (
                    <tr key={index}>
                      <td className="p-2 border border-gray-400 text-sm">{info.Exam}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.BoardUniversity}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.YearOfPassing}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.CenterSeatMark}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.ObtainedMarks}/{info.TotalMarks}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.Percentage}</td>
                      <td className="p-2 border border-gray-400 text-sm">{info.SchoolCollege}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-2">
            <div className="bg-gray-200 p-2 text-center font-semibold border border-gray-400">
              SUBJECTS OF CHOICE
            </div>
            <table border="1" cellpadding="10" cellspacing="0">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Subject Name</th>
                  <th>Subject Code</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {admissionData.SubjectsOfChoice.map((subject, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{subject.SubjectName}</td>
                    <td>{subject.SubjectCode}</td>
                    <td>{subject.Semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Place :</p>
              <p className="text-sm">Date : 01-07-2023</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-gray-100 w-34 mb-2 border border-gray-400">
                <img src={admissionData.SignatureURL} alt="Student" className="max-h-full max-w-full" />
              </div>
              <p className="text-sm">Signature of the Candidate</p>
            </div>
          </div>
        </div>

        {/* Second Page */}
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md print:shadow-none print:p-1 print:page-break-after-always">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 border-b pb-2">
            <div className="flex items-center mb-2 sm:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div className="ml-2">
                <p className="text-sm">Place :</p>
                <p className="text-sm">Date : 01-07-2023</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 w-full sm:w-auto text-center text-sm">
              <div className="px-2 font-medium">Document Verification</div>
              <div className="px-2 font-medium">Office Superintendent</div>
              <div className="px-2 font-medium">Principal</div>
            </div>
          </div>
                
          {/* Student Undertaking Section */}

          
          <div className="mb-6">
            <h2 className="text-center font-bold mb-3 border-b pb-1">UNDERTAKING BY THE STUDENT</h2>
            
            <ol className="list-decimal pl-6 text-sm space-y-2">
              <li>I bind myself to abide by the rules & regulations and the discipline of this college throughout my tenure as a student in the college.</li>
              <li>I shall accept any deterrent punishment (of monetary or academic nature) that may be decided by the authorities of the college, for any infringement or violation by me, of the discipline and conduct rules of the college.</li>
              <li>I am also aware of the fact that the practice of "Ragging" in the college or outside the college is totally banned vide "Maharashtra Prohibition of Ragging Act-1999". I have read the extract of "Maharashtra Prohibition of Ragging Act-1999", displayed on the Notice Board. I am aware of the severe punishment that can be imposed if I do not abide by the provisions stipulated in the Act.</li>
              <li>I am aware that smoking, consuming of "Gutka" or other tobacco related items or alcohol is prohibited in the college / hostel premises. I will abide by the said rules.</li>
              <li>I agree to pay the college tuition and other fees on the dates that will be notified by the college and while leaving the college, I will obtain proper clearance and give prior intimation to the college.</li>
              <li>I hereby agree to submit to the disciplinary jurisdiction of the Vice-Chancellor and other officers of the Savitribai Phule Pune University, and also authorities of college, and shall abide by the Rules and Regulation made by them.</li>
              <li>I will promptly intimate any change in address of self, parent or local guardian or any other item in the form.</li>
            </ol>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Place :</p>
                <p className="text-sm">Date : 01-07-2023</p>
                <p className="text-sm">Faculty & Class: F.Y.M.Sc.(Comp. Sci.)</p>
              </div>
              <div className="flex flex-col items-end justify-end">
              <div className="bg-gray-100 w-34 mb-2 border border-gray-400">
                <img src={admissionData.SignatureURL} alt="Student" className="max-h-full w-full" />
              </div>
                <p className="text-sm">Signature of the Student</p>
                <p className="text-sm">Name: {admissionData.CandidateName}</p>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p>I substantiate and accept the aforesaid undertaking made by my ward.</p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p>Place :</p>
                  <p>Date : 01-07-2023</p>
                  <p>Name: {admissionData.ParentsName}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-12 w-32 bg-gray-100 mb-2 flex items-center justify-center border">
                    <span className="text-gray-500 italic text-xs">Signature</span>
                  </div>
                  <p>Signature of the Parent/Guardian</p>
                </div>
              </div>
            </div>
          </div>

          {/* Declaration By The Student */}
          <div className="mb-6">
            <h2 className="text-center font-bold mb-3 border-b pb-1">DECLARATION BY THE STUDENT</h2>
            
            <p className="text-sm mb-4">
              I, declare that, I have read all the rules of admission as contained in the prospectus of the college. I undertake and bind myself to these rules. It is only on 
              understanding these rules, I have filled this application form for admission to the degree course in the year ______.
            </p>
            <p className="text-sm mb-4">
              Further I declare that the information given by me in the provisional and subject to verification of all documents as mentioned in the prospectus and required by 
              the Savitribai Phule Pune University, or also the fulfillment of eligibility laid down by Statutory Bodies. The information given by me in my 
              application is true to the best of my knowledge and belief.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Place :</p>
                <p className="text-sm">Date : 01-07-2023</p>
                <p className="text-sm">Name: {admissionData.CandidateName}</p>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="bg-gray-100 w-34 mb-2 border border-gray-400">
                <img src={admissionData.SignatureURL} alt="Student" className="max-h-full w-full" />
              </div>                </div>
                <p className="text-sm">Signature of the Student</p>
            </div>
          </div>

          {/* Declaration By Parent/Guardian */}
          <div>
            <h2 className="text-center font-bold mb-3 border-b pb-1">DECLARATION TO BE SIGNED BY THE CANDIDATE'S PARENT / GUARDIAN</h2>
            
            <ol className="list-decimal pl-6 text-sm space-y-2">
              <li>The particulars furnished by my son / daughter / ward in his / her application form are correct to the best of my knowledge and belief.</li>
              <li>I undertake and bind myself to pay on behalf of my son / daughter / ward's tuition fees and other fees, by the due date which the college may levy from time to 
              time and in the event of failure on my part or the part of my son / daughter / ward, the Principal of the college may take such action against my son / daughter / 
              ward, as he or she may deem fit.</li>
              <li>I substantiate and accept aforesaid declaration made by my ward.</li>
            </ol>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Place :</p>
                <p className="text-sm">Date : 01-07-2023</p>
                <p className="text-sm">Name: {admissionData.ParentsName}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="h-12 w-32 bg-gray-100 mb-2 flex items-center justify-center border">
                  <span className="text-gray-500 italic text-xs">Signature</span>
                </div>
                <p className="text-sm">Signature of the Parent/Guardian</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;