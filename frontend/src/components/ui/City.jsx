import React from "react";
import { CityList } from "../../Data/CityData";

const City = () => {
  return (
    <div className="space-y-4">
      {CityList.map((city, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
            <div>
              <h4 className="font-semibold text-gray-900">{city.cityName}</h4>
              <p className="text-sm text-gray-600">{city.cityLocation}</p>
            </div>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Active
          </span>
        </div>
      ))}

      {/* Placeholder for future cities */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-60">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full mr-4"></div>
          <div>
            <h4 className="font-medium text-gray-500">
              More cities coming soon...
            </h4>
            <p className="text-sm text-gray-400">Expanding our reach</p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default City;
