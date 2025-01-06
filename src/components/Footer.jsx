import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Website Info */}
          <div>
            <h2 className="text-2xl font-bold">Join Marathon</h2>
            <p className="mt-4 text-sm">
              Join Marathon is your ultimate platform to explore and register for exciting marathon events worldwide. Get ready, stay fit, and achieve your goals!
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold">Useful Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="hover:underline">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright and Social Links */}
          <div>
            <h3 className="text-xl font-bold">Stay Connected</h3>
            <p className="mt-4 text-sm">Follow us on social media for updates and tips!</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
            <p className="mt-6 text-sm">&copy; {new Date().getFullYear()} Join Marathon. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
