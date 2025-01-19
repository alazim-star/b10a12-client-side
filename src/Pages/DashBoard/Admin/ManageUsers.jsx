import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser, FaUserShield, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRole, setFilterRole] = useState("all");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Make Admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Make Moderator
  const handleMakeModerator = (user) => {
    axiosSecure.patch(`/users/moderator/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Moderator!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Delete User
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Filter users by role
  const filteredUsers = users.filter((user) => {
    if (filterRole === "all") return true;
    return user.role === filterRole;
  });

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl">All Users</h2>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Total Users: {filteredUsers.length}</h2>
          <select
            className="select select-bordered"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : user.role === "moderator" ? (
                    "Moderator"
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="mr-2"
                      >
                        <FaUserTie className="text-green-600" />
                      </button>
                      <button onClick={() => handleMakeModerator(user)}>
                        <FaUserShield className="text-green-600" />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn-sm btn"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
