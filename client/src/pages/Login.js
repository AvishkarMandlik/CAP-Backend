import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showAlert } from "tailwind-toastify";

function Login() {
  const [formData, setFormData] = useState({
    role: "",
    identifier: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/signin", {
        role: formData.role,
        identifier: formData.identifier,
        password: formData.password,
      })
      .then((response) => {
        if (response.data.success) {
          setResponseMessage(response.data.message);
          showAlert("success", "Success", "Login successful");
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
        } else {
          setResponseMessage(response.data.message);
          showAlert("error", "Error", response.data.message);
        }
      })
      .catch((error) => {
        setResponseMessage("An error occurred. Please try again later.");
        showAlert(
          "error",
          "Error",
          "An error occurred. Please try again later."
        );
      });
  };

  return (
    <div className="form-wrapper Login bg-gray-100 p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <form className="loginform" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="cap">Cap User</option>
        </select>

        <div className="container grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number or Email:
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter your email or mobile number"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <button
          className="button w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Login
        </button>

        {responseMessage && (
          <p className="text-center mt-4 text-sm text-red-600">
            {responseMessage}
          </p>
        )}

        <div className="Login-link text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
