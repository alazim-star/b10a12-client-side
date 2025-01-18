import React, { useState } from "react";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarshipModerator = () => {
  const [universityLogo, setUniversityLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setUniversityLogo(data.data.display_url); // Corrected to use `display_url`
        Swal.fire({
          title: "Success",
          text: "Image uploaded successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to upload image. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddScholarship = (event) => {
    event.preventDefault();

    const form = event.target;
    const scholarshipName = form.scholarshipName.value;
    const universityName = form.universityName.value;
    const universityCountry = form.universityCountry.value;
    const universityCity = form.universityCity.value;
    const universityRank = form.universityRank.value;
    const subjectCategory = form.subjectCategory.value;
    const scholarshipCategory = form.scholarshipCategory.value;
    const degree = form.degree.value;
    const tuitionFees = form.tuitionFees.value || "N/A";
    const applicationFees = form.applicationFees.value;
    const serviceCharge = form.serviceCharge.value;
    const applicationDeadline = form.applicationDeadline.value;
    const postDate = form.postDate.value;
    const postedUserEmail = form.postedUserEmail.value;
    const description = form.description.value; // New description field

    const newScholarship = {
      scholarshipName,
      universityName,
      universityLogo,
      universityCountry,
      universityCity,
      universityRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline,
      postDate,
      postedUserEmail,
      description, // Add description to the newScholarship object
    };

    fetch("http://localhost:5000/allScholarship", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newScholarship),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Scholarship added successfully!",
            icon: "success",
          });
          form.reset();
          setUniversityLogo("");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Failed to add scholarship. Please try again later.",
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Scholarship
        </h2>
        <form onSubmit={handleAddScholarship}>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>Scholarship Name</label>
              <input
                name="scholarshipName"
                type="text"
                placeholder="Scholarship Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="relative mb-4">
              <label>University Name</label>
              <input
                name="universityName"
                type="text"
                placeholder="University Name"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="relative mb-4">
            <label>University Logo</label>
            <input
              type="file"
              className="input input-bordered w-full"
              onChange={handleImageUpload}
              accept="image/*"
            />
            {loading && <p>Uploading image...</p>}
            {universityLogo && (
              <img
                src={universityLogo}
                alt="University Logo"
                className="mt-3 h-20"
              />
            )}
          </div>
          {/* Rest of the form remains the same */}
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>University Country</label>
              <input
                name="universityCountry"
                type="text"
                placeholder="University Country"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="relative mb-4">
              <label>University City</label>
              <input
                name="universityCity"
                type="text"
                placeholder="University City"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="relative mb-4">
            <label>University World Rank</label>
            <input
              name="universityRank"
              type="number"
              placeholder="University Rank"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>Subject Category</label>
              <select
                name="subjectCategory"
                className="select select-bordered w-full"
                required
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <div className="relative mb-4">
              <label>Scholarship Category</label>
              <select
                name="scholarshipCategory"
                className="select select-bordered w-full"
                required
              >
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-Fund</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>Degree</label>
              <select
                name="degree"
                className="select select-bordered w-full"
                required
              >
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
            <div className="relative mb-4">
              <label>Tuition Fees (Optional)</label>
              <input
                name="tuitionFees"
                type="text"
                placeholder="Tuition Fees"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>Application Fees</label>
              <input
                name="applicationFees"
                type="text"
                placeholder="Application Fees"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="relative mb-4">
              <label>Service Charge</label>
              <input
                name="serviceCharge"
                type="text"
                placeholder="Service Charge"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mb-4">
              <label>Application Deadline</label>
              <input
                name="applicationDeadline"
                type="date"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="relative mb-4">
              <label>Scholarship Post Date</label>
              <input
                name="postDate"
                type="date"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="relative mb-4">
            <label>Posted User Email</label>
            <input
              name="postedUserEmail"
              type="email"
              placeholder="User Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* New Description Field */}
          <div className="relative mb-4">
            <label>Scholarship Description</label>
            <textarea
              name="description"
              placeholder="Enter scholarship description"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="btn bg-green-600 w-full text-white hover:bg-green-700"
          >
            Add Scholarship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipModerator
