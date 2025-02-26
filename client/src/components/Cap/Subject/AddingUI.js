import React, { use, useEffect, useState } from "react";

function AddingUI({ year, subj, func }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [Compulsion, setCompulsion] = useState(true);

  function AddSubject(sem) {
    const newSubj = { // Create a new object instead of modifying the existing one
      name,
      code,
      compulsion: Compulsion ? "Compulsory" : "Optional"
    };
  
    func(year, sem, newSubj); // Pass the new object to the function
    setName("");
    setCode("");
    setCompulsion(true)
  }
  

  return (
    <div className="bg-inherit p-6 rounded-lg shadow-md flex flex-wrap items-center gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Subject Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-60 p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          Subject Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 outline-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="compulsion"
          checked={Compulsion}
          onChange={() => {
            setCompulsion((prev) => !prev);
          }}
          className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-200"
        />
        <label
          htmlFor="compulsion"
          className="text-sm font-medium text-gray-700"
        >
          Compulsory
        </label>
      </div>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => {
          AddSubject("sem1");
        }}
      >
        Add to Sem 1
      </button>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => {
          AddSubject("sem2");
        }}
      >
        Add to Sem 2
      </button>
    </div>
  );
}

export default AddingUI;
