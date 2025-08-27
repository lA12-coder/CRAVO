import React, { useState } from 'react'

const WorkAreaCoverage = () => {
    const [ActiveCity, setActiveCity] = useState(1)
    const [plannedCity, setPllannedCity]= useState(5)
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">{ActiveCity}</div>
          <div className="text-sm text-gray-600">Active City</div>
        </div>
        <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{ plannedCity}+</div>
          <div className="text-sm text-gray-600">Planned Cities</div>
        </div>
      </div>
    </div>
  );
}

export default WorkAreaCoverage
