import React, { useEffect, useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { useNavigate } from 'react-router-dom';

const HomeScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/allScholarship')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setScholarships(data);
        setLoading(false);
      });
  }, []);

  // Limit scholarships to the first 6
  const scholarshipsToShow = scholarships.slice(0, 6);

  return (
    <div>
      {loading ? (
        <p className="text-center text-lg">Loading scholarships...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {scholarshipsToShow.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
          <div className="text-center mt-5">
            <button
             className="hover:bg-[#0ab99d] hover:text-yellow-400 transition-colors p-3 rounded-xl border-b-4 border-yellow-400 bg-[#111827]  text-white font-semibold"
              onClick={() => navigate('/allScholarship')}
            >
              View All Scholarships
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScholarships;
