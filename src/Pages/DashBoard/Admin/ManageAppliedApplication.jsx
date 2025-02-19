import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import SectionTitle from '../../../Shard/SectionTitle';
import { MdOutlineSystemUpdateAlt } from 'react-icons/md';

const ManageAppliedApplication = () => {
  const { user } = UseAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [modalType, setModalType] = useState(''); // "details", "feedback", or "status"
  const [sortOption, setSortOption] = useState('date'); // Default sorting by date
  const [status, setStatus] = useState(''); // Status options

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

  // Handle status update
  const updateStatus = () => {
    if (selectedApplication?._id) {
      axios
        .patch(`https://b10a12-server-side-one.vercel.app/applications/${selectedApplication._id}`, { status })
        .then(() => {
          Swal.fire('Status Updated', 'Application status updated successfully.', 'success');
          setApplications((prev) =>
            prev.map((app) =>
              app._id === selectedApplication._id ? { ...app, status } : app
            )
          );
          setStatus('');
          setSelectedApplication(null);
        })
        .catch((err) => console.error('Error updating status:', err));
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

  // Sort applications
  const sortApplications = () => {
    let sortedApplications = [...applications];

    if (sortOption === 'date') {
      sortedApplications.sort((a, b) => new Date(b.ApplyingDate) - new Date(a.ApplyingDate));
    } else if (sortOption === 'deadline') {
      sortedApplications.sort((a, b) => new Date(b.scholarshipDeadline) - new Date(a.scholarshipDeadline));
    }

    return sortedApplications;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="items-center mb-6">
        <SectionTitle heading="Manage Applied Application"></SectionTitle>
        <h2 className='text-2xl'>Total Application: {applications.length}</h2>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {/* Dropdown for Sorting */}
        <select
          className="select select-bordered"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date">Sort by Applied Date</option>
          <option value="deadline">Sort by Scholarship Deadline</option>
        </select>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">University Logo</th>
              <th className="px-4 py-2 border">University Name</th>
              <th className="px-4 py-2 border">Degree</th>
              <th className="px-4 py-2 border">Candidate</th>
              <th className="px-4 py-2 border">Apply Date</th>
              <th className="px-2 py-2 border">Post Date</th>
              <th className="px-2 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortApplications().map((application) => (
              <tr key={application._id}>
                <td className="px-4 py-2 border">
                  <img src={application.universityLogo} alt="Logo" className="h-12 w-12 object-contain" />
                </td>
                <td className="px-4 py-2 border">{application.universityName}</td>
                <td className="px-4 py-2 border">{application.ApplyingDegree}</td>
                <td className="px-4 py-2 border">{application.email}</td>
                <td className="px-4 py-2 border">{application.ApplyingDate}</td>
                <td className="px-2 py-2 border">{application.scholarshipDeadline}</td>
                <td className="px-5 py-2 border ">{application.status}

                <MdOutlineSystemUpdateAlt
                    className="text-xl"
                    onClick={() => {
                      setSelectedApplication(application);
                      setModalType('status');
                    }}
                  >
                    Update Status
                  </MdOutlineSystemUpdateAlt>



                  

                </td>
                <td className="px-4 py-2 border text-center">
  <select
    className="px-3 py-1 border rounded bg-gray-100"
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
    <option value="">Select Action</option>
    <option value="details">View Details</option>
    <option value="feedback">Give Feedback</option>
    <option value="cancel">Cancel Application</option>
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
            ) : modalType === 'status' ? (
              <>
                <h2 className="text-xl font-bold mb-4">Update Status</h2>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
               
                  <option value="Applied">Applied</option>
                  <option value="Done">Done</option>
                  <option value="Not Eligible">Not Eligible</option>
                  <option value="Try Next Time">Try Next Time</option>
                </select>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded"
                    onClick={() => setSelectedApplication(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={updateStatus}
                  >
                    Update
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

export default ManageAppliedApplication;
