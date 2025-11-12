import React from 'react';
import PhoneIcon from '../../components/icons/PhoneIcon';
import SocialIcons from '../../components/icons/SocialIcons';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-xl text-gray-700">We'd love to hear from you. Here's how you can reach us.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md animate-slide-in-left">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4 text-gray-800">
              <div className="flex items-start space-x-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>No.44, Villianur Main Road, Moolakulam, Puducherry-10</span>
              </div>
               <div className="flex items-center space-x-4">
                <a href="tel:9942223545" className="flex items-center space-x-4 group">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                    <span className="group-hover:text-primary">994 222 35 45</span>
                </a>
               </div>
               <div className="flex items-center space-x-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:bashabedmart@gmail.com" className="hover:text-primary">bashabedmart@gmail.com</a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
                 <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                 <SocialIcons />
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg shadow-md animate-slide-in-right">
             <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
             <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" name="name" id="name" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary" placeholder="Your Email" />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea name="message" id="message" rows={5} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary" placeholder="Your Message"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition duration-300">Submit</button>
                </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;