import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

const AdmissionApproval = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch unverified documents from the backend
  useEffect(() => {
    const fetchUnverifiedDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cap/Admissionverification'); 
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUnverifiedDocuments();
  }, []);

  // Function to handle verification
  const handleVerify = async (email) => {
    try {
      // Call the backend API to verify the document
      await axios.put(`http://localhost:5000/cap/verifyAdmission`, { email: email }); // Replace with your API endpoint

      // Update the local state to remove the verified document
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.email !== email));
    } catch (err) {
      console.error('Error verifying document:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Unverified Admissions</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No unverified documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">Document ID:</span>{' '}
                  <span className="text-gray-600">{doc.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Student Name:</span>{' '}
                  <span className="text-gray-600">{doc.studentName}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>{' '}
                  <span className="text-gray-600">{doc.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Submitted On:</span>{' '}
                  <span className="text-gray-600">{doc.submittedOn}</span>
                </div>
              </div>
              <button
                onClick={() => handleVerify(doc.email)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Verify
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdmissionApproval;