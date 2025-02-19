import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/useAuth';
import axios from 'axios';

const AllAppliedScholarship = () => {
  const { user } = UseAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [modalType, setModalType] = useState(''); // "details" or "feedback"

  // Fetch all applications
  useEffect(() => {
    if (user?.email) {
      axios
        .get('https://b10a12-server-side-one.vercel.app/applications')
        .then((res) => setApplications(res.data))
        .catch((err) => console.error('Error fetching applications:', err));
    }
  }, [user]);

  // Handle feedback submission
  const submitFeedback = () => {
    if (selectedApplication?._id) {
      axios
        .patch(`https://b10a12-server-side-one.vercel.app/applications/${selectedApplication._id}`, { feedback })
        .then(() => {
          Swal.fire('Feedback Submitted', 'Feedback saved successfully.', 'success');
          setApplications((prev) =>
            prev.map((app) =>
              app._id === selectedApplication._id ? { ...app, feedback } : app
            )
          );
          setFeedback('');
          setSelectedApplication(null);
        })
        .catch((err) => console.error('Error submitting feedback:', err));
    }
  };

  // Handle application cancellation
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://b10a12-server-side-one.vercel.app/applications/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Cancelled!', 'The application has been cancelled.', 'success');
              setApplications((prev) => prev.filter((app) => app._id !== id));
            }
          })
          .catch((err) => console.error('Error cancelling application:', err));
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Applied Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">University Logo</th>
              <th className="px-4 py-2 border">University Name</th>
              <th className="px-4 py-2 border">Degree</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="px-4 py-2 border">
                  <img src={application.universityLogo} alt="Logo" className="h-12 w-12 object-contain" />
                </td>
                <td className="px-4 py-2 border">{application.universityName}</td>
                <td className="px-4 py-2 border">{application.ApplyingDegree}</td>
                <td className="px-4 py-2 border">{application.email}</td>
                <td className="px-4 py-2 border">{application.status}</td>
                <td className="px-4 py-2 border text-center">
  <select
    className="px-2 py-1 border rounded bg-gray-100"
    onChange={(e) => {
      const value = e.target.value;
      if (value === "details") {
        setSelectedApplication(application);
        setModalType("details");
      } else if (value === "feedback") {
        setSelectedApplication(application);
        setModalType("feedback");
      } else if (value === "cancel") {
        handleCancel(application._id);
      }
    }}
  >
    <option value="">Select</option>
    <option value="details">Details</option>
    <option value="feedback">Feedback</option>
    <option value="cancel">Cancel</option>
  </select>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            {modalType === 'feedback' ? (
              <>
                <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
                <textarea
                  className="w-full border border-gray-300 rounded p-2"
                  rows="4"
                  placeholder="Enter your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={submitFeedback}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Application Details</h2>
                <p><strong>University:</strong> {selectedApplication.universityName}</p>
                <p><strong>Degree:</strong> {selectedApplication.ApplyingDegree}</p>
                <p><strong>Scholarship Category:</strong> {selectedApplication.scholarshipCategory || 'N/A'}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
                <button
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppliedScholarship
