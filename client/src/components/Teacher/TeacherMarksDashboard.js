import React, { useEffect, useState } from "react";
import API from "../services/api";

function TeacherMarksDashboard() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await API.get("/teacher/getsubjectEntriesforteacher");
            if (response.data.status) {
                setEntries(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching entries:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Marks Entry</h1>
            <h2 className="text-xl font-semibold mb-2">Select Appointment Roll : * Internal Examiner</h2>
            <h3 className="text-lg font-medium mb-4">Appointment Details</h3>
            <p className="mb-4"><strong>For F.Y. 2019 Credit Pattern</strong></p>
            <ul className="list-disc list-inside mb-4">
                <li>If student available in list but not opted for subject then Mark 'NA' in marks entry</li>
                <li>Please refer these details only for Grade subjects except Physical education and Environmental studies</li>
            </ul>
            <div className="mb-4">
                <p><strong>O Grade</strong> : &lt;= 90% &amp; &gt;= 100% Marks</p>
                <p><strong>A + Grade</strong> : &lt;= 75% &amp; &gt;= 89% Marks</p>
                <p><strong>A Grade</strong> : &lt;= 60% &amp; &gt;= 74% Marks</p>
                <p><strong>B + Grade</strong> : &lt;= 55% &amp; &gt;= 59% Marks</p>
                <p><strong>B Grade</strong> : &lt;= 50% &amp; &gt;= 54% Marks</p>
                <p><strong>C Grade</strong> : &lt;= 45% &amp; &gt;= 49% Marks</p>
                <p><strong>D Grade</strong> : &lt;= 40% &amp; &gt;= 44% Marks</p>
                <p><strong>F Grade</strong> : &lt;= 40% Marks</p>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">St./No.</th>
                        <th className="py-2 px-4 border">PunCode</th>
                        <th className="py-2 px-4 border">Appointment ID</th>
                        <th className="py-2 px-4 border">Pattern</th>
                        <th className="py-2 px-4 border">Subject</th>
                        <th className="py-2 px-4 border">End Date</th>
                        <th className="py-2 px-4 border">Batch No.</th>
                        <th className="py-2 px-4 border">Add/Edit</th>
                        <th className="py-2 px-4 border">Preview</th>
                        <th className="py-2 px-4 border">Confirm</th>
                        <th className="py-2 px-4 border">Print</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{entry.punCode}</td>
                            <td className="py-2 px-4 border">{entry.appointmentID}</td>
                            <td className="py-2 px-4 border">{entry.pattern}</td>
                            <td className="py-2 px-4 border">{entry.subject}</td>
                            <td className="py-2 px-4 border">{entry.endDate}</td>
                            <td className="py-2 px-4 border">{entry.batchNo}</td>
                            <td className="py-2 px-4 border">[ ]</td>
                            <td className="py-2 px-4 border">[ ]</td>
                            <td className="py-2 px-4 border">[ ]</td>
                            <td className="py-2 px-4 border">[ ]</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherMarksDashboard;
