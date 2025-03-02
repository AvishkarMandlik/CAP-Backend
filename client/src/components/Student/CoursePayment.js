import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "tailwind-toastify";

function CoursePayment() {
  const [isChecked, setIsChecked] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("personalInfo");
    const course = storedData ? JSON.parse(storedData)?.course : null;
    if (course) setCourse(course);
    loadData();
    setLoading(false);
  }, []);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function saveNext(data){
    localStorage.setItem("CoursePayment", JSON.stringify(data));
  }

  function loadData(){
    const storedData = localStorage.getItem("CoursePayment");
    if(storedData){
      const data = storedData ? JSON.parse(storedData) : null;
      setPaymentDetails(data);
      setTransaction(true);
    }
  }

  const handlePayment = () => {
    axios
      .get("http://localhost:5000/test/payment")
      .then((response) => {
        console.log(response.data);
        const payment = {
          transId: response.data.transId,
          amount: response.data.amount,
          status: response.data.status,
          date: response.data.date,
          bankresponse: response.data.bankresponse,
        };
        setPaymentDetails(payment);
        setTransaction(true);
        saveNext(payment);
        showAlert("success", "Success", "Dummy Payment successful");
      })
      .catch((error) => {
        console.error(error);
        showAlert("error", "Error", "Dummy Payment failed");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto border">
      <h1 className="text-2xl font-bold mb-4">Make Payment</h1>

      <div className="mb-4">
        <p>
          <strong>Apply For :</strong> {course[1]}&nbsp;{course[2]}&nbsp;{course[3]}
        </p>
        <p>
          <strong>Fees (in Rs.) :</strong>{" "}
          <span className="text-xl font-bold">500.00</span>
        </p>
      </div>

      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
        <h2 className="font-bold text-blue-700 underline">
          Terms & Conditions
        </h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Application Form Fees paid will not be refunded in any case.</li>
          <li>
            For all online payments, a nominal processing fee will be charged as
            per the mode of payment selected by you.
          </li>
        </ul>
      </div>

      <div className="flex items-start mb-4">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-5 w-5 mt-1 cursor-pointer"
        />
        <label htmlFor="agree" className="ml-2 text-sm">
          Yes, If there is a failed transaction, please wait for at least 2
          hours before initiating a new transaction. If the amount has been
          deducted from your bank account, please mail us your transaction
          details. In such cases, make another payment only after you receive
          the status report from us.
          <span className="text-red-600 font-bold block">
            Note: Please note that the fees paid is non-refundable.
          </span>
        </label>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        onClick={handlePayment}
        disabled={transaction? true : !isChecked}
      >
        Submit Form For College Verification
      </button>
      {transaction && (
        <>
          <h2 className="text-lg font-bold mt-6">Transaction History</h2>
          <table className="w-full border border-gray-300 mt-2 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">TransID</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Bank Response</th>
                {/* <th className="border px-4 py-2">Receipt</th> */}
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="border px-4 py-2">{paymentDetails?.transId}</td>
                <td className="border px-4 py-2">{paymentDetails?.date}</td>
                <td className="border px-4 py-2">{paymentDetails?.amount}</td>
                <td className="border px-4 py-2 text-green-600">
                  {paymentDetails?.status}
                </td>
                <td className="border px-4 py-2">
                  {paymentDetails?.bankresponse}
                </td>
                {/* <td className="border px-4 py-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Print</button>
            </td> */}
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
export default CoursePayment;
