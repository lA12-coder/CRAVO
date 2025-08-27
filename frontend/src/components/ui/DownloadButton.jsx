import React from "react";

export const PlayStoreButton = ({ className = "" }) => {
  const playStoreUrl = "#"; // Replace with your actual Google Play Store URL

  return (
    <a
      href={playStoreUrl}
      className={`inline-flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 ${className}`}
    >
      {/* Google Play Icon */}
      <div className="mr-3">
              <img
                  className="w-8 h-8"
          src="https://cdn-icons-png.flaticon.com/512/300/300218.png"
          alt=""
        />
      </div>

      {/* Text Content */}
      <div className="text-left">
        <div className="text-xs text-gray-500 leading-tight">GET IT ON</div>
        <div className="text-sm font-semibold text-gray-900 leading-tight">
          Google Play
        </div>
      </div>
    </a>
  );
};

export const AppStore = ({ className = "" }) => {
  const iOSUrl = "#"; // Replace with your app's App Store URL

  return (
    <a
      href={iOSUrl}
      className={`inline-flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 ${className}`}
    >
      {/* App Store Icon */}
      <div className="mr-3">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="text-left">
        <div className="text-xs text-gray-500 leading-tight">
          Download on the
        </div>
        <div className="text-sm font-semibold text-gray-900 leading-tight">
          App Store
        </div>
      </div>
    </a>
  );
};
