import React from 'react';
import html2pdf from 'html2pdf.js';

const HallTicket = () => {
  const printHallTicket = () => {
    const ticket = document.querySelector(".ticket-content");
    var opt = {
      margin: [0.5, 0, 0.5, 0],
      filename: 'hall_ticket.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        windowWidth: ticket.scrollWidth,
        windowHeight: ticket.scrollHeight,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(ticket).set(opt).save();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Hall Ticket Content */}
      <div className="ticket-content bg-white shadow-md w-full max-w-4xl p-6 relative mb-6">
        {/* Watermark Background */}
        {/* <div className="absolute inset-0 opacity-35 z-0 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 ">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex justify-center items-center">
                <img 
                  src="https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8" 
                  alt="University logo watermark" 
                  className="w-30 h-30"
                />
              </div>
            ))}
          </div>
        </div> */}

        <div className="relative z-10">
          {/* University Header */}
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 mr-4">
              <img src="https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8" alt="University Logo" className="w-full" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg tracking-wide">SAVITRIBAI PHULE PUNE UNIVERSITY</div>
              <div className="text-sm">(formerly University of Pune)</div>
              <div className="text-sm font-medium">GANESHKHIND,PUNE 411007</div>
            </div>
            <div className="w-16 ml-4">
              <img src="https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8" alt="University Logo" className="w-full" />
            </div>
          </div>
          
          <h4 className="text-center font-bold mb-2">HallTicket For M.Sc. Computer Science (2023 Pattern) (NEP 2020) MAR/APR 2024</h4>
          
          <hr className="border-black my-2" />
          
          {/* Student Details */}
          <div className="mb-4">
            <table className="w-full border border-black mb-4">
              <tr>
                <td className="border border-black p-2 text-center font-bold">Seat No</td>
                <td className="border border-black p-2 text-center font-bold">PRN</td>
                <td className="border border-black p-2 text-center font-bold">Centre Code</td>
                <td className="border border-black p-2 text-center font-bold">College Code</td>
                <td className="border border-black p-2 text-center font-bold">PUN Code</td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-center">2678</td>
                <td className="border border-black p-2 text-center">2162301707</td>
                <td className="border border-black p-2 text-center">CAAP014230</td>
                <td className="border border-black p-2 text-center">0244</td>
                <td className="border border-black p-2 text-center">CAAP014230</td>
              </tr>
            </table>

            <div className="flex">
              <div className="w-4/5 pr-4">
                <div className="grid mb-2 font-bold text-sm">
                  <div><span>Student Name :</span> SHINDE PRASHANT MACCHINDRA</div>
                  <div><span>Mother Name :</span> SUNANDA</div>
                  <div><span>College Name :</span> DR D.Y. PATIL ARTS, COMMERCE AND SCIENCE COLLEGE,PUNE</div>
                </div>
              </div>
              <div className="w-1/5 flex justify-center">
                <div className="border border-black w-24 h-32 flex items-center justify-center bg-gray-100">
                  <img 
                    src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" 
                    alt="Student's profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Exam Details Table */}
          <table className="w-full border border-black mb-4">
            <thead>
              <tr className="font-bold">
                <th className="border border-black p-1 text-left">Sub Code</th>
                <th className="border border-black p-1 text-left">Subject Name</th>
                <th className="border border-black p-1 text-center">Type</th>
                <th className="border border-black p-1 text-center">Exam Date</th>
                <th className="border border-black p-1 text-center">Exam Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-1">33291</td>
                <td className="border border-black p-1">INTRODUCTION TO CYBER SECURITY - I</td>
                <td className="border border-black p-1 text-center">[G]</td>
                <td className="border border-black p-1 text-center">10/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">33291</td>
                <td className="border border-black p-1">HUMAN RIGHTS - II</td>
                <td className="border border-black p-1 text-center">[G]</td>
                <td className="border border-black p-1 text-center">12/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">CS-551-MJ</td>
                <td className="border border-black p-1">Design and Analysis of Algorithms</td>
                <td className="border border-black p-1 text-center">[IE]</td>
                <td className="border border-black p-1 text-center">15/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">CS-552-MJ</td>
                <td className="border border-black p-1">Mobile App Development Technologies</td>
                <td className="border border-black p-1 text-center">[IE]</td>
                <td className="border border-black p-1 text-center">17/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">CS-553-MJ</td>
                <td className="border border-black p-1">Software Project Management</td>
                <td className="border border-black p-1 text-center">[IE]</td>
                <td className="border border-black p-1 text-center">19/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">CS-554-MJP</td>
                <td className="border border-black p-1">Lab course on CS-551-MJ</td>
                <td className="border border-black p-1 text-center">[PR]</td>
                <td className="border border-black p-1 text-center">22/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
              <tr>
                <td className="border border-black p-1">CS-555-MJP</td>
                <td className="border border-black p-1">Lab course on CS-552-MJ</td>
                <td className="border border-black p-1 text-center">[PR]</td>
                <td className="border border-black p-1 text-center">24/04/2024</td>
                <td className="border border-black p-1 text-center">10:00 AM</td>
              </tr>
            </tbody>
          </table>
          
          {/* Notes */}
          <div className="mb-4 text-sm">
            <p className="font-bold">NOTE:</p>
            <ol className="list-decimal pl-5">
              <li>Students should ensure that details like Name, Photo, PRN, Subjects printed on Hall Ticket are correct. In case of any discrepancy, please immediately contact the College Exam Officer (CEO).</li>
              <li>In case the College does not have an Exam Center, please follow the University Circular.</li>
              <li>In case of any discrepancy between the hall ticket and the timetable published on the university website (http://exam.unipune.ac.in), the timetable on the website is to be followed.</li>
            </ol>
          </div>
          
          {/* Signatures */}
          <div className="flex justify-between mt-12 mb-4">
            <div className="text-center">
              <div className="h-10 border-b border-black w-32 mx-auto mb-1"></div>
              <div className="text-sm">Signature of Student</div>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-black w-48 mx-auto mb-1"></div>
              <div className="text-sm font-bold">College Principal / Director</div>
              <div className="text-sm">DR D.Y. PATIL ARTS, COMMERCE & SCIENCE COLLEGE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button - Outside the ticket content */}
      <button 
        onClick={printHallTicket}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Download Hall Ticket
      </button>
    </div>
  );
};

export default HallTicket;