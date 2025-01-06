import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../authentication/AuthProvider';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

export default function MyMarathonList() {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMarathon, setCurrentMarathon] = useState(null);
  const [updatedMarathon, setUpdatedMarathon] = useState({});

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://join-marathon-server-site.vercel.app/marathons/${user.email}`, {withCredentials: true})
      .then((response) => {
        setMarathons(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching marathon data:', error);
        setLoading(false);
      });
  }, [user?.email]);

  const openModal = (marathon) => {
    setCurrentMarathon(marathon);
    setUpdatedMarathon({
      title: marathon.title,
      startRegistrationDate: new Date(marathon.startRegistrationDate),
      endRegistrationDate: new Date(marathon.endRegistrationDate),
      marathonStartDate: new Date(marathon.marathonStartDate),
      location: marathon.location,
      runningDistance: marathon.runningDistance,
      description: marathon.description,
      marathonImage: marathon.marathonImage,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMarathon(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMarathon({ ...updatedMarathon, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setUpdatedMarathon({ ...updatedMarathon, [name]: date });
  };

  const handleSubmit = async () => {
    if (!currentMarathon?._id) return;

    try {
      const response = await axios.put(
        `https://join-marathon-server-site.vercel.app/users/${currentMarathon._id}`,
        {
          ...updatedMarathon,
          startRegistrationDate: updatedMarathon.startRegistrationDate.toISOString(),
          endRegistrationDate: updatedMarathon.endRegistrationDate.toISOString(),
          marathonStartDate: updatedMarathon.marathonStartDate.toISOString(),
        }
      );
      if (response.data.modifiedCount > 0) {
        setMarathons((prev) =>
          prev.map((marathon) =>
            marathon._id === currentMarathon._id ? { ...marathon, ...updatedMarathon } : marathon
          )
        );
        toast.success('Marathon updated successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error updating marathon:', error);
    }
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
          await axios.delete(`https://join-marathon-server-site.vercel.app/users/${id}`);
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

  if (marathons.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">No marathon events found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">My Marathon List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon, index) => (
              <tr
                key={marathon._id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                  } hover:bg-gray-200 transition duration-200`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={marathon.marathonImage}
                    alt={marathon.title}
                    className="w-24 h-auto rounded-md"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                  {marathon.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">
                  {new Date(marathon.marathonStartDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">{marathon.location}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-4 justify-center">
                  <button
                    onClick={() => openModal(marathon)}
                    className="btn btn-sm btn-primary flex items-center gap-2 shadow-md"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(marathon._id)}
                    className="btn btn-sm btn-error flex items-center gap-2 shadow-md"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Update Marathon</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedMarathon.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={updatedMarathon.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Running Distance</label>
                <input
                  type="text"
                  name="runningDistance"
                  value={updatedMarathon.runningDistance}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="marathonImage"
                  value={updatedMarathon.marathonImage}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={updatedMarathon.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Start Registration Date</label>
                <DatePicker
                  selected={updatedMarathon.startRegistrationDate}
                  onChange={(date) => handleDateChange('startRegistrationDate', date)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">End Registration Date</label>
                <DatePicker
                  selected={updatedMarathon.endRegistrationDate}
                  onChange={(date) => handleDateChange('endRegistrationDate', date)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Marathon Start Date</label>
                <DatePicker
                  selected={updatedMarathon.marathonStartDate}
                  onChange={(date) => handleDateChange('marathonStartDate', date)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="btn btn-sm btn-secondary mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-sm btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
