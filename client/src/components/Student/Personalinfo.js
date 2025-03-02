import axios from "axios";
import { useEffect, useState } from "react";

const PersonalInfo = ({ func }) => {
  const savedData = JSON.parse(localStorage.getItem("personalInfo"));

  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("unmarried");
  const [motherName, setMotherName] = useState("");
  const [pincode, setPincode] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [POB, setPOB] = useState("");
  const [handicap, setHandicap] = useState("No");

  const [fatherName, setFatherName] = useState("");
  const [fatherMobileNumber, setFatherMobileNumber] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [abcid, setAbcid] = useState("");
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  function loadData(data) {
    setLevel(data.course[0]);
    setCourse(data.course[1]);
    setStream(data.course[2]);
    setYear(data.course[3]);
    setName(data.name);
    setAddress(data.address);
    setState(data.state);
    setCity(data.city);
    setGender(data.gender);
    setMaritalStatus(data.maritalStatus);
    setMotherName(data.motherName);
    setPincode(data.pincode);
    setLocalAddress(data.localAddress);
    setDOB(data.DOB);
    setMobileNumber(data.mobileNumber);
    setEmail(data.email);
    setPOB(data.POB);
    setHandicap(data.handicap);
    setFatherName(data.fatherName);
    setFatherMobileNumber(data.fatherMobileNumber);
    setFatherOccupation(data.fatherOccupation);
    setIncome(data.income);
    setCategory(data.category);
    setReligion(data.religion);
    setCaste(data.caste);
    setBloodGroup(data.bloodGroup);
    setAadharNumber(data.aadharNumber);
    setAbcid(data.abcid);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/cap/GetCourses")
      .then((response) => {
        const filteredData = Object.keys(response.data)
          .filter((key) => key !== "_id")
          .reduce((acc, key) => ({ ...acc, [key]: response.data[key] }), {});
        console.log(filteredData);
        setCourses(filteredData);
        const data = JSON.parse(localStorage.getItem("personalInfo"));
        if (data) {
          loadData(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  function saveNext() {
    const personalInfo = {
      course: [level, course, stream, year],
      name: name,
      address: address,
      state: state,
      city: city,
      gender: gender,
      maritalStatus: maritalStatus,
      motherName: motherName,
      pincode: pincode,
      localAddress: localAddress,
      DOB: DOB,
      mobileNumber: mobileNumber,
      email: email,
      POB: POB,
      handicap: handicap,
      fatherName: fatherName,
      fatherMobileNumber: fatherMobileNumber,
      fatherOccupation: fatherOccupation,
      income: income,
      category: category,
      religion: religion,
      caste: caste,
      bloodGroup: bloodGroup,
      aadharNumber: aadharNumber,
      abcid: abcid,
    };
    const PrevCourse = JSON.parse(localStorage.getItem("personalInfo"));
    if (PrevCourse) {
      if (personalInfo.course != PrevCourse.course) {
        localStorage.removeItem("Subjects");
      }
    }
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    func("EducationalInfo");
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-[calc(100vh-8rem)] overflow-y-auto flex justify-center items-center">
        Loading
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-8rem)] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Basic Info</h1>

      {/* Admission Details */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Admission Applying For *
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setCourse(Object.keys(courses[e.target.value] || {})[0]);
              setStream(
                Object.keys(
                  courses[e.target.value]?.[
                    Object.keys(courses[e.target.value] || {})[0]
                  ] || {}
                )[0]
              );
              setYear(
                courses[e.target.value]?.[
                  Object.keys(courses[e.target.value] || {})[0]
                ]?.[
                  Object.keys(
                    courses[e.target.value]?.[
                      Object.keys(courses[e.target.value] || {})[0]
                    ] || {}
                  )[0]
                ]?.[0]
              );
            }}
          >
            {Object.keys(courses).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setStream(Object.keys(courses[level]?.[e.target.value] || {})[0]);
              setYear(
                courses[level]?.[e.target.value]?.[
                  Object.keys(courses[level]?.[e.target.value] || {})[0]
                ]?.[0]
              );
            }}
          >
            {Object.keys(courses[level] || {}).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Stream
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={stream}
            onChange={(e) => {
              setStream(e.target.value);
              setYear(courses[level]?.[course]?.[e.target.value]?.[0]);
            }}
          >
            {Object.keys(courses[level]?.[course] || {}).map((stream) => (
              <option key={stream} value={stream}>
                {stream}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {courses[level]?.[course]?.[stream]?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

     {/* Admission Applying Class */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Admission Applying Class *
        </label>
        <input
          type="text"
          value={`${year} ${course} ${stream}`}
          readOnly
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Candidate's Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Candidate’s Name (As given in 10<sup>th</sup>/12<sup>th</sup>{" "}
          Certificate) *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Permanent Address */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Permanent Address *
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* State and City */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Gender and Marital Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender *
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marital Status *
          </label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="unmarried">Unmarried</option>
            <option value="married">Married</option>
          </select>
        </div>
      </div>

      {/* Mother's Name and Pincode */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="number"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Local Address */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Local Address *
        </label>
        <input
          type="text"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* DOB and Mobile No */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            DOB *
          </label>
          <input
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile No *
          </label>
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Email ID */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Email ID *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Place of Birth */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Place Of Birth *
        </label>
        <input
          type="text"
          value={POB}
          onChange={(e) => setPOB(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Is Handicapped */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Is Handicapped
        </label>
        <select
          value={handicap}
          onChange={(e) => setHandicap(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Additional Information */}
      <h2 className="text-xl font-bold mt-8 mb-4">Additional Information</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parents/Guardian Name *
          </label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parent Cell No *
          </label>
          <input
            type="number"
            value={fatherMobileNumber}
            onChange={(e) => setFatherMobileNumber(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Category and Organ Donation */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occupation of Parents *
          </label>
          <input
            type="text"
            value={fatherOccupation}
            onChange={(e) => setFatherOccupation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Annual Income of Parents *
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Parents/Guardian Name and Email */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="NT">NT</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Religion *
          </label>
          <select
            type="text"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Jain">Jain</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Occupation and Parent Cell No */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caste *
          </label>
          <input
            type="text"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group *
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Aadhar Card No and Religion */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Aadhar Card No *
          </label>
          <input
            type="number"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            ABC ID *
          </label>
          <input
            type="number"
            value={abcid}
            onChange={(e) => setAbcid(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={() => {
          saveNext();
        }}
      >
        Save and Next
      </button>
    </div>
  );
};

export default PersonalInfo;