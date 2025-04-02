import React from 'react';
import html2pdf from 'html2pdf.js';

const MarkSheet = () => {
  const handleDownload = () => {
    const element = document.getElementById('marksheet-content');
    
    const opt = {
      margin: 10,
      filename: 'marksheet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div id="marksheet-content" className="bg-white shadow-md w-full max-w-4xl p-6 mb-8">
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
          <div className="w-16 mr-4">
            <img src="https://lh5.googleusercontent.com/proxy/2XmjkO4DuiXNQL6P2vkYbaE-ofwLdeeulVZMT09pYM-yj03BFesJ95cq6SkbO8HLvvRvNOs07HflKByZSR6EhnAETA2fXf2puNwhFVcFZwS7AdFqnO0ZNOTYI98y8Sc_Oyk_2wVMjX-5WkQuk_JI7iY8" alt="University Logo" className="w-full" />
          </div>
        </div>
        
        <hr className="border-black my-2" />
        
        {/* Student Details */}
        <div className="grid mb-2 font-bold text-sm">
        <div className=" grid-cols-1 mb-2">
            <div><span >Branch/Course :</span> First Year M.Sc. Computer Science(2023 Pattern (NEP 2020)) Apr-2024</div>
        </div>
          <div className="grid grid-cols-3 mb-2">
            <div><span>Seat  :</span> 2648</div>
            <div><span>Center No :</span> 0244</div>
            <div><span>Perm Reg No(PRN) :</span> 2182301649</div>
          </div>
          <div>
            <div><span>Student Name :</span> MANDLIK AVISHKAR BAPUSAHEB</div>
            <div><span>Mother Name :</span> CHHAYA MANDLIK</div>
            <div><span>College Name :</span> 0244 DR D.Y. PATIL ARTS, COMMERCE AND SCIENCE COLLEGE,PUNE</div>
          </div>
        </div>
        
        {/* Marks Table */}
        <table className="w-full border border-black">
          <thead>
            <tr className="font-bold">
              <th className="border border-black p-1 text-center w-8">Sem</th>
              <th className="border border-black p-1 text-left">SubCode</th>
              <th className="border border-black p-1 text-left">Subject Name</th>
              <th className="border border-black p-1 text-center w-8">Crd</th>
              <th className="border border-black p-1 text-center w-8">Ern</th>
              <th className="border border-black p-1 text-center w-8">Grd</th>
              <th className="border border-black p-1 text-center w-8">GP</th>
              <th className="border border-black p-1 text-center w-12">Crd Pnt</th>
            </tr>
          </thead>
          <tbody>
            {/* Semester 1 */}
            <tr>
              <td className="border border-black p-1 text-center align-top " rowSpan="10">1</td>
              <td className="border border-black p-1">CS-501-MJ</td>
              <td className="border border-black p-1">Advanced Operating System</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">A</td>
              <td className="border border-black p-1 text-center">8</td>
              <td className="border border-black p-1 text-center">32</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-502-MJ</td>
              <td className="border border-black p-1">Artificial Intelligence</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">A</td>
              <td className="border border-black p-1 text-center">8</td>
              <td className="border border-black p-1 text-center">32</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-503-MJ</td>
              <td className="border border-black p-1">Principles of Programming Languages</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A</td>
              <td className="border border-black p-1 text-center">8</td>
              <td className="border border-black p-1 text-center">16</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-504-MJP</td>
              <td className="border border-black p-1">Lab course on CS-501-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center">10</td>
              <td className="border border-black p-1 text-center">20</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-505-MJP</td>
              <td className="border border-black p-1">Lab course on CS-502-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A+</td>
              <td className="border border-black p-1 text-center">9</td>
              <td className="border border-black p-1 text-center">18</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-510-MJ</td>
              <td className="border border-black p-1">Advanced Databases and Web Technologies</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A</td>
              <td className="border border-black p-1 text-center">8</td>
              <td className="border border-black p-1 text-center">16</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-511-MJP</td>
              <td className="border border-black p-1">Lab course on CS-510-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A+</td>
              <td className="border border-black p-1 text-center">9</td>
              <td className="border border-black p-1 text-center">18</td>
            </tr>
            <tr>
              <td className="border border-black p-1">CS-531-RM</td>
              <td className="border border-black p-1">Research Methodology</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">A+</td>
              <td className="border border-black p-1 text-center">9</td>
              <td className="border border-black p-1 text-center">36</td>
            </tr>
            <tr>
              <td className="border border-black p-1">331191</td>
              <td className="border border-black p-1">HUMAN RIGHTS - I</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
            <tr>
              <td className="border border-black p-1">* 33192</td>
              <td className="border border-black p-1">INTRODUCTION TO CYBER SECURITY</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
            
            {/* Semester 2 */}
            <tr>
              <td className="border border-black p-1 text-center align-top" rowSpan="9">2</td>
              <td className="border border-black p-1">* CS-551-MJ</td>
              <td className="border border-black p-1">Design and Analysis of Algorithms</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">A</td>
              <td className="border border-black p-1 text-center">8</td>
              <td className="border border-black p-1 text-center">32</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-552-MJ</td>
              <td className="border border-black p-1">Mobile App Development Technologies</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">B</td>
              <td className="border border-black p-1 text-center">6</td>
              <td className="border border-black p-1 text-center">24</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-553-MJ</td>
              <td className="border border-black p-1">Software Project Management</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A+</td>
              <td className="border border-black p-1 text-center">9</td>
              <td className="border border-black p-1 text-center">18</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-554-MJP</td>
              <td className="border border-black p-1">Lab course on CS-551-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center">10</td>
              <td className="border border-black p-1 text-center">20</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-555-MJP</td>
              <td className="border border-black p-1">Lab course on CS-552-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center">10</td>
              <td className="border border-black p-1 text-center">20</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-560-MJ</td>
              <td className="border border-black p-1">Full Stack Development - I</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">A+</td>
              <td className="border border-black p-1 text-center">9</td>
              <td className="border border-black p-1 text-center">18</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-561-MJP</td>
              <td className="border border-black p-1">Lab Course on CS-560-MJ</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center">10</td>
              <td className="border border-black p-1 text-center">20</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* CS-581-OJT</td>
              <td className="border border-black p-1">On Job Training/Internship</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">4</td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center">10</td>
              <td className="border border-black p-1 text-center">40</td>
            </tr>
            <tr>
              <td className="border border-black p-1">* 33291</td>
              <td className="border border-black p-1">HUMAN RIGHTS - II</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center">O</td>
              <td className="border border-black p-1 text-center"></td>
              <td className="border border-black p-1 text-center"></td>
            </tr>
          </tbody>
        </table>
        
        {/* SGPA Information */}
        <div className="text-center my-3 font-bold">
          <div>First Semester SGPA : 8.73 Credits Earned/Total : 22/22 Total Credit Points: 192</div>
          <div>Second Semester SGPA : 9.27 Credits Earned/Total : 22/22 Total Credit Points: 204</div>
          <div className="mt-1">First Year Total Credits Earned : 44/44</div>
        </div>
        
        {/* Result Date */}
        <div className="text-center font-bold my-3">
          <div>RESULT DATE: 10 July 2024</div>
        </div>
        
        <div className="my-4">
          <p>The results published online are for immediate information only. These cannot be treated as original statement of marks. Please verify the information from original statement of marks issued by the Savitribai Phule Pune University separately.</p>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between mt-16">
          <div>1 of 1</div>
          <div className="flex space-x-8">
            <div>Savitribai Phule Pune University,Online Result</div>
            <div>Download Date:10/07/2024</div>
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <button 
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download Marksheek
      </button>
    </div>
  );
};

export default MarkSheet;