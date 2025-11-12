import React from 'react';

const LocationPage: React.FC = () => {
  const shopLocation = "No.44, Villianur Main Road, Moolakulam, Puducherry - 605010";
  const mapQuery = encodeURIComponent(shopLocation);
  const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Find Our Store</h1>
        <p className="mt-4 text-xl text-gray-700">We are located at the heart of the city, ready to serve you.</p>
      </div>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full h-96">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Basha Bed Mart Location"
          ></iframe>
        </div>
        <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold">{shopLocation.split(',')[0]}</h2>
            <p className="text-gray-700 mt-2">{shopLocation.substring(shopLocation.indexOf(',') + 2)}</p>
            <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-secondary hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
            >
                Get Directions
            </a>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;