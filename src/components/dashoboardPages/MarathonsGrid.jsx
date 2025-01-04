import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarathonCard from './MarathonCard';
import { FaSort } from 'react-icons/fa'; // Font Awesome sorting icon

export default function MarathonsGrid() {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('new-to-old'); // Default sorting order

  const fetchMarathons = (sort = 'new-to-old') => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/users?sort=${sort}`)
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
    fetchMarathons(sortOrder); // Fetch data initially
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sort order
    fetchMarathons(event.target.value); // Fetch data with new sort order
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Marathon Events</h2>
        <div className="flex items-center space-x-3">
          <FaSort className="text-blue-500 text-xl" /> {/* Sorting icon */}
          <label className="text-gray-700 font-medium" htmlFor="sortOptions">
            Sort By:
          </label>
          <select
            id="sortOptions"
            className="border rounded px-4 py-2 bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="new-to-old">New to Old</option>
            <option value="old-to-new">Old to New</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <MarathonCard key={marathon._id} marathon={marathon} />
        ))}
      </div>
    </div>
  );
}
