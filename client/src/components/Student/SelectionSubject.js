import React, { useState, useEffect } from "react";
import axios from "axios";

function SelectionSubject({ func }) {
  const [semesterSubjects, setSemesterSubjects] = useState({});

  const [loading, setLoading] = useState(true);

  // ✅ Initialize with compulsory subjects preselected
  const [selectedSubjects, setSelectedSubjects] = useState({
    sem1: [],
    sem2: [],
  });

  useEffect(() => {
    const course = JSON.parse(localStorage.getItem("personalInfo")).course;
    axios
      .post("http://localhost:5000/student/GetSubjects", {
        course: [course[0], course[1], course[2]],
        year: course[3],
      })
      .then((response) => {
        console.log(response.data);
        setSemesterSubjects(response.data); // ✅ First, update semesterSubjects
  
        // ✅ Now, initialize selectedSubjects with compulsory subjects
        const preselectedSubjects = Object.keys(response.data).reduce(
          (acc, sem) => {
            acc[sem] = response.data[sem].subjects
              .filter((subject) => subject.compulsion === "Compulsory")
              .map((subject) => subject.code);
            return acc;
          },
          {}
        );
        setSelectedSubjects(preselectedSubjects);
  
        // ✅ Load stored subjects (after preselecting compulsory ones)
        const storedSubjects = localStorage.getItem("Subjects");
        if (storedSubjects) {
          setSelectedSubjects(JSON.parse(storedSubjects));
        }
  
        setLoading(false);
      });
  }, []);
  

  const handleSubjectChange = (event, sem, code) => {
    const isChecked = event.target.checked;
    setSelectedSubjects((prev) => ({
      ...prev,
      [sem]: isChecked
        ? [...prev[sem], code]
        : prev[sem].filter((subject) => subject !== code),
    }));
    console.log(selectedSubjects);
  };

  function saveNext() {
    localStorage.setItem("Subjects", JSON.stringify(selectedSubjects));
    func("CoursePayment");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-y-auto max-h-screen">
      <h1 className="text-2xl font-bold mb-4">Subject Selection</h1>

      {Object.keys(semesterSubjects).map((sem, semIndex) => (
        <div key={semIndex} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Semester {semIndex + 1}
          </h2>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Sr.No.</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Code</th>
                <th className="border border-gray-300 px-4 py-2">Compulsion</th>
                <th className="border border-gray-300 px-4 py-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {semesterSubjects[sem].subjects.map((subject, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.compulsion}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedSubjects[sem]?.includes(subject.code) || false
                      } // ✅ Safe check
                      onChange={(e) =>
                        handleSubjectChange(e, sem, subject.code)
                      }
                      disabled={subject.compulsion === "Compulsory"}
                      className="form-checkbox h-5 w-5 text-blue-600 disabled:opacity-50 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => saveNext()}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
}

export default SelectionSubject;
