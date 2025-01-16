import React, { useEffect, useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../Shard/SectionTitle';

const AllScholarships = () => {
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

  // // Limit scholarships to the first 6
  // const scholarshipsToShow = scholarships.slice(0, 6);

  return (
   <>
   <SectionTitle subHeading='we have most popular Scholarship' heading='All scholarship'></SectionTitle>
   <div>
      {loading ? (
        <p className="text-center text-lg">Loading scholarships...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
       
        </>
      )}
    </div>
   </>
  );
};

export default AllScholarships;
