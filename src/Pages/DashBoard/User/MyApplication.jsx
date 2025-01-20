import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../Shard/SectionTitle";

const MyApplication = () => {
  const { user } = useContext(AuthContext); // Access user context
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(""); // For handling application status
  const navigate = useNavigate();
  const [data,setData]=useState([])
  const totalPrice = applications.reduce(
    (total, item) => total + Number(item.applicationFees || 0),
    0
  );

  // Fetch all applications for the logged-in user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://b10a12-server-side-one.vercel.app/applications/${user?.email}`)
        .then((res) => {
          setApplications(res.data);
        })
        .catch((err) => console.error("Error fetching applications:", err));
    }
  }, [user]);

  // Handle Delete/Cancel Application
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
        axios
          .delete(`https://b10a12-server-side-one.vercel.app/applications/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "The application has been deleted.", "success");
              setApplications((prev) => prev.filter((app) => app._id !== id));
            }
          })
          .catch((err) => console.error("Error cancelling application:", err));
      }
    });
  };

  // Handle Update Application
  const handleUpdateApplication = (e) => {
    e.preventDefault();
    const updatedData = {
      ApplicantsPhoneNumber: phoneNumber,
      ApplicantAddress: address,
      status,
    };

    axios
      .put(`https://b10a12-server-side-one.vercel.app/applications/${selectedApplication._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Your application has been updated.", "success");
          setApplications((prev) =>
            prev.map((app) =>
              app._id === selectedApplication._id ? { ...app, ...updatedData } : app
            )
          );
          setIsModalOpen(false);
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
      rating,
      comment,
      email: user.email,
      universityName: selectedApplication.universityName,
      scholarshipName:selectedApplication.scholarshipName,
      timestamp: new Date().toISOString()

    };

    axios
      .post("https://b10a12-server-side-one.vercel.app/reviews", reviewData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Review added successfully!", "success");
          setReviewModalOpen(false);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong. Try again later.", "error");
      });
  };

 // Fetch scholarships from the backend
   useEffect(() => {
     fetch("https://b10a12-server-side-one.vercel.app/allScholarship")
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
      
      <div className=" items-center mb-6">
        <SectionTitle heading="My Applications"></SectionTitle>
      
      </div>
    <div className=" flex gap-10 my-5 ">  

<div>
<h2 className='text-2xl'>Total Application: {applications.length}</h2>
<h2 className='text-2xl'>Total Payment:{totalPrice}</h2>
</div>

{applications.length ? <Link to="/dashboard/payment">
<button  className="btn btn-primary">Pay Now</button>
</Link>:<button  disabled className="btn btn-primary">Pay</button>

}

    </div>
      {applications.length > 0 ? (
        <table className="table-auto w-full bg-white shadow-lg rounded-md">
          <thead>
            <tr>
              <th className="p-4">University Logo</th>
              <th className="p-4">University Name</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Address</th>
              <th className="p-4">Degree</th>
              <th className="p-4">Application Fee</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id} className="border-b">
                <td className="p-4">
                  <img src={application.universityLogo} alt="Logo" className="w-12 h-12" />
                </td>
                <td className="p-4">{application.universityName}</td>
                <td className="p-4">{application.ApplicantsPhoneNumber}</td>
                <td className="p-4">{application.ApplicantAddress}</td>
                <td className="p-4">{application.ApplyingDegree}</td>
                <td className="p-4">{application.applicationFees}</td>
                <td className="p-4">{application.status}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleSeeDetails(application._id)}
                    className="btn btn-primary"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApplication(application);
                      setPhoneNumber(application.ApplicantsPhoneNumber || "");
                      setAddress(application.ApplicantAddress || "");
                      setStatus(application.status || "Pending");
                      setIsModalOpen(true);
                    }}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(application._id)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApplication(application);
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
              <div className="mt-4">
                <label className="block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
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
                  Submit
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
