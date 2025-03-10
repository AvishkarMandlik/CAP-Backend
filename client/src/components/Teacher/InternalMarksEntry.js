import React, { useState, useEffect } from "react";
import API from "../services/api";

function InternalMarksEntry() {
    const [marks, setMarks] = useState([]);
    const [formData, setFormData] = useState({
        studentName: "",
        subName: "",
        marks: ""
    });

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async () => {
        const response = await API.get("/teacher/InternalMark");
        setMarks(response.data.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/teacher/InternalMarkEntry", formData);
        setFormData({ studentName: "", subName: "", marks: "" });
        fetchMarks();
    };

    const handleDelete = async (id) => {
        await API.delete(`/teacher/InternalMark/${id}`);
        fetchMarks();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Internal Marks</h2>
            <form onSubmit={handleSubmit} className="my-4">
                <input type="text" name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} className="border p-2 m-2" required />
                <input type="text" name="subName" placeholder="Subject Name" value={formData.subName} onChange={handleChange} className="border p-2 m-2" required />
                <input type="number" name="marks" placeholder="Marks" value={formData.marks} onChange={handleChange} className="border p-2 m-2" required />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Marks</button>
            </form>
            <table className="border-collapse border w-full">
                <thead>
                    <tr>
                        <th className="border p-2">Student Name</th>
                        <th className="border p-2">Subject</th>
                        <th className="border p-2">Marks</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((mark) => (
                        <tr key={mark._id}>
                            <td className="border p-2">{mark.studentName}</td>
                            <td className="border p-2">{mark.subName}</td>
                            <td className="border p-2">{mark.marks}</td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(mark._id)} className="bg-red-500 text-white p-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InternalMarksEntry;