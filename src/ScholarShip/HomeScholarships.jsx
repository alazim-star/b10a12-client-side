import React, { useEffect, useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../Shard/SectionTitle';

const HomeScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://b10a12-server-side-one.vercel.app/allScholarship')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setScholarships(data);
        setLoading(false);
      });
  }, []);

  // Limit scholarships to the first 6
  const scholarshipsToShow = scholarships.slice(0, 6);

  return (
    <div className='container mx-auto'>
      <SectionTitle subHeading="New Features" heading="Our new scholarship"></SectionTitle>
      {loading ? (
     <div className='text-center '>
        <span className="w-96 h-96 loading loading-spinner text-accent"></span>
     </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
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
