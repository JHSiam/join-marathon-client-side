import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUsers, FaTrophy } from "react-icons/fa";

const reasons = [
  {
    icon: <FaHeartbeat className="text-4xl text-red-500" />,
    title: "Boost Your Health",
    description: "Participate to stay fit and healthy while enjoying the thrill.",
  },
  {
    icon: <FaUsers className="text-4xl text-blue-500" />,
    title: "Meet a Community",
    description: "Connect with like-minded runners and build lifelong friendships.",
  },
  {
    icon: <FaTrophy className="text-4xl text-yellow-500" />,
    title: "Achieve Your Goals",
    description: "Challenge yourself and cross the finish line with pride.",
  },
];

const WhyJoinMarathons = () => {
  return (
    <div className="bg-gray-100 py-16" id="about">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-600">
        Why Join a Marathon?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-10 lg:px-20">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            {reason.icon}
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              {reason.title}
            </h3>
            <p className="text-gray-600 text-center mt-2">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyJoinMarathons;
