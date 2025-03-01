import React from 'react';
import SidePanel from '../components/SidePanel';
import { useState } from 'react';
import Footer from '../components/Footer';


function StudentDashboard() {

    const [AdmissionForm, setAdmissionForm] = useState(true);
    const [Courses, setCourses] = useState(false);
    const [Revaluation, setRevaluation] = useState(false);
    const [Results, setResults] = useState(false);


    const studentProps = {
        title: "STUDENT DASHBOARD",
        items: [
            { text: "Admission Form", icon: "fa fa-address-book", link: "./admissionform", callbackfunc :()=>{ManagePage("AdmissionForm")} },
            { text: "Courses", icon: "fa-solid fa-square-check", link: "#", callbackfunc :()=>{ManagePage("Courses")}},
            { text: "Revaluation", icon: "fa-solid fa-repeat", link: "#",callbackfunc :()=>{ManagePage("Revaluation")} },
            { text: "Results", icon: "fa fa-file-text", link: "#", callbackfunc :()=>{ManagePage("Results")} },
        ],
        content: "Welcome, student! Here you can access your information."
    };

    function turnFalse() {
        setAdmissionForm(false);
        setCourses(false);
        setRevaluation(false);
        setResults(false);
    }

    function ManagePage(page) {
        if (page === 'AdmissionForm') {
            turnFalse();
            setAdmissionForm(true);
            window.location.href = "./studentdashboard/admissionform";
            console.log('admission form');
        } else if (page === 'Courses') {
            turnFalse();
            setCourses(true);
        } else if (page === 'Revaluation') {
            turnFalse();
            setRevaluation(true);
        } else if (page === 'Results') {
            turnFalse();
            setResults(true);
        }
    }

    return (
        <div>
            <SidePanel {...studentProps} />
            <Footer />
        </div>
    );
}

export default StudentDashboard;