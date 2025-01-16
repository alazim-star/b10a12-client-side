import React, { useState } from "react";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CheckOutFrom = ({ universityName, scholarshipCategory, subjectCategory }) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    photo: null,
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.photo) {
        const imageData = new FormData();
        imageData.append("image", formData.photo);

        const imageResponse = await fetch(image_hosting_api, {
          method: "POST",
          body: imageData,
        });

        const uploadedImage = await imageResponse.json();
        if (uploadedImage.success) {
          const photoUrl = uploadedImage.data.url;
          const finalData = { ...formData, photo: photoUrl, universityName, scholarshipCategory, subjectCategory };

          const response = await fetch("http://localhost:5000/checkOutForm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalData),
          });

          const result = await response.json();

          if (result.insertedId) {
            Swal.fire({
              title: "Success",
              text: "Form submitted successfully!",
              icon: "success",
              confirmButtonText: "Okay",
            });
            setFormData({
              phoneNumber: "",
              photo: null,
              address: "",
              gender: "",
              degree: "",
              sscResult: "",
              hscResult: "",
              studyGap: "",
            });
          }
        } else {
          throw new Error("Image upload failed.");
        }
      } else {
        throw new Error("No photo selected.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to submit the form. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Check Out Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                className="input input-bordered w-full"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Upload Photo</label>
              <input
                name="photo"
                type="file"
                accept="image/*"
                className="file-input w-full"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Address (Village, District, Country)</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              className="textarea textarea-bordered w-full"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Applying Degree</label>
              <select
                name="degree"
                className="select select-bordered w-full"
                value={formData.degree}
                onChange={handleChange}
                required
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1">SSC Result</label>
              <input
                name="sscResult"
                type="text"
                placeholder="Enter your SSC result"
                className="input input-bordered w-full"
                value={formData.sscResult}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1">HSC Result</label>
              <input
                name="hscResult"
                type="text"
                placeholder="Enter your HSC result"
                className="input input-bordered w-full"
                value={formData.hscResult}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Study Gap (Optional)</label>
            <select
              name="studyGap"
              className="select select-bordered w-full"
              value={formData.studyGap}
              onChange={handleChange}
            >
              <option value="">No Gap</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="More than 3 Years">More than 3 Years</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-4">
            <div>
              <label className="block mb-1">University Name</label>
              <input
                type="text"
                value={universityName}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Scholarship Category</label>
              <input
                type="text"
                value={scholarshipCategory}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Subject Category</label>
              <input
                type="text"
                value={subjectCategory}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-blue-600 w-full text-white hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutFrom;
