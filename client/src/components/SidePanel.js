import React , { useState } from "react";
import { Link } from "react-router-dom";

function SidePanel(props) {
  const user = JSON.parse(localStorage.getItem("User Data"));
  const [on , setOn] = useState(true);

  const handleLogout = () => {
    alert("Are you sure you want to logout?");
    localStorage.removeItem("User Data");
    window.location.href = "/login";
  };

  if(!on){
    return(
      <div className="position-fixed cursor-pointer">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
              onClick={() => setOn(true)}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
        </div>
    )
  }

  return (
<div className="fixed top-0 left-0 min-h-screen w-50 bg-gray-100 flex sm:relative sm:h-[calc(100vh-8rem)] sm:w-auto">

{/* Sidebar */}
      <div className="sidebar bg-black text-white w-64 min-h-screen flex flex-col py-6 px-4 shadow-lg">
        <div className="logo text-2xl font-bold mb-2 flex items-center justify-between">
          <span className="inline-block">CampusERP</span>
          <span className="inline-block ml-auto cursor-pointer">
            {" "}
            {/* Moves it to the extreme right */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
              onClick={() => setOn(false)}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </span>
        </div>

        <div
          to="#"
          className="flex items-center space-x-3 text-red-400 font-bold mb-6"
        >
          <span className="text-lg">{user.name}</span>
        </div>
        <nav className="menu flex flex-col space-y-6">
          {props.items.map((item, index) => (
            <button
              key={index}
              // to={item.link}
              className="flex items-center space-x-3 hover:text-gray-400"
              onClick={
                item.callbackfunc
                  ? item.callbackfunc
                  : item.link
                  ? () => (window.location.href = item.link)
                  : undefined
              }
            >
              <i className={item.icon}></i>
              <span>{item.text}</span>
            </button>
          ))}
          <Link
            to="#"
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:text-gray-400"
          >
            <i className="fa fa-sign-out"></i>
            <span>LOGOUT</span>
          </Link>
        </nav>
      </div>

      {/* Content */}
      {/* <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-700">Welcome to the {props.title}</h1>
                <p className="mt-4 text-gray-600">{props.content}</p>
            </div> */}
    </div>
  );
}

export default SidePanel;
