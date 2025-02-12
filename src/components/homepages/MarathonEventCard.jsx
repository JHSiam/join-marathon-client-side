import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaRunning, FaUsers } from "react-icons/fa";

const MarathonEventCard = () => {
  // Unique data array for marathon events
  const events = [
    {
      id: 1,
      title: "City Marathon Challenge",
      marathonStartDate: "2025-01-10",
      location: "New York",
      runningDistance: "10k",
      description: "A scenic run through the heart of New York City.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 250,
    },
    {
      id: 2,
      title: "Beachside Fun Run",
      marathonStartDate: "2025-01-15",
      location: "Miami",
      runningDistance: "5k",
      description: "A refreshing run along Miami’s stunning coastline.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 180,
    },
    {
      id: 3,
      title: "Mountain Trail Marathon",
      marathonStartDate: "2025-01-20",
      location: "Denver",
      runningDistance: "15k",
      description: "Test your limits with a challenging mountain trail run.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 320,
    },
    {
      id: 4,
      title: "Sunset Sprint",
      marathonStartDate: "2025-01-25",
      location: "San Francisco",
      runningDistance: "8k",
      description: "Run under the beautiful sunset in San Francisco.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 200,
    },
    {
      id: 5,
      title: "Forest Adventure Run",
      marathonStartDate: "2025-01-30",
      location: "Seattle",
      runningDistance: "12k",
      description: "Experience the tranquility of Seattle’s lush forests.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 280,
    },
    {
      id: 6,
      title: "Desert Dash",
      marathonStartDate: "2025-02-05",
      location: "Phoenix",
      runningDistance: "20k",
      description: "A thrilling desert run in the heart of Phoenix.",
      marathonImage:
        "https://media.gettyimages.com/id/184839421/photo/group-of-runners-in-a-cross-country-race.jpg?s=612x612&w=gi&k=20&c=w0Ube1OKIrIVeEPwbV5RjIwjdPtMIAlKjjHfi4kr0Hc=",
      count: 300,
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Upcoming Marathon Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10 lg:px-20">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={event.marathonImage}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
              <div className="mt-4 space-y-2">
                <p className="flex items-center text-gray-700">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  <strong>Start Date:</strong> {new Date(event.marathonStartDate).toLocaleDateString()}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaRunning className="mr-2 text-blue-500" />
                  <strong>Distance:</strong> {event.runningDistance}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaUsers className="mr-2 text-blue-500" />
                  <strong>Registered:</strong> {event.count} people
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarathonEventCard;
