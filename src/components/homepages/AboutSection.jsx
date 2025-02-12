import { FaRunning } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="bg-blue-100 py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-600 text-white shadow-xl rounded-2xl p-8">
          <div className="flex flex-col items-center space-y-4">
            <FaRunning className="text-6xl text-white" />
            <h2 className="text-3xl font-bold">About Our Marathon</h2>
            <p className="text-lg">
              Welcome to our annual marathon competition! We bring together 
              runners from all over to compete, challenge themselves, and 
              celebrate the spirit of endurance and sportsmanship. Join us 
              for an unforgettable experience filled with excitement and passion!
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
