import React, { useEffect, useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";
import { getSem } from "../Utils";
import ExamForm from "./ExamForm"
import { currentUser } from "../../utils/currentUser";

function ExamFormDashboard() {
  const [reg, setReg] = useState({date:null, sem:null});
  const [back, setBack] = useState(null);
  const [table, setTable] = useState(true);
  const [type, setType] = useState(null);
  const [form, setForm] = useState(false);
  const [formcourse, setFormCourse] = useState(null);


  const [Backlogs, setBacklogs] = useState([
    "Postgraduate-MSc-Computer Science-Second Year-Sem1","Postgraduate-MSc-Computer Science-First Year-Sem1"
  ]);
  const [Regular, setRegular] = useState(
    null
  );


  var counter = 0;

  useEffect(() => {
    if(Regular){
      console.log(Regular);
    const fetchData = async () => {
      try {
        const response = await API.post("/student/getStudentExamForms", {
          Backlogs,
          Regular,
        });
        console.log("Response data: ", response.data);
        if (response.data.status) {
          console.log(response.data.finaldata);
          console.log(!response.data.finaldata.regular.date);
          if(!response.data.finaldata.regular.date && Object.keys(response.data.finaldata.backlog).length === 0
        ){
          console.log("Called");
            setTable(false);
          }else{
            setReg(response.data.finaldata.regular);
            setBack(response.data.finaldata.backlog);
          }
        } else {
          console.log("Error: ", response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error("Error fetching exam forms:", error);
      }
    };

    // Call the async function
    fetchData();
  }
  }, [Regular]);

  useEffect(() => {
    getStudentData();
  }, []);

  function getStudentData(){
    API.post("/student/getAdmission", {email:currentUser.email}).then((response) => {
      if (response.data.status) {
        
        setRegular(response.data.adm.personalInfo.course.join("-"));
      }
    })
  }
  function getIndex() {
    counter = counter + 1;
    return counter;
  }

  function openform(type,course){
    setFormCourse(course);
    setType(type);
    setForm(true);
    setTable(false);
  }

  return (
    <div className="h-screen overflow-y-auto ">
      {table ? <div>
        <h1>Exam Forms</h1>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Course</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Exam Type</th>
              <th>Last Date</th>
              <th>Status</th>
              <th>Action</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {reg.date && (
              <tr>
                <td>{getIndex()}</td>
                <td>
                  {Regular.split("-")[1]} {Regular.split("-")[2]}
                </td>
                <td>{Regular.split("-")[3]}</td>
                <td>Sem {getSem(Regular.split("-")[3], reg.sem)}</td>
                <td className="text-center font-bold">Regular</td>
                <td>{reg.date.split("-").reverse().join("-")}</td>
                <td>Submitted</td>
                <td className="text-center text-blue-600 underline">
                  <a onClick={()=>{openform("regular",Regular+"-"+reg.sem)}}>Fill Form</a>
                </td>
                <td className="text-center text-red-600 underline">
                  <a href="#">Download</a>
                </td>
              </tr>
            )}
            {back &&
              Object.keys(back).map((backsem) =>
                back[backsem] ? (
                  <tr key={backsem}>
                    <td>{getIndex()}</td>
                <td>
                  {backsem.split("-")[1]} {backsem.split("-")[2]}
                </td>
                <td>{backsem.split("-")[3]}</td>
                <td>Sem {getSem(backsem.split("-")[3],backsem.split("-")[4])}</td>
                <td className="text-center font-bold">Backlog</td>
                <td>{back[backsem].split("-").reverse().join("-")}</td>
                <td>Submitted</td>
                <td className="text-center text-blue-600 underline">
                  <a onClick={()=>{openform("backlog",backsem)}}>Fill Form</a>
                </td>
                <td className="text-center text-red-600 underline">
                  <a href="#">Download</a>
                </td>
                  </tr>
                ) : null
              )}
          </tbody>
        </table>
      </div>:!form?<h3>No Active Exam Forms for you</h3>:null}
      { form && <ExamForm type={type} setTable={setTable} course={formcourse}/>}
    </div>
  );
}

export default ExamFormDashboard;
