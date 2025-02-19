import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SectionTitle from '../Shard/SectionTitle';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://b10a12-server-side-one.vercel.app/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="my-20">
        <SectionTitle heading="Our Client Reviews" subHeading="people say about us" />

        {reviews.length > 0 ? (
          <Marquee pauseOnHover speed={50}>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col items-center mx-8 p-6 bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg rounded-lg max-w-xs transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="w-20 h-20 rounded-full mb-4 border-4 border-white transform transition-all duration-300 hover:scale-110"
                  src={review.photoURL || 'https://via.placeholder.com/150'}
                  alt="Reviewer"
                />
                <p className="font-semibold text-xl text-white mb-2">
                  {review.reviewerName || 'Anonymous'}
                </p>
                <p className="text-sm text-white text-center mt-2 mb-4">
                  {review.comment || 'No comments provided.'}
                </p>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={review.rating || 0}
                  readOnly
                  className="text-yellow-400"
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
