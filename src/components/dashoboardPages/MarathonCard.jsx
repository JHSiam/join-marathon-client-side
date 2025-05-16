import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MarathonCard({ marathon }) {
  const navigate = useNavigate();

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card bg-base-300 shadow-lg rounded-lg overflow-hidden">
      {/* Marathon Image */}
      <img
        src={marathon.marathonImage}
        alt={marathon.title}
        className="object-cover h-40 w-full transition-transform duration-300 transform hover:scale-105"
      />
      <div className="card-body p-4">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">{marathon.title}</h3>

        {/* Location */}
        <div className="flex items-center text-sm  mt-2">
          <MdLocationOn className="mr-2" />
          <span>{marathon.location}</span>
        </div>

        {/* Registration Dates */}
        <div className="flex items-center text-sm  mt-2">
          <FaCalendarAlt className="mr-2 " />
          <span>{formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}</span>
        </div>

        {/* See Details Button */}
        <div className="mt-4">
          <button
            className="btn btn-light w-full py-2 px-4 rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate(`/details/${marathon._id}`)}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}
