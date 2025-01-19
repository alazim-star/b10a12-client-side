import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SectionTitle from '../Shard/SectionTitle';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="my-20">
        <SectionTitle
       
          heading="Our Client Reviews"
        />

        {reviews.length > 0 ? (
          <Marquee pauseOnHover speed={50}>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col items-center mx-8 p-6 bg-white shadow-lg rounded-lg max-w-xs"
              >
                <img
                  className="w-20 h-20 rounded-full mb-4"
                  src={review.photoURL || 'https://via.placeholder.com/150'}
                  alt="Reviewer"
                />
                <p className="font-semibold text-lg">{review.reviewerName || 'Anonymous'}</p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  {review.comment || 'No comments provided.'}
                </p>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={review.rating || 0}
                  readOnly
                />
              </div>
            ))}
          </Marquee>
        ) : (
          <p className="text-center text-gray-500">No reviews available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default Review;
