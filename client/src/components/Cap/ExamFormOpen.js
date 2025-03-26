import React, { useEffect, useState } from "react";
import API from "../services/api";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";

function ExamFormOpen() {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState({});

  const [selectedYearsRegular, setSelectedYearsRegular] = useState({});
  const [lastDatesRegular, setLastDatesRegular] = useState({});
  const [selectedYearsBacklog, setSelectedYearsBacklog] = useState({});
  const [lastDatesBacklog, setLastDatesBacklog] = useState({});
  const openArray = [];

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await API.get("/cap/getCourses");
        const forms = await API.get("/cap/getExamForms");
        const { regularYears, regularDates, backlogYears, backlogDates } =
          forms.data;
        setSelectedYearsRegular(regularYears);
        setLastDatesRegular(regularDates);
        setSelectedYearsBacklog(backlogYears);
        setLastDatesBacklog(backlogDates);
        const { _id, ...filteredData } = response.data;
        setCourses(filteredData);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses({});
      } finally {
        setLoading(false);
      }
    }

    getCourses();
  }, []);

  useEffect(() => {
    if (courses) {
      setCollapsed(() => {
        const initialCollapsedState = {
          Regular: true,
          Backlog: true,
        };

        Object.keys(courses).forEach((level) => {
          initialCollapsedState[`Regular-${level}`] = true;
          initialCollapsedState[`Backlog-${level}`] = true;

          Object.keys(courses[level]).forEach((course) => {
            initialCollapsedState[`Regular-${level}-${course}`] = true;
            initialCollapsedState[`Backlog-${level}-${course}`] = true;

            Object.keys(courses[level][course]).forEach((stream) => {
              initialCollapsedState[
                `Regular-${level}-${course}-${stream}`
              ] = true;
              initialCollapsedState[
                `Backlog-${level}-${course}-${stream}`
              ] = true;
            });
          });
        });

        return initialCollapsedState;
      });
      Object.keys(selectedYearsRegular).forEach((key) => {
        openCollapse("Regular", key);
      });
      Object.keys(selectedYearsBacklog).forEach((key) => {
        openCollapse("Backlog", key);
      });
    }
  }, [courses]);

  function openCollapse(paperstat, key) {
    let levels = paperstat + "-";

    if (!openArray.includes(paperstat)) {
      openArray.push(paperstat);
      toggleCollapse(paperstat);
    }
    key = key.split("-");
    // key.pop();
    key.map((k) => {
      levels += k;
      if (!openArray.includes(levels)) {
        openArray.push(levels);
        toggleCollapse(levels);
      }
      levels += "-";
    });
  }

  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  async function openExamForms() {
    // console.log("Regular:", selectedYearsRegular, lastDatesRegular);
    // console.log("Backlog:", selectedYearsBacklog, lastDatesBacklog);

    for (let key in selectedYearsRegular) {
      const datekey = key.split("-");
      datekey.pop();
      const datekey2 = datekey.join("-");
      if (selectedYearsRegular[key]) {
        if (!lastDatesRegular[datekey2]) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Enter Last Date of Regular - ${datekey2}`,
          });
          return;
        }
      } else {
        delete selectedYearsRegular[key];
        delete lastDatesRegular[datekey2];
      }
    }

    for (let key in selectedYearsBacklog) {
      const datekey = key.split("-");
      datekey.pop();
      const datekey2 = datekey.join("-");
      if (selectedYearsBacklog[key]) {
        if (!lastDatesBacklog[datekey2]) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Enter Last Date of BackLog - ${datekey2}`,
          });
          return;
        }
      } else {
        delete selectedYearsBacklog[key];
        delete lastDatesBacklog[datekey2];
      }
    }

    try {
      const response = await API.post("/cap/openExamForms", {
        regularYears: selectedYearsRegular,
        regularDates: lastDatesRegular,
        backlogYears: selectedYearsBacklog,
        backlogDates: lastDatesBacklog,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error opening exam forms:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error opening exam forms",
      });
    }
  }

  const handleCheckboxChange = (type, key) => {
    if (type === "Regular") {
      setSelectedYearsRegular((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setSelectedYearsBacklog((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleDateChange = (type, key, value) => {
    if (type === "Regular") {
      setLastDatesRegular((prev) => ({ ...prev, [key]: value }));
    } else {
      setLastDatesBacklog((prev) => ({ ...prev, [key]: value }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 h-screen overflow-y-auto">
      {["Regular", "Backlog"].map((type) => (
        <div
          key={type}
          className={`mb-6 border-l-8 ${
            type === "Regular" ? "border-blue-500" : "border-green-500"
          } pl-4`}
        >
          <h2
            className="text-2xl font-bold cursor-pointer text-left"
            onClick={() => toggleCollapse(type)}
          >
            {collapsed[type] ? (
              <FaChevronRight className="mr-2 inline text-gray-600" />
            ) : (
              <FaChevronDown className="mr-2 inline text-gray-600" />
            )}
            {type}
          </h2>
          {!collapsed[type] &&
            Object.keys(courses).map((level) => (
              <div
                key={level}
                className="bg-white shadow-lg rounded-lg p-6 mb-4 border-l-4 border-gray-400 pl-4"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleCollapse(`${type}-${level}`)}
                >
                  {collapsed[`${type}-${level}`] ? (
                    <FaChevronRight className="mr-2 text-gray-600" />
                  ) : (
                    <FaChevronDown className="mr-2 text-gray-600" />
                  )}
                  <h1 className="text-2xl font-bold text-blue-600">{level}</h1>
                </div>
                {!collapsed[`${type}-${level}`] &&
                  Object.keys(courses[level]).map((course) => (
                    <div
                      key={course}
                      className="ml-6 mt-2 border-l-4 border-blue-300 pl-4"
                    >
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          toggleCollapse(`${type}-${level}-${course}`)
                        }
                      >
                        {collapsed[`${type}-${level}-${course}`] ? (
                          <FaChevronRight className="mr-2 text-gray-600" />
                        ) : (
                          <FaChevronDown className="mr-2 text-gray-600" />
                        )}
                        <h2 className="text-xl font-semibold text-gray-800">
                          {course}
                        </h2>
                      </div>
                      {!collapsed[`${type}-${level}-${course}`] &&
                        Object.keys(courses[level][course]).map((stream) => (
                          <div
                            key={stream}
                            className="ml-6 mt-2 border-l-4 border-green-300 pl-4"
                          >
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() =>
                                toggleCollapse(
                                  `${type}-${level}-${course}-${stream}`
                                )
                              }
                            >
                              {collapsed[
                                `${type}-${level}-${course}-${stream}`
                              ] ? (
                                <FaChevronRight className="mr-2 text-gray-600" />
                              ) : (
                                <FaChevronDown className="mr-2 text-gray-600" />
                              )}
                              <h3 className="text-lg font-medium text-gray-700">
                                {stream}
                              </h3>
                            </div>
                            {!collapsed[
                              `${type}-${level}-${course}-${stream}`
                            ] &&
                              courses[level][course][stream].map((year) => {
                                const key = `${level}-${course}-${stream}-${year}`;
                                const dateValue =
                                  type === "Regular"
                                    ? lastDatesRegular[key] || ""
                                    : lastDatesBacklog[key] || "";

                                return (
                                  <div
                                    key={year}
                                    className="flex items-center gap-4 p-2 border rounded-md bg-gray-100 ml-8 border-l-4 border-yellow-300 pl-4"
                                  >
                                    <h4 className="text-lg font-bold text-gray-900">
                                      {year}
                                    </h4>
                                    {["Sem1", "Sem2"].map((sem) => {
                                      const isChecked =
                                        type === "Regular"
                                          ? selectedYearsRegular[
                                              key + "-" + sem
                                            ] || false
                                          : selectedYearsBacklog[
                                              key + "-" + sem
                                            ] || false;
                                      return (
                                        <>
                                          <h5 className="text-lg font-bold text-gray-900">
                                            {sem}
                                          </h5>
                                          <input
                                            type="checkbox"
                                            className="h-5 w-5 text-blue-500"
                                            checked={isChecked}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                type,
                                                key + "-" + sem
                                              )
                                            }
                                          />
                                        </>
                                      );
                                    })}

                                    {((type === "Regular" &&
                                      (selectedYearsRegular[key + "-Sem1"] ||
                                        selectedYearsRegular[key + "-Sem2"])) ||
                                      (type === "Backlog" &&
                                        (selectedYearsBacklog[key + "-Sem1"] ||
                                          selectedYearsBacklog[
                                            key + "-Sem2"
                                          ]))) && (
                                      <>
                                        <span>Last Date:</span>
                                        <input
                                          type="date"
                                          className="p-2 border rounded-md text-gray-700"
                                          value={dateValue}
                                          onChange={(e) =>
                                            handleDateChange(
                                              type,
                                              key,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
      <button
        onClick={() => openExamForms()}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Set Exam Forms
      </button>
    </div>
  );
}

export default ExamFormOpen;
