import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageScholarships = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch scholarships from the backend
  useEffect(() => {
    fetch("http://localhost:5000/allScholarship")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching scholarships:", error));
  }, []);

  // Handle View Details
  const handleSeeDetails = (id) => {
    if (user && user.email) {
      navigate(`/viewDetails/${id}`);
    } else {
      navigate("/login", { state: { from: `/viewDetails/${id}` } });
    }
  };

  // Open Modal with Selected Scholarship Details
  const handleEditScholarship = (scholarship) => {
    setSelectedScholarship(scholarship);
    setModalVisible(true);
  };

  // Handle Image Upload to imgbb
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);
    try {
      const res = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSelectedScholarship({
          ...selectedScholarship,
          universityLogo: data.data.display_url, // Use display_url for the uploaded image
        });
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
      setUploadingImage(false);
    }
  };

  // Handle Update Scholarship
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/allScholarship/${selectedScholarship._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedScholarship),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Scholarship details have been updated.", "success");
          setData((prevData) =>
            prevData.map((item) =>
              item._id === selectedScholarship._id ? selectedScholarship : item
            )
          );
          setModalVisible(false);
        }
      })
      .catch((err) => console.error("Error updating scholarship:", err));
  };

  // Handle Delete/Cancel Scholarship
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/allScholarship/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The scholarship has been deleted.", "success");
              setData((prevData) => prevData.filter((scholarship) => scholarship._id !== id));
            }
          })
          .catch((err) => console.error("Error cancelling scholarship:", err));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Manage Scholarships</h2>
      <div className="overflow-x-auto table collapse ">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-custom1 text-white">
            <tr>
            <th className="px-4 py-2 text-left">Scholarship Logo</th>
              <th className="px-4 py-2 text-left">Scholarship Name</th>
              <th className="px-4 py-2 text-left">University Name</th>
              <th className="px-4 py-2 text-left">Subject Category</th>
              <th className="px-4 py-2 text-left">Degree</th>
              <th className="px-4 py-2 text-left">Application Fees</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((scholarship) => (
              <tr key={scholarship._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2"><img src={scholarship.universityLogo
                  } alt="" /></td>
                <td className="border px-4 py-2">{scholarship.scholarshipName}</td>
                <td className="border px-4 py-2">{scholarship.universityName}</td>
                <td className="border px-4 py-2">{scholarship.subjectCategory}</td>
                <td className="border px-4 py-2">{scholarship.degree}</td>
                <td className="border px-4 py-2 text-center">
                  {scholarship.applicationFees || "N/A"}
                </td>
                <td className="border px-4 py-2 text-center flex justify-center space-x-3">
                  <button
                    onClick={() => handleSeeDetails(scholarship._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEditScholarship(scholarship)}
                    className="text-green-600 hover:text-green-800"
                    title="Edit Scholarship"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleCancel(scholarship._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Cancel Scholarship"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full h-[600px] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Edit Scholarship</h3>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2">
          Scholarship Name
          <input
            type="text"
            value={selectedScholarship.scholarshipName}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                scholarshipName: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          University Name
          <input
            type="text"
            value={selectedScholarship.universityName}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                universityName: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          University Logo
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {uploadingImage && <p className="text-sm text-gray-500">Uploading image...</p>}
        </label>
        <label className="block mb-2">
          University Country
          <input
            type="text"
            value={selectedScholarship.universityCountry || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                universityCountry: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          University City
          <input
            type="text"
            value={selectedScholarship.universityCity || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                universityCity: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          University World Rank
          <input
            type="text"
            value={selectedScholarship.universityWorldRank || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                universityWorldRank: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Subject Category
          <select
            value={selectedScholarship.subjectCategory || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                subjectCategory: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </label>
        <label className="block mb-2">
          Scholarship Category
          <select
            value={selectedScholarship.scholarshipCategory || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                scholarshipCategory: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </label>
        <label className="block mb-2">
          Degree
          <select
            value={selectedScholarship.degree || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                degree: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </label>
        <label className="block mb-2">
          Tuition Fees
          <input
            type="number"
            value={selectedScholarship.tuitionFees || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                tuitionFees: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Application Fees
          <input
            type="text"
            value={selectedScholarship.applicationFees || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                applicationFees: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Service Charge
          <input
            type="text"
            value={selectedScholarship.serviceCharge || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                serviceCharge: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Application Deadline
          <input
            type="date"
            value={selectedScholarship.applicationDeadline || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                applicationDeadline: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Scholarship Post Date
          <input
            type="date"
            value={selectedScholarship.scholarshipPostDate || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                scholarshipPostDate: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Posted User Email
          <input
            type="email"
            value={selectedScholarship.postedUserEmail || ""}
            onChange={(e) =>
              setSelectedScholarship({
                ...selectedScholarship,
                postedUserEmail: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setModalVisible(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default ManageScholarships;
