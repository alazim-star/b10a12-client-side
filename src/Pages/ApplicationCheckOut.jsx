import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const ApplicationCheckOut = ({ scholarship }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    photoUrl: "",
    address: "",
    gender: "",
    applyingDegree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });

  const { user } = useContext(AuthContext);

  // Handle payment with Stripe
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:5000/paymentHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Pass payment details if required
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment.");
      }

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!scholarship) {
      toast.error("Scholarship details are missing!");
      return;
    }

    const appliedScholarshipData = {
      ...formData,
      userName: user?.username || "Anonymous",
      userEmail: user?.email || "Not provided",
      userId: user?._id || "Unknown",
      scholarshipId: scholarship._id,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      applicationFees: scholarship.applicationFees,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appliedScholarshipData),
      });

      if (response.ok) {
        toast.success("Successfully applied for the scholarship!");
      } else {
        toast.error("Error applying for the scholarship.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Conditional rendering based on payment status
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto">
      {!scholarship ? (
        <div>
          <p>Loading scholarship details...</p>
        </div>
      ) : !paymentSuccess ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pay Application Fee</h2>
          <p className="mb-4">Amount: {scholarship.applicationFees || "N/A"}</p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Application Form</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={formData.photoUrl}
            onChange={(e) =>
              setFormData({ ...formData, photoUrl: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="Address (Village, District, Country)"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={formData.applyingDegree}
            onChange={(e) =>
              setFormData({ ...formData, applyingDegree: e.target.value })
            }
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
          <input
            type="text"
            placeholder="SSC Result"
            value={formData.sscResult}
            onChange={(e) =>
              setFormData({ ...formData, sscResult: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="HSC Result"
            value={formData.hscResult}
            onChange={(e) =>
              setFormData({ ...formData, hscResult: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
          <select
            value={formData.studyGap}
            onChange={(e) =>
              setFormData({ ...formData, studyGap: e.target.value })
            }
            className="select select-bordered w-full"
          >
            <option value="">Select Study Gap (if any)</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3+ Years">3+ Years</option>
          </select>
          <div className="text-gray-700">
            <p>University: {scholarship.universityName}</p>
            <p>Scholarship Category: {scholarship.scholarshipCategory}</p>
            <p>Subject Category: {scholarship.subjectCategory}</p>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplicationCheckOut;
