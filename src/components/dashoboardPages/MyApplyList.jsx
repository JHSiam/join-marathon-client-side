import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../authentication/AuthProvider';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function MyApplyList() {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMarathon, setCurrentMarathon] = useState(null);

  const fetchMarathons = (title = '') => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/registrations/${user.email}`, {
        params: { title },
      })
      .then((response) => {
        setMarathons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching marathon data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMarathons();
  }, [user?.email]);

  const handleSearch = () => {
    fetchMarathons(searchTitle);
  };

  const handleOpenModal = (marathon) => {
    setCurrentMarathon(marathon);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentMarathon(null);
    setModalOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      contactNumber: e.target.contactNumber.value,
      additionalInfo: e.target.additionalInfo.value,
    };

    axios
      .put(`http://localhost:5000/registrations/${currentMarathon._id}`, updatedData)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire('Success', 'Registration updated successfully', 'success');
          setMarathons((prev) =>
            prev.map((marathon) =>
              marathon._id === currentMarathon._id ? { ...marathon, ...updatedData } : marathon
            )
          );
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error updating registration:', error);
        Swal.fire('Error', 'Failed to update registration', 'error');
      });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/registrations/${id}`);
          setMarathons((prev) => prev.filter((marathon) => marathon._id !== id));
          Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete campaign.', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">My Apply List</h1>

      {/* Search Input */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search by title"
          className="input input-bordered mr-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Marathon Start Date</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Contact Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon, index) => (
              <tr
                key={marathon._id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200 transition duration-200`}
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">{marathon.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{new Date(marathon.marathonStartDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{marathon.firstName}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{marathon.contactNumber}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-4 justify-center">
                  <button onClick={() => handleOpenModal(marathon)} className="btn btn-sm btn-primary flex items-center gap-2 shadow-md">
                    <FaEdit /> Update
                  </button>
                  <button onClick={() => handleDelete(marathon._id)} className="btn btn-sm btn-error flex items-center gap-2 shadow-md">
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {modalOpen && currentMarathon && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-blue-600 text-center">Update Registration</h2>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title (Read-only) */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={currentMarathon.title}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Marathon Start Date (Read-only) */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Marathon Start Date</label>
                  <input
                    type="text"
                    value={new Date(currentMarathon.marathonStartDate).toLocaleDateString()}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                {/* First Name */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={currentMarathon.firstName}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={currentMarathon.lastName}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    defaultValue={currentMarathon.contactNumber}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Additional Info */}
                <div className="mb-4 col-span-1 md:col-span-2">
                  <label className="block font-semibold text-gray-700">Additional Info</label>
                  <textarea
                    name="additionalInfo"
                    defaultValue={currentMarathon.additionalInfo}
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
