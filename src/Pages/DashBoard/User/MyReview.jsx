import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAuth from "../../../Hooks/useAuth";

const MyReview = () => {
  const { user } = UseAuth();

  // State management
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all reviews for the logged-in user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/reviews/${user?.email}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [user]);

  // Handle deleting a review
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
          .delete(`http://localhost:5000/reviews/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The review has been deleted.", "success");
            setReviews((prev) => prev.filter((rev) => rev._id !== id));
          })
          .catch((err) => {
            console.error("Error deleting review:", err);
            Swal.fire("Error", "An error occurred while deleting the review.", "error");
          });
      }
    });
  };

  // Handle adding or updating a review
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      email: user.email,
      scholarshipName: selectedReview?.scholarshipName,
      universityName: selectedReview?.universityName,
      comment,
      rating,
      timestamp: new Date().toISOString(),
    };

    if (isEditing) {
      // Update review
      axios
        .put(`http://localhost:5000/reviews/${selectedReview._id}`, reviewData)
        .then(() => {
          Swal.fire("Updated!", "Your review has been updated.", "success");
          setReviews((prev) =>
            prev.map((rev) =>
              rev._id === selectedReview._id ? { ...rev, ...reviewData } : rev
            )
          );
          closeModal();
        })
        .catch((err) => console.error("Error updating review:", err));
    } else {
      // Add new review
      axios
        .post("http://localhost:5000/reviews", reviewData)
        .then(() => {
          Swal.fire("Success!", "Your review has been submitted.", "success");
          setReviews((prev) => [...prev, reviewData]);
          closeModal();
        })
        .catch((err) => console.error("Error submitting review:", err));
    }
  };

  const closeModal = () => {
    setReviewModalOpen(false);
    setSelectedReview(null);
    setComment("");
    setRating(null);
    setIsEditing(false);
  };

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setComment(review.comment);
    setRating(review.rating);
    setReviewModalOpen(true);
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold">
              {isEditing ? "Edit Review" : "Add a Review"}
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mt-4">
                <label className="block mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="input input-bordered w-full"
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
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Table */}
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Scholarship Name</th>
            <th className="px-4 py-2 border">University Name</th>
            <th className="px-4 py-2 border">Review Comments</th>
            <th className="px-4 py-2 border">Review Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev._id}>
              <td className="px-4 py-2 border">{rev.scholarshipName}</td>
              <td className="px-4 py-2 border">{rev.universityName}</td>
              <td className="px-4 py-2 border">{rev.comment}</td>
              <td className="px-4 py-2 border">
                {new Date(rev.timestamp).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                <div className="flex">
                  <button
                    onClick={() => handleEditClick(rev)}
                    className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleCancel(rev._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReview;
