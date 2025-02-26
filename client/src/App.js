import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CapDashboard from './pages/CapDashboard';
import HallTicket from './components/HallTicket/HallTicket';
import AdmissionForm from './pages/AdmissionForm';
import PersonalInfo from './components/Student/Personalinfo';
import Educationalinfo from './components/Student/Educationalinfo';
import InternalMarks from './components/Teacher/InternalMarks';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/teacherdashboard" element={<TeacherDashboard />} />
      <Route path="/capdashboard" element={<CapDashboard />} />
      <Route path="/hallticket" element={<HallTicket />} />
      <Route path="/studentdashboard/admissionform" element={<AdmissionForm />} />
      <Route path="/studentdashboard/admissionform/personalinfo" element={<PersonalInfo />} />
      <Route path="/studentdashboard/admissionform/educationalinfo" element={<Educationalinfo />} />
      <Route path="/teacherdashboard/internalmarks" element={<InternalMarks />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
