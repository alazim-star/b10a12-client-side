import React, { useEffect, useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import SectionTitle from '../Shard/SectionTitle';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const scholarshipsPerPage = 4; 

  // Fetch all scholarships
  useEffect(() => {
    fetch('https://b10a12-server-side-one.vercel.app/allScholarship')
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setFilteredScholarships(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching scholarships:', error));
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!scholarships.length) return;

    const filtered = scholarships.filter((app) => {
      const scholarshipName = app.scholarshipName || "";
      const universityName = app.universityName || "";
      const degree = app.degree || "";

      return (
        scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        degree.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  };

  // Handle reset
  const handleReset = () => {
    setFilteredScholarships(scholarships);
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // Filter by tuition fees
  useEffect(() => {
    let filtered = [...scholarships];

    if (minPrice) {
      filtered = filtered.filter((scholarship) => scholarship.tuitionFees >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((scholarship) => scholarship.tuitionFees <= parseFloat(maxPrice));
    }

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  }, [minPrice, maxPrice, scholarships]);

  // Pagination logic
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(indexOfFirstScholarship, indexOfLastScholarship);

  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SectionTitle heading="All Scholarships" />

      {/* Sticky Search Bar */}
      <div className="sticky  top-0  z-10 shadow-sm p-4 container mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {/* Search Input */}
          <input
            type="text"
            className="input input-bordered w-full md:w-1/2"
            placeholder="Search by university, or degree"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="hover:bg-[#0ab99d] hover:scale-105 hover:shadow-lg transition-all p-4 rounded-lg border-b-4 border-[#0ab99d] bg-[#111827] text-white font-semibold"onClick={handleSearch}>
            Search
          </button>
          <button  className="hover:text-custom1 hover:bg-[#111827] rounded-xl hover:translate-y-1 bg-custom1 p-3  transition border-b-4 border-custom1" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Tuition Fees Filter */}
        <div className="flex gap-2 mt-4 justify-center">
          <input
            type="number"
            className="input input-bordered w-1/3"
            placeholder="Min Tuition Fee"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="input input-bordered w-1/3"
            placeholder="Max Tuition Fee"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Scholarships Grid */}
      <div>
        {loading ? (
          <div className='text-center '>
            <span className="w-20 h-20 loading loading-spinner text-accent"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {currentScholarships.length > 0 ? (
              currentScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))
            ) : (
              <p className="text-center text-lg col-span-full">
                No scholarships found. Try another search or filter.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn ${currentPage === page ? "btn-active" : "btn-outline"}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default AllScholarships;
