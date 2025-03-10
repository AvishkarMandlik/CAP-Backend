import API from "../services/api";
import React, { useState, useEffect } from "react";

function EditInternalMarks() {
    const [marks, setMarks] = useState([]);
    const [editingMark, setEditingMark] = useState(null);
    const [updatedMark, setUpdatedMark] = useState("");

    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = async () => {
        const response = await API.get("/teacher/InternalMark");
        setMarks(response.data.data);
    };

    const handleEdit = (mark) => {
        setEditingMark(mark);
        setUpdatedMark(mark.marks);
    };

    const handleUpdate = async () => {
        if (!editingMark) return;
        await API.put(`/teacher/InternalMarkById/${editingMark._id}`, { marks: updatedMark });
        setEditingMark(null);
        setUpdatedMark("");
        fetchMarks();
    };

    const handleDelete = async (id) => {
        await API.delete(`/teacher/InternalMark/${id}`);
        fetchMarks();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Edit Internal Marks</h2>
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
                            <td className="border p-2">
                                {editingMark && editingMark._id === mark._id ? (
                                    <input
                                        type="number"
                                        value={updatedMark}
                                        onChange={(e) => setUpdatedMark(e.target.value)}
                                        className="border p-1"
                                    />
                                ) : (
                                    mark.marks
                                )}
                            </td>
                            <td className="border p-2">
                                {editingMark && editingMark._id === mark._id ? (
                                    <button onClick={handleUpdate} className="bg-green-500 text-white p-1">Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(mark)} className="bg-yellow-500 text-white p-1">Edit</button>
                                )}
                                <button onClick={() => handleDelete(mark._id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EditInternalMarks;