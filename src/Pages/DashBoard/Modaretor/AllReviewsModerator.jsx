import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


import UseAuth from '../../../Hooks/useAuth';
import SectionTitle from '../../../Shard/SectionTitle';

const AllReviewsModerator = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = UseAuth();

  // Fetch all reviews
  useEffect(() => {
    axios
      .get('http://localhost:5000/reviews')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // Handle delete review
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/reviews/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'The review has been deleted.', 'success');
              setReviews(reviews.filter((review) => review._id !== id));
            }
          })
          .catch((err) => {
            Swal.fire('Error', 'Failed to delete the review', 'error');
            console.error('Error deleting review:', err);
          });
      }
    });
  };

  return (
<div>
    <SectionTitle heading='All Reviews'></SectionTitle>
<div className="container mx-auto p-6">
   

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card w-full bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={review?.photoURL || '/default-avatar.png'}
                alt="Reviewer"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {review.universityName}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {review.subjectCategory}
              </p>
              <p className="text-gray-500 text-center">
                {review.reviewerName || 'Anonymous'}
              </p>
              <p className="text-gray-400 text-center mb-2">
                {new Date(review.timestamp).toLocaleDateString()}
              </p>
              <div className="flex justify-center mb-4">
                <span className="font-semibold text-yellow-500">
                  {review.rating}
                </span>
                <span className="ml-2 text-gray-500">/5</span>
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>

              <button
                onClick={() => handleDelete(review._id)}
                className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No reviews found.</p>
      )}
    </div>
</div>
  );
};

export default AllReviewsModerator
