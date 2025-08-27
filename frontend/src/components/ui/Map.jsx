import React from 'react'

const Map = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Interactive Map
        </h3>
        <p className="text-gray-600">
          Explore our current location in Adama, Ethiopia
        </p>
      </div>
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126258.81091600592!2d39.2203933307962!3d8.53933242339027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1f65036ecb0f%3A0x6babded8f5e67ef6!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1755728422640!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="Adama, Ethiopia Location"
        ></iframe>

        {/* Map Overlay Info */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">
              Adama, Ethiopia
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map
