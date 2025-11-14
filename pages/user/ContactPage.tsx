import React, { useState } from 'react';
import PhoneIcon from '../../components/icons/PhoneIcon';
import SocialIcons from '../../components/icons/SocialIcons';
import useSEO from '../../hooks/useSEO';

const ContactPage: React.FC = () => {
  useSEO({
    title: "Contact Us | Basha Bed Mart",
    description: "Get in touch with Basha Bed Mart. Find our address, phone number, and send us a message. We're located in Moolakulam, Puducherry.",
    keywords: "contact Basha Bed Mart, Puducherry store, bed mart phone number, location"
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    const mailtoLink = `mailto:bashabedmart@gmail.com?subject=Message from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    alert('Thank you for your message! Please complete sending the email in your mail client.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Card: Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-xl animate-slide-in-left border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-6 text-gray-700">
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
                 <h3 className="text-lg font-medium mb-4 text-gray-800">Follow Us</h3>
                 <SocialIcons />
            </div>
          </div>

          {/* Right Card: Form */}
          <div className="bg-white p-8 rounded-lg shadow-xl animate-slide-in-right border border-gray-100">
             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="sr-only">your name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-800" 
                      placeholder="your name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">your email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-800" 
                      placeholder="your email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">your message</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      rows={5} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-800" 
                      placeholder="your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                </div>
                <div>
                    <button 
                      type="submit" 
                      className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Submit
                    </button>
                </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
