import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function MarathonCard({ marathon }) {
    const navigate = useNavigate();
  return (
    <div className="card bg-white shadow-lg rounded-lg p-4">
      {/* Marathon Image */}
      <img
        src={marathon.marathonImage}
        alt={marathon.title}
        className="rounded-t-lg object-cover h-40 w-full"
      />
      <div className="card-body">
        {/* Title */}
        <h3 className="card-title text-lg font-bold">{marathon.title}</h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <MdLocationOn className="mr-2 text-blue-500" />
          <span>{marathon.location}</span>
        </div>

        {/* Registration Dates */}
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <FaCalendarAlt className="mr-2 text-green-500" />
          <span>
            {marathon.startRegistrationDate} - {marathon.endRegistrationDate}
          </span>
        </div>

        {/* See Details Button */}
        <div className="mt-4">
          <button className="btn btn-primary w-full" onClick={()=>navigate(`/details/${marathon._id}`)}>
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}
