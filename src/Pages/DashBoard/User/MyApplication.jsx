import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyApplication = () => {
  const { user } = useContext(AuthContext); // Access user context
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Fetch all applications for the logged-in user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/applications/${user?.email}`)
        .then((res) => {
          setApplications(res.data);
          setFilteredApplications(res.data);
        })
        .catch((err) => console.error("Error fetching applications:", err));
    }
  }, [user]);

  // Handle Delete/Cancel Scholarship
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allScholarship/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The scholarship has been deleted.", "success");
              setData((prevData) => prevData.filter((scholarship) => scholarship._id !== id));
            }
          })
          .catch((err) => console.error("Error cancelling scholarship:", err));
      }
    });
  };

  // Handle Update Application
  const handleUpdateApplication = (e) => {
    e.preventDefault();

    const updatedData = {
      ApplicantsPhoneNumber: phoneNumber,
      ApplicantAddress: address,
    };

    axios
      .put(`http://localhost:5000/applications/${selectedApplication._id}`, updatedData)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Your application has been updated.", "success");
          setIsModalOpen(false);
          setApplications((prevApplications) =>
            prevApplications.map((scholarship) =>
              scholarship._id === selectedApplication._id
                ? { ...scholarship, ...updatedData }
                : scholarship
            )
          );
        } else {
          Swal.fire("Error", "Unable to update the application.", "error");
        }
      })
      .catch((err) => {
        console.error("Error updating application:", err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      scholarshipId: selectedApplication._id,
      rating: rating,
      comment: comment,
      email: user.email,
      universityName: selectedApplication.universityName,
      timestamp: new Date().toISOString(),
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success", "Review added successfully!", "success");
          setReviewModalOpen(false);
        } else {
          Swal.fire("Error", "Failed to add the review. Try again.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong. Try again later.", "error");
      });
  };

  // Filter applications based on the search term
  const handleSearch = () => {
    const filtered = applications.filter((scholarship) =>
      scholarship.universityName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  // Reset search filter
  const handleReset = () => {
    setFilteredApplications(applications);
    setSearchTerm("");
  };

 // Fetch scholarships from the backend
 useEffect(() => {
  fetch("http://localhost:5000/allScholarship")
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((error) => console.error("Error fetching scholarships:", error));
}, []);

// Handle View Details
const handleSeeDetails = (id) => {
  if (user && user.email) {
    navigate(`/viewDetails/${id}`);
  } else {
    navigate("/login", { state: { from: `/viewDetails/${id}` } });
  }
};

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Applications</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by University Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
          <button className="btn bg-green-600 text-white" onClick={handleSearch}>
            Search
          </button>
          <button className="btn bg-gray-600 text-white" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {filteredApplications.length > 0 ? (
        <table className="table-auto w-full bg-white shadow-lg rounded-md">
          <thead>
            <tr>
              <th className="p-4">University Name</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Address</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((scholarship) => (
              <tr key={scholarship._id} className="border-b">
                <td className="p-4">{scholarship.universityName}</td>
                <td className="p-4">{scholarship.ApplicantsPhoneNumber || "N/A"}</td>
                <td className="p-4">{scholarship.ApplicantAddress || "N/A"}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleSeeDetails(scholarship._id)}
                    className=" btn-primary btn "
                    title="View Details"
                  >
                   Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApplication(scholarship);
                      setPhoneNumber(scholarship.ApplicantsPhoneNumber || "");
                      setAddress(scholarship.ApplicantAddress || "");
                      setIsModalOpen(true);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(scholarship._id)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApplication(scholarship);
                      setReviewModalOpen(true);
                    }}
                    className="btn btn-success"
                  >
                    Add Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No applications found.</p>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold">Edit Application</h3>
            <form onSubmit={handleUpdateApplication}>
              <div className="mt-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold">Add Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mt-4">
                <label className="block mb-2">Rating</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input input-bordered w-full"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setReviewModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplication;
