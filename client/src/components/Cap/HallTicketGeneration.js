import React from 'react';
import html2pdf from 'html2pdf.js';

const HallTicketGeneration = () => {
  const printHallTicket = () => {
    const ticket = document.querySelector("main");
    const wrapper = document.querySelector(".ticketWrapper");
    wrapper.style.backgroundRepeat = "space";
    var opt = {
      margin: [0.5, 0, 0.5, 0],
      filename: 'myfile.pdf',
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
    <main className="font-sans m-0 p-0">
      <div className="ticket mx-auto my-0 p-5 border-2 border-gray-300 w-[700px] relative z-10">
        <h2 className="text-center mt-0 mb-4">Savitribai Phule Pune University</h2>
        <div className="imageWrapper text-center">
          <img
            id="uniLogo"
            src="https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8"
            alt="SPPU LOGO"
            className="w-[60px]"
          />
        </div>
        <h4 className="text-center mb-4">HallTicket For M.Sc. Computer Science (2023 Pattern) (NEP 2020) MAR/APR 2024</h4>
        <hr className="border-black scale-x-105" />
        <div className="details flex justify-between mb-5">
          <div className="left-column w-[70%]">
            <table className="w-full border-collapse mb-5">
              <tr>
                <td className="border border-black p-2 text-center"><strong>Seat No</strong></td>
                <td className="border border-black p-2 text-center"><strong>PRN</strong></td>
                <td className="border border-black p-2 text-center"><strong>Centre Code</strong></td>
                <td className="border border-black p-2 text-center"><strong>College Code</strong></td>
                <td className="border border-black p-2 text-center"><strong>PUN Code</strong></td>
              </tr>
              <tr>
                <td className="border border-black p-2 text-center"><strong>2678</strong></td>
                <td className="border border-black p-2 text-center"><strong>2162301707</strong></td>
                <td className="border border-black p-2 text-center"><strong>CAAP014230</strong></td>
                <td className="border border-black p-2 text-center"><strong>0244</strong></td>
                <td className="border border-black p-2 text-center"><strong>CAAP014230</strong></td>
              </tr>
            </table>

            <p><strong>Name:</strong> SHINDE PRASHANT MACCHINDRA</p>
            <p><strong>Mother:</strong> SUNANDA</p>
            <p><strong>College:</strong> DR D.Y. PATIL ARTS, COMMERCE AND SCIENCE COLLEGE</p>
          </div>
          <div className="right-column w-[20%] text-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
              alt="Profile Photo"
              className="w-[100px] h-[100px] border border-black"
            />
          </div>
        </div>

        <table className="w-full border-collapse mb-5">
          <thead>
            <tr>
              <th className="border border-black p-2 text-left">Sub Code</th>
              <th className="border border-black p-2 text-left">Subject Name</th>
              <th className="border border-black p-2 text-left">Type</th>
              <th className="border border-black p-2 text-left">Exam Date</th>
              <th className="border border-black p-2 text-left">Exam Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">33291</td>
              <td className="border border-black p-2">INTRODUCTION TO CYBER SECURITY - I</td>
              <td className="border border-black p-2">[G]</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">33291</td>
              <td className="border border-black p-2">HUMAN RIGHTS - II</td>
              <td className="border border-black p-2">[G]</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">CS-551-MJ</td>
              <td className="border border-black p-2">Design and Analysis of Algorithms</td>
              <td className="border border-black p-2">[IE]</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            <tr>
              <td className="border border-black p-2">CS-552-MJ</td>
              <td className="border border-black p-2">Mobile App Development Technologies</td>
              <td className="border border-black p-2">[IE]</td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
            {/* Add remaining subjects similarly */}
          </tbody>
        </table>

        <div className="note mb-5">
          <p><strong>NOTE:</strong> <br />Students should ensure that details like Name, Photo, PRN, Subjects
            printed on
            Hall Ticket are correct. In case of any discrepancy, please immediately contact the College Exam
            Officer
            (CEO).</p>
          <p>In case the College does not have an Exam Center, please follow the University Circular.</p>
          <p>In case of any discrepancy between the hall ticket and the timetable published on the university
            website
            (http://exam.unipune.ac.in), the timetable on the website is to be followed.</p>
        </div>
        <br /><br />
        <div className="signature flex flex-row justify-between items-center mb-5">
          <div className="left text-center">
            <img src="data:image/png;base64," alt="" className="w-[200px] h-[40px]" />
            <br />
            <span>Signature of Student:</span>
          </div>
          <div className="right text-center">
            <span><strong>College Principal / Director</strong> </span><br />
            <br />
            <span>DR D.Y. PATIL ARTS, COMMERCE & SCIENCE COLLEGE</span>
          </div>
        </div>
      </div>
      <div
        className="ticketWrapper absolute top-[30px] left-0 right-0 p-0 w-[700px] h-full mx-auto bg-repeat-space bg-[url('https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8')] bg-[length:200px] opacity-10"
      ></div>
      <div className="btncontainer text-center">
        <button
          onClick={printHallTicket}
          className="px-5 py-2.5 bg-white border-2 border-black rounded-md text-base cursor-pointer hover:bg-black hover:text-white"
        >
          Print HallTicket
        </button>
      </div>
    </main>
  );
};

export default HallTicketGeneration;