import React, { useState } from 'react';


const CheckOutFrom = ({ universityName,scholarship,subjectCategory }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    photo: null,
    address: '',
    gender: '',
    degree: '',
    sscResult: '',
    hscResult: '',
    studyGap: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a form data object to handle file uploads
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    // Submit form data to the server
    fetch('http://localhost:5000/submitApplication', {
      method: 'POST',
      body: submissionData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Application submitted successfully!');
        } else {
          alert('Failed to submit application. Please try again.');
        }
      })
      .catch((err) => console.error('Error submitting application:', err));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Submit Your Application Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-700">Upload Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="file-input w-full"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Enter your village, district, and country"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Applying Degree */}
        <div>
          <label className="block text-gray-700">Applying Degree</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* SSC Result */}
        <div>
          <label className="block text-gray-700">SSC Result</label>
          <input
            type="text"
            name="sscResult"
            value={formData.sscResult}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* HSC Result */}
        <div>
          <label className="block text-gray-700">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            value={formData.hscResult}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Study Gap */}
        <div>
          <label className="block text-gray-700">Study Gap (Optional)</label>
          <select
            name="studyGap"
            value={formData.studyGap}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">No Gap</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="More than 3 Years">More than 3 Years</option>
          </select>
        </div>

        {/* Read-Only Fields */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700">University Name</label>
            <input
              type="text"
              value={universityName}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Scholarship Category</label>
            <input
              type="text"
              value={scholarship}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject Category</label>
            <input
              type="text"
              value={scholarship}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
