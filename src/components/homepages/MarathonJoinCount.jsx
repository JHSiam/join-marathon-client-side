import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaRunning } from "react-icons/fa";

const MarathonJoinCount = () => {
  const totalParticipants = 4500; // Example count

  return (
    <div className="bg-blue-600 text-white py-16">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Join the Excitement!
        </h2>
        <p className="text-lg mb-6">
          Be part of a growing community of marathon enthusiasts.
        </p>
        <div className="flex justify-center items-center gap-4">
          <FaRunning className="text-6xl text-yellow-300 animate-pulse" />
          <CountUp
            end={totalParticipants}
            duration={3}
            separator=","
            className="text-6xl font-extrabold"
          />
        </div>
        <p className="text-lg mt-4">Total Participants</p>
      </motion.div>
    </div>
  );
};

export default MarathonJoinCount;
