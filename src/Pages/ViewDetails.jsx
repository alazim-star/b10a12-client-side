import React, { useState, useContext, useEffect } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Marquee from 'react-fast-marquee';

const ViewDetails = () => {
  const scholarship = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewss, setReviewss] = useState([]);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch reviews for the scholarship
  useEffect(() => {
    if (scholarship && scholarship._id) {
      fetch(`https://b10a12-server-side-one.vercel.app/reviews/${scholarship._id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setReviews(data);
            const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating(totalRating / data.length || 0);
          } else {
            console.error('Invalid response:', data);
          }
        })
        .catch(err => console.error('Error fetching reviews:', err));
    }
  }, [scholarship?._id]);

  // Fetch all reviews to display in Marquee
  useEffect(() => {
    fetch('https://b10a12-server-side-one.vercel.app/reviews')
      .then((res) => res.json())
      .then((data) => setReviewss(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Handle applying for the scholarship
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const ApplyingData = {
      email: user?.email || '',
      applicationId: scholarship._id,
      ApplyingDate: selectedDate.toLocaleDateString(),
      applicationFees: scholarship.applicationFees,
      universityName: scholarship?.universityName,
      universityLogo: scholarship.universityLogo,
      ApplicantsPhoneNumber: formData.get('phoneNumber'),
      ApplicantPhoto: formData.get('photo'),
      ApplicantAddress: formData.get('address'),
      ApplicantGender: formData.get('gender'),
      ApplyingDegree: formData.get('degree'),
      SSCResult: formData.get('sscResult'),
      HSCResult: formData.get('hscResult'),
      StudyGap: formData.get('studyGap'),
      scholarshipDeadline: scholarship.applicationDeadline
    };

    setIsSubmitting(true);

    fetch('https://b10a12-server-side-one.vercel.app/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ApplyingData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.insertedId) {
          Swal.fire('Success', 'Scholarship Applied Successfully', 'success');
          setIsModalOpen(false);
          navigate('/dashboard/myApplication', { state: { from: location } });
        } else {
          Swal.fire('Error', 'Failed to apply for the scholarship. Try again.', 'error');
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
      });
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      scholarshipId: scholarship._id,
      username: user?.username,
      email: user?.email,
      rating,
      comment,
      universityName: scholarship?.universityName,
      timestamp: new Date(),
      scholarshipName: scholarship.scholarshipName,
      photoURL: scholarship.photoURL
    };

    fetch('https://b10a12-server-side-one.vercel.app/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire('Success', 'Review submitted successfully', 'success');
          setReviewModalOpen(false);
          setComment('');
          setRating(0);
          setReviews((prevReviews) => [...prevReviews, reviewData]);
          const totalRating = [...reviews, reviewData].reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(totalRating / [...reviews, reviewData].length);
        }
      })
      .catch(() => {
        Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
      });
  };

  return (
    <div>
      {/* Other content remains unchanged */}
<div className='lg:flex'>
  
      {/* Reviews Section */}
      <div className="text-white rounded-xl shadow-md p-6 mt-8 w-[400px] h-[400px] bg-gradient-to-r from-blue-500 to-teal-500 ">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{review.username}</h4>
                <p className="text-sm text-gray-500">{new Date(review?.timestamp).toLocaleString()}</p>
              </div>
              <p className="text-gray-600 mt-2"><strong>Scholarship:</strong> {review?.scholarshipName}</p>
              <p className="text-gray-600 mt-2">{review?.comment}</p>
              <p className="text-gray-600 mt-2">{review?.photoURL}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this scholarship!</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setReviewModalOpen(true)}
            className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold"
          >
            Give Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
            <h3 className="text-2xl font-semibold mb-4">Submit Your Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <Rating
                  onChange={(rate) => setRating(rate)}
                  initialRating={rating}
                  emptySymbol={<FaStar className="text-gray-300" />}
                  fullSymbol={<FaStar className="text-yellow-500" />}
                  fractions={2}
                />
              </div>
              <div>
                <label>Your Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Write your review here..."
                />
              </div>

              <div className="flex justify-between space-x-4 mt-6">
                <button
                  onClick={() => setReviewModalOpen(false)}
                  type="button"
                  className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold"
                >
                  Submit Review
                </button>
              </div>
            </form>
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-red-600 z-50"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="bg-red-50 flex justify-center items-center min-h-screen ">
      <div className="p-6 bg-white rounded-xl shadow-xl flex flex-col space-y-6">
        <div className='flex justify-between bg-red-50 p-5 rounded-xl'>
          <div>
            <h2 className="text-3xl font-bold">{scholarship?.universityName}</h2>
            <div className='flex gap-2'>
              <Rating
                readonly
                initialRating={averageRating}
                emptySymbol={<FaStar className="text-gray-300" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
              />
              <p>Review</p>
            </div>
          </div>
          <p className='text-2xl'><strong>Application Fees:</strong>{scholarship?.applicationFees}</p>
        </div>

        {/* Scholarship Details Card */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 md:space-y-0">
          <img
            src={scholarship?.universityLogo}
            alt={scholarship?.applicationFees}
            className="object-cover border-2 border-gray-300 rounded-lg w-full h-[400px]"
          />
          <div>
            <p className="text-gray-600 text-sm">Service Charge: {scholarship?.details?.serviceCharge}</p>
            <p><strong>Scholarship Category:</strong> {scholarship?.scholarshipCategory}</p>
            <p><strong>Subject Category:</strong> {scholarship?.subjectCategory}</p>
            <p><strong>Stipend:</strong> {scholarship?.details?.stipend}</p>
            <p><strong>Post Date:</strong> {scholarship?.details?.postDate}</p>
            <p><strong>Application Deadline:</strong> {scholarship?.applicationDeadline}</p>
            <div className="mt-4">
              <p><strong>Description:</strong> {scholarship?.details?.scholarshipDescription}</p>
            </div>
            <div className="flex justify-between space-x-4 mt-6">
              <Link to="/allScholarship">
                <button className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold">
                  See All Scholarships   
                </button>
              </Link>
              <button
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <span className="flex items-center gap-2">
                    <i className="fas fa-graduation-cap"></i> Apply Now
                </span>
            </span>
        </button>
            </div>
          </div>
        
        </div>       
      </div>

     {/* Applying Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-gradient-to-r from-custom1 to-purple-500  p-8 rounded-3xl shadow-2xl w-[500px] h-[600px] overflow-y-auto transform transition-all ease-in-out duration-300 hover:scale-105">
      <h3 className="text-3xl font-bold text-white mb-6 text-center">Apply for Scholarship</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Applicant Email */}
        <div>
          <label className="text-lg text-black">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Applicant Phone Number */}
        <div>
          <label className="text-lg text-black">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            required
            className="input input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Applicant Photo */}
        <div>
          <label className="text-lg text-black">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Applicant Address */}
        <div>
          <label className="text-lg text-black">Address</label>
          <textarea
            name="address"
            placeholder="Enter your full address (village, district, country)"
            required
            className="textarea textarea-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Applicant Gender */}
        <div>
          <label className="text-lg text-black">Gender</label>
          <select
            name="gender"
            required
            className="select select-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Applicant Degree */}
        <div>
          <label className="text-lg text-black">Applying Degree</label>
          <select
            required
            className="select select-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
            name="degree"
          >
            <option value="" disabled>Select your degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* SSC Result */}
        <div>
          <label className="text-lg text-black">SSC Result</label>
          <input
            type="text"
            name="sscResult"
            required
            placeholder="Enter your SSC result"
            className="input input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* HSC Result */}
        <div>
          <label className="text-lg text-black">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            required
            placeholder="Enter your HSC result"
            className="input input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Study Gap */}
        <div>
          <label className="text-lg text-white">Study Gap</label>
          <select
            className="select select-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
            name="studyGap"
          >
            <option value="">No gap</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3+ years">3+ years</option>
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="text-lg text-black">Application Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            className="input input-bordered w-full bg-transparent text-black border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
        </div>
   {/* Buttons */}
        <div className="flex justify-between space-x-4 mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
            type="button"
        className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <span className="flex items-center gap-2">
                    <i className="fas fa-graduation-cap"></i> Cancel
                </span>
            </span>
        </button>
          <button
            type="submit"
           className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-3xl text-white z-50 hover:text-red-600"
      >
        ✕
      </button>
    </div>
  </div>
)}

</div>

</div>

      {/* Marquee for all reviews */}
      <div className="container mx-auto px-4">
        <section className="my-20">
          {reviewss.length > 0 ? (
            <Marquee pauseOnHover speed={50}>
              {reviewss.map((review) => (
                <div
                  key={review._id}
                  className="flex flex-col items-center mx-8 p-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 shadow-lg rounded-lg max-w-xs transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    className="w-20 h-20 rounded-full mb-4"
                    src={review.photoURL || 'default-avatar.png'}
                    alt="User Avatar"
                  />
                  <div className="text-white font-semibold">{review.username}</div>
                  <div className="text-white text-sm">{review.comment}</div>
                </div>
              ))}
            </Marquee>
          ) : (
            <p>No reviews to display.</p>
          )}
        </section>




        
      </div>


    </div>
  );
};

export default ViewDetails;
