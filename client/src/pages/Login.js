import React, { useState } from "react";
import API from '../components/services/api';
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; 


function Login() {
  const [formData, setFormData] = useState({
    role: "",
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API
      .post("/signin", {
        role: formData.role,
        identifier: formData.identifier,
        password: formData.password,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonColor: "#1a202c", // Match black theme
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.setItem("User Data", JSON.stringify(response.data));
            if (response.data.role === "student") {
              window.location.href = "./studentdashboard";
            } else if (response.data.role === "teacher") {
              window.location.href = "./teacherdashboard";
            } else if (response.data.role === "cap") {
              window.location.href = "./capdashboard";
            } else {
              window.location.href = "/";
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonColor: "#1a202c", // Match black theme
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text:
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonColor: "#1a202c", // Match black theme
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Information Section */}
        <div className="hidden md:block w-1/2 bg-gradient-to-r from-gray-800 to-gray-900 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">Rakini Softech Private Limited</h2>
          <p className="text-gray-300 mb-4">
            Rakini Softech is a leading development company specializing in creating professional ERP
            solutions tailored for educational institutions. Our platform empowers students,
            teachers, and administrators to manage their tasks efficiently and effectively.
          </p>
          <p className="text-gray-300">
            Whether you're a student, teacher, or CAP user, log in today to access your personalized
            ERP dashboard.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="cap">Cap User</option>
              </select>
            </div>

            {/* Identifier (Email or Mobile Number) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Mobile Number
              </label>
              <input
                type="text"
                name="identifier"
                placeholder="Enter your email or mobile number"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-700 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gray-900 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;