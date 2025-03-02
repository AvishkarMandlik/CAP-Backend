import React, { useEffect, useRef, useState } from "react";

function Educationalinfo({func}) {
  const fileInputRef = useRef(null);

  const [lastExam, setLastExam] = useState("");
  const [Eligibility, setEligibility] = useState("");
  const [choosenFile, setChoosenFile] = useState("No file choosen");
  const [FYMarksheet, setFYMarksheet] = useState("");
  const [SYMarksheet, setSYMarksheet] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [FinalMarksheet, setFinalMarksheet] = useState("");
  const [selected, setSelected] = useState("");
  const [base64, setBase64] = useState("");

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setChoosenFile(file.name);

    try {
      const base64String = await convertToBase64(file);
      setBase64(base64String);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  useEffect(() => {
    const storedData = localStorage.getItem("EducationalInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setLastExam(parsedData.lastExam || "");
      setEligibility(parsedData.Eligibility || "");
      setFYMarksheet(parsedData.FYMarksheet || "");
      setSYMarksheet(parsedData.SYMarksheet || "");
      setAadhar(parsedData.aadhar || "");
      setFinalMarksheet(parsedData.FinalMarksheet || "");

      if(parsedData.FYMarksheet != ""){
        setCheck1(true);
        }
        if(parsedData.SYMarksheet != ""){ 
        setCheck2(true);
        }
        if(parsedData.aadhar != ""){
        setCheck3(true);
        }
        if(parsedData.FinalMarksheet != ""){
        setCheck4(true);
        }
    }
    setLoading(false); // ✅ Fix: set loading to false when data is fetched
  }, []);

  function AddFile() {
    if (!base64) return; // ✅ Prevents empty file uploads

    if (selected === "fym") {
      setFYMarksheet(base64);
      setCheck1(true);
    } else if (selected === "sym") {
      setSYMarksheet(base64);
      setCheck2(true);
    } else if (selected === "aadhar") {
      setAadhar(base64);
      setCheck3(true);
    } else if (selected === "fms") {
      setFinalMarksheet(base64);
      setCheck4(true);
    }

    setBase64("");
    setChoosenFile("No File Chosen");
    setSelected(""); // ✅ Reset selected value after upload
  }

  function saveNext() {
    if (check4) {
      localStorage.setItem(
        "EducationalInfo",
        JSON.stringify({
          lastExam,
          Eligibility,
          FYMarksheet,
          SYMarksheet,
          aadhar,
          FinalMarksheet,
        })
      );
      func("PhotoSignature");
    }
  }
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Educational Info</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Previous Exam Passed*
        </label>
        <input
          type="text"
          value={lastExam}
          onChange={(e) => setLastExam(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Eligibility No.:
        </label>
        <input
          type="text"
          value={Eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">Note: Marksheet is mandatory.</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Upload Educational Documents
        </label>
        <div className="mt-1">
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Documents*
            </option>
            <option value="fym">First Year Marksheet</option>
            <option value="sym">Second Year Marksheet</option>
            <option value="aadhar">Aadhaar Card</option>
            <option value="fms">Final Marksheet</option>
          </select>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleChooseFileClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Choose File
            </button>
            <span className="ml-2 text-sm text-gray-500">{choosenFile}</span>
          </div>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              AddFile();
            }}
          >
            Add File
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Your uploaded Documents </h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">First Year Marksheet</span>
            <input
              type="checkbox"
              checked={check1}
              readOnly
              className="ml-2 text-green-500"
            />
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-700">Second Year Marksheet</span>
            <input
              type="checkbox"
              checked={check2}
              readOnly
              className="ml-2 text-green-500"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Aadhaar Card</span>
            <input
              type="checkbox"
              checked={check3}
              readOnly
              className="ml-2 text-green-500"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Marksheet</span>
            <input
              type="checkbox"
              checked={check4}
              readOnly
              className="ml-2 text-green-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => {
            saveNext();
          }}
        >
          Save Next
        </button>
      </div>
    </div>
  );
}

export default Educationalinfo;
