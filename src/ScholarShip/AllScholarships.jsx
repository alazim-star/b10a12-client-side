import React, { useEffect, useState } from 'react';
import ScholarshipCard from './ScholarshipCard';
import SectionTitle from '../Shard/SectionTitle';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 4; 
  // Fetch all scholarships
  useEffect(() => {
    fetch('http://localhost:5000/allScholarship')
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
    if (!scholarships.length) return;
    setFilteredScholarships(scholarships);
    setSearchTerm("");
    setCurrentPage(1); 
  };

  // Pagination logic
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(
    indexOfFirstScholarship,
    indexOfLastScholarship
  );

  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SectionTitle heading="All Scholarships" />
      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-white z-10 shadow-sm p-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Search by scholarship name, university name, or degree name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn bg-green-600 text-white" onClick={handleSearch}>
            Search
          </button>
          <button className="btn bg-green-600 text-white" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div>
        {loading ? (
          <p className="text-center text-lg">Loading scholarships...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-4">
            {currentScholarships.length > 0 ? (
              currentScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))
            ) : (
              <p className="text-center text-lg col-span-full">
                No scholarships found. Try another search.
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
