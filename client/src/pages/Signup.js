import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from '../components/services/api';
import Swal from "sweetalert2";

function Signup() {
  const [formData, setFormData] = useState({
    role: "",
    lastName: "",
    firstName: "",
    middleName: "",
    motherName: "",
    dob: "",
    mobileNumber: "",
    email: "",
    course: "",
    year: "",
    gender: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      Swal.fire({
        title: "Error",
        text: "Please agree to the terms and conditions.",
        icon: "error",
        confirmButtonColor: "#1a202c", // Match black theme
        confirmButtonText: "OK",
      });
      return;
    }

    API
      .post("/signup", formData)
      .then((response) => {
        if(response.data.success){
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonColor: "#1a202c", // Match black theme
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/login";
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
          text: error.response.data.message,
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
            Whether you're a student, teacher, or CAP user, sign up today to experience a seamless
            and integrated ERP system designed to meet your needs.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <p className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Create an account to access our ERP system
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="cap">Cap User</option>
            </select>

            {formData.role && (
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                  required
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                  required
                />

                {formData.role === "student" && (
                  <>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                      required
                    />
                    <input
                      type="text"
                      name="motherName"
                      placeholder="Mother Name"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                      required
                    />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                    />
                  </>
                )}

                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                />

                {formData.role === "student" && (
                  <>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                    >
                      <option value="">Select Course</option>
                      <option value="art">Arts</option>
                      <option value="commerce">Commerce</option>
                      <option value="science">Science</option>
                    </select>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                    >
                      <option value="">Select Year</option>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                    </select>
                  </>
                )}

                <div className="flex items-center gap-4">
                  <label className="flex items-center text-gray-900">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center text-gray-900">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-900"
                />

                <label className="flex items-center text-gray-900">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I agree to the terms & conditions
                </label>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Signup
                </button>
              </div>
            )}

            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-900 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;