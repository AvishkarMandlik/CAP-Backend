import React from 'react';

function Sem({ title, subjects ,del, rem, ident}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      {/* Semester Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>

      {/* Subjects Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-sm font-medium text-gray-600 uppercase">Sr.No.</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600 uppercase">Name Of Subject</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600 uppercase">Subject Code</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600 uppercase">Compulsion</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-600 uppercase">Delete Subject</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{subject.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{subject.code}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{subject.compulsion}</td>
              <td className="px-4 py-3 text-sm">
                <button
                  className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-600 transition cursor-pointer"
                onClick={() => rem(del, ident, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sem;