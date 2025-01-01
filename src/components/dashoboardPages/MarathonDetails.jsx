import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MarathonDetails() {
  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch marathon details by ID
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setMarathon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching marathon details:', error);
        setLoading(false);
      });
  }, [id]);

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

  if (!marathon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Marathon not found.</p>
      </div>
    );
  }

  const {
    title,
    startRegistrationDate,
    endRegistrationDate,
    marathonStartDate,
    location,
    runningDistance,
    description,
    marathonImage,
    createdAt,
    count,
  } = marathon;

  const isRegistrationOpen =
    new Date(startRegistrationDate) <= new Date() && new Date() <= new Date(endRegistrationDate);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <img
          src={marathonImage}
          alt={title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Running Distance:</strong> {runningDistance}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Registration Dates:</strong> {new Date(startRegistrationDate).toLocaleDateString()} -{' '}
        {new Date(endRegistrationDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Marathon Start Date:</strong> {new Date(marathonStartDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Registrations Count:</strong> {count}
      </p>
      <p className="text-gray-400 text-sm mb-6">
        <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
      </p>

      <button
        disabled={!isRegistrationOpen}
        className={`btn w-full ${
          isRegistrationOpen ? 'btn-primary' : 'btn-disabled'
        }`}
      >
        {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
      </button>
    </div>
  );
}
