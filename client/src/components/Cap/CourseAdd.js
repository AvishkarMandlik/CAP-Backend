import React, { useEffect, useState } from "react";
import Year from "./Subject/Year";
import AddingUI from "./Subject/AddingUI";
import axios from "axios";

const CourseAdd = () => {
  const [level, setLevel] = useState("undergraduate");
  const [course, setCourse] = useState("BSc");
  const [stream, setStream] = useState("Plain");

  const [newLevel, setNewLevel] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newStream, setNewStream] = useState("");

  const [year2, setYear2] = useState(false);
  const [year3, setYear3] = useState(false);
  const [year4, setYear4] = useState(false);
  const [year5, setYear5] = useState(false);

  const [courses, setCourses] = useState({});

  const [newSub, setNewSub] = useState({
    name: "",
    code: "",
    compulsion: "compulsory",
  });

  const [firstYear, setFirstYear] = useState({
    title: "First Year",
    semContent: {
      sem1: {
        title: "Sem 1",
        subjects: [],
      },
      sem2: {
        title: "Sem 2",
        subjects: [],
      },
    },
  });
  const [secondYear, setSecondYear] = useState({
    title: "Second Year",
    semContent: {
      sem1: {
        title: "Sem 3",
        subjects: [],
      },
      sem2: {
        title: "Sem 4",
        subjects: [],
      },
    },
  });
  const [thirdYear, setThirdYear] = useState({
    title: "Third Year",
    semContent: {
      sem1: {
        title: "Sem 5",
        subjects: [],
      },
      sem2: {
        title: "Sem 6",
        subjects: [],
      },
    },
  });
  const [fourthYear, setFourthYear] = useState({
    title: "Fourth Year",
    semContent: {
      sem1: {
        title: "Sem 7",
        subjects: [],
      },
      sem2: {
        title: "Sem 8",
        subjects: [],
      },
    },
  });
  const [fifthYear, setFifthYear] = useState({
    title: "Fifth Year",
    semContent: {
      sem1: {
        title: "Sem 9",
        subjects: [],
      },
      sem2: {
        title: "Sem 10",
        subjects: [],
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [finalResult, setFinalResult] = useState({});
  function AddCourse() {
    const updatedResult = {
      course: [
        level !== "createnew" ? level : newLevel,
        course !== "new" ? course : newCourse,
        stream !== "new" ? stream : newStream,
      ],
      years: [
        "First Year",
        year2 ? "Second Year" : null,
        year3 ? "Third Year" : null,
        year4 ? "Fourth Year" : null,
        year5 ? "Fifth Year" : null,
      ].filter(Boolean), // Remove null values
      subjects: {
        firstYear,
        ...(year2 && { secondYear }),
        ...(year3 && { thirdYear }),
        ...(year4 && { fourthYear }),
        ...(year5 && { fifthYear }),
      },
    };

    setFinalResult(updatedResult); // Update state (asynchronous)

    axios
      .post("http://localhost:5000/cap/AddCourse", updatedResult) // ✅ Uses latest data
      .then((response) => console.log("Success:", response.data))
      .catch((error) => console.error("Error:", error));
    axios
      .post("http://localhost:5000/cap/AddSubjects", updatedResult) // ✅ Uses latest data
      .then((response) => console.log("Success:", response.data))
      .catch((error) => console.error("Error:", error));
  }

  function AddSub(func, sem, sub) {
    func((prevData) => ({
      ...prevData,
      semContent: {
        ...prevData.semContent,
        [sem]: {
          // Use `sem` dynamically
          ...prevData.semContent[sem], // Keep existing data
          subjects: [...prevData.semContent[sem].subjects, sub], // Add subject
        },
      },
    }));
  }

  function RemoveSub(func, sem, index) {
    func((prevData) => ({
      ...prevData,
      semContent: {
        ...prevData.semContent,
        [sem]: {
          ...prevData.semContent[sem],
          subjects: prevData.semContent[sem].subjects.filter(
            (_, i) => i !== index // Remove subject by index
          ),
        },
      },
    }));
  }

  const openYear = (yearNum) => {
    setYear2((prev) => (yearNum === 2 ? !prev : prev));
    setYear3((prev) => (yearNum === 3 ? !prev : yearNum < 3 ? false : prev));
    setYear4((prev) => (yearNum === 4 ? !prev : yearNum < 4 ? false : prev));
    setYear5((prev) => (yearNum === 5 ? !prev : yearNum < 5 ? false : prev));
  };

  // Fetch courses before rendering
  useEffect(() => {
    axios.get("http://localhost:5000/cap/GetCourses")
      .then((response) => {
        const filteredData = Object.keys(response.data)
          .filter(key => key !== "_id") // ✅ Remove `_id` field from selection
          .reduce((acc, key) => ({ ...acc, [key]: response.data[key] }), {});
        console.log(filteredData);
        setCourses(filteredData);

        const defaultLevel = Object.keys(filteredData)[0] || "undergraduate";
        const defaultCourse = Object.keys(filteredData[defaultLevel] || {})[0] || "new";
        const defaultStream = Object.keys(filteredData[defaultLevel]?.[defaultCourse] || {})[0] || "new";

        setLevel(defaultLevel);
        setCourse(defaultCourse);
        setStream(defaultStream);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl font-semibold text-gray-600">Loading courses...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <div className="mb-6 flex flex-wrap gap-4">
        {/* Select Education Level */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Select Education Level</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={level}
            onChange={(e) => {
              const selectedLevel = e.target.value;
              setLevel(selectedLevel);

              const firstCourse = Object.keys(courses[selectedLevel] || {}).find(key => key !== "_id") || "new";
              const firstStream = Object.keys(courses[selectedLevel]?.[firstCourse] || {}).find(key => key !== "_id") || "new";

              setCourse(firstCourse);
              setStream(firstStream);
            }}>
            {Object.keys(courses).map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
            <option value="createnew">Create New</option>
          </select>
        </div>

        {/* Select Course */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Select Course</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={course}
            onChange={(e) => {
              const selectedCourse = e.target.value;
              setCourse(selectedCourse);
              const firstStream = Object.keys(courses[level]?.[selectedCourse] || {}).find(key => key !== "_id") || "new";
              setStream(firstStream);
            }}>
            {Object.keys(courses[level] || {}).map((crs) => <option key={crs} value={crs}>{crs}</option>)}
            <option value="new">Create New</option>
          </select>
        </div>

        {/* Select Stream */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Select Stream</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={stream}
            onChange={(e) => setStream(e.target.value)}>
            {Object.keys(courses[level]?.[course] || {}).map((str) => <option key={str} value={str}>{str}</option>)}
            <option value="new">Create New</option>
          </select>
        </div>
      </div>
      {level === "createnew" ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            New Level
          </label>
          <input
            type="text"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoFocus
          />
        </div>
      ) : null}
      {course === "new" ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            New Course
          </label>
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ) : null}
      {stream === "new" ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            New Stream
          </label>
          <input
            type="text"
            value={newStream}
            onChange={(e) => setNewStream(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ) : null}

      {/* Subject Allocation */}
      <h1 className="font-black text-2xl">SUBJECT ALLOCATION</h1>
      {/* First Year */}
      <Year title={firstYear.title} semContent={firstYear.semContent} del={setFirstYear} rem={RemoveSub}/>
      <AddingUI year={setFirstYear} subj={newSub} func={AddSub} />

      <div className="flex justify-center mt-4">
        <button
          className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => openYear(2)}
        >
          {year2 ? "Remove Second Year" : "Add Second Year"}
        </button>
      </div>

      {/* Second Year */}
      {year2 ? (
        <>
          <Year title={secondYear.title} semContent={secondYear.semContent} del={setSecondYear} rem={RemoveSub}/>
          <AddingUI year={setSecondYear} subj={newSub} func={AddSub} />
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openYear(3)}
            >
              {year3 ? "Remove Third Year" : "Add Third Year"}
            </button>
          </div>
        </>
      ) : null}

      {/* Third Year */}
      {year3 ? (
        <>
          <Year title={thirdYear.title} semContent={thirdYear.semContent}  del={setThirdYear} rem={RemoveSub}/>
          <AddingUI year={setThirdYear} subj={newSub} func={AddSub} />
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openYear(4)}
            >
              {year4 ? "Remove Fourth Year" : "Add Fourth Year"}
            </button>
          </div>
        </>
      ) : null}
      {year4 ? (
        <>
          <Year title={fourthYear.title} semContent={fourthYear.semContent} del={setFourthYear} rem={RemoveSub}/>
          <AddingUI year={setFourthYear} subj={newSub} func={AddSub} />
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => openYear(5)}
            >
              {year5 ? "Remove Fifth Year" : "Add Fifth Year"}
            </button>
          </div>
        </>
      ) : null}
      {year5 ? (
        <>
          <Year title={fifthYear.title} semContent={fifthYear.semContent} del={setFifthYear} rem={RemoveSub}/>
          <AddingUI year={setFifthYear} subj={newSub} func={AddSub} />
        </>
      ) : null}
      <div className="flex justify-center mt-6">
        <button
          className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => AddCourse()}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseAdd;
