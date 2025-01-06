import axios from 'axios';
import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../authentication/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMarathon() {
  const { user } = useContext(AuthContext);
  const [marathonData, setMarathonData] = useState({
    title: '',
    startRegistrationDate: null,
    endRegistrationDate: null,
    marathonStartDate: null,
    location: '',
    runningDistance: '',
    description: '',
    marathonImage: '',
    createdAt: new Date(),
    count: 0,
    email: user?.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarathonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setMarathonData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleCreateMarathon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://join-marathon-server-site.vercel.app/users',
        marathonData,
        { withCredentials: true }
      );
      toast.success('Marathon created successfully!');
    } catch (error) {
      toast.error('Failed to create the marathon. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Marathon Event</h2>
      <form onSubmit={handleCreateMarathon}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Marathon Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-2">
              Marathon Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              value={marathonData.title}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="input input-bordered w-full"
              value={marathonData.location}
              onChange={handleChange}
            />
          </div>

          {/* Start Registration Date */}
          <div>
            <label className="block font-medium mb-2">Start Registration Date</label>
            <DatePicker
              className="input input-bordered w-full"
              selected={marathonData.startRegistrationDate}
              onChange={(date) => handleDateChange(date, 'startRegistrationDate')}
            />
          </div>

          {/* End Registration Date */}
          <div>
            <label className="block font-medium mb-2">End Registration Date</label>
            <DatePicker
              className="input input-bordered w-full"
              selected={marathonData.endRegistrationDate}
              onChange={(date) => handleDateChange(date, 'endRegistrationDate')}
            />
          </div>

          {/* Marathon Start Date */}
          <div>
            <label className="block font-medium mb-2">Marathon Start Date</label>
            <DatePicker
              className="input input-bordered w-full"
              selected={marathonData.marathonStartDate}
              onChange={(date) => handleDateChange(date, 'marathonStartDate')}
            />
          </div>

          {/* Running Distance */}
          <div>
            <label htmlFor="runningDistance" className="block font-medium mb-2">
              Running Distance
            </label>
            <select
              id="runningDistance"
              name="runningDistance"
              className="select select-bordered w-full"
              value={marathonData.runningDistance}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Distance
              </option>
              <option value="25k">25k</option>
              <option value="10k">10k</option>
              <option value="3k">3k</option>
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea textarea-bordered w-full"
              rows="4"
              value={marathonData.description}
              onChange={handleChange}
            />
          </div>

          {/* Marathon Image */}
          <div className="sm:col-span-2">
            <label htmlFor="marathonImage" className="block font-medium mb-2">
              Marathon Image
            </label>
            <input
              type="url"
              id="marathonImage"
              name="marathonImage"
              className="file-input file-input-bordered w-full"
              value={marathonData.marathonImage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Create Marathon
          </button>
        </div>
      </form>
    </div>
  );
}
