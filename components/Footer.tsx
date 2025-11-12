import React from 'react';
import { Link } from 'react-router-dom';
import PhoneIcon from './icons/PhoneIcon';
import SocialIcons from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-light mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">Basha Bed Mart</h3>
            <p className="text-gray-200">Your one-stop shop for quality bedding, specializing in natural silk cotton.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-200">No.44, Villianur Main Road, Moolakulam, Puducherry-10</p>
            <a href="tel:9942223545" className="flex items-center justify-center md:justify-start space-x-2 text-gray-200 hover:text-primary mt-2">
              <PhoneIcon className="w-5 h-5" />
              <span>994 222 35 45</span>
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <SocialIcons className="justify-center md:justify-start" />
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Basha Bed Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;