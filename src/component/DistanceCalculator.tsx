import React, { useState } from 'react';
import MapComponent from './MapComponent';

// Function to simulate address to coordinates conversion
const geocodeAddress = async (address: string): Promise<[number, number]> => {
  // Replace with your geocoding logic using an appropriate service/API
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } else {
    throw new Error('Address not found');
  }
};

const DistanceCalculator: React.FC = () => {
  const [pointA, setPointA] = useState<[number, number]>([51.505, -0.09]);
  const [pointB, setPointB] = useState<[number, number]>([51.515, -0.1]);
  const [addressA, setAddressA] = useState<string>('');
  const [addressB, setAddressB] = useState<string>('');

  const handleSelectA = async () => {
    try {
      const coordsA = await geocodeAddress(addressA);
      setPointA(coordsA);
    } catch (error) {
      console.error('Error during geocoding:', error);
      alert('Failed to get coordinates for Point A. Please try again.');
    }
  };

  const handleSelectB = async () => {
    try {
      const coordsB = await geocodeAddress(addressB);
      setPointB(coordsB);
    } catch (error) {
      console.error('Error during geocoding:', error);
      alert('Failed to get coordinates for Point B. Please try again.');
    }
  };

  const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const lat1 = coords1[0];
    const lon1 = coords1[1];
    const lat2 = coords2[0];
    const lon2 = coords2[1];
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const handleCalculate = () => {
    const distance = calculateDistance(pointA, pointB);
    alert(`Distance between Point A and Point B: ${distance.toFixed(2)} km`);
    // Optionally, update state or perform other actions with the distance
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex items-center justify-center h-16 bg-gray-200">
        <input
          type="text"
          className="px-4 py-2 mx-2 rounded-lg border"
          placeholder="Address for Point A"
          value={addressA}
          onChange={(e) => setAddressA(e.target.value)}
        />
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSelectA}
        >
          Set Point A
        </button>

        <input
          type="text"
          className="px-4 py-2 mx-2 rounded-lg border"
          placeholder="Address for Point B"
          value={addressB}
          onChange={(e) => setAddressB(e.target.value)}
        />
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSelectB}
        >
          Set Point B
        </button>

        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg"
          onClick={handleCalculate}
        >
          Calculate Distance
        </button>
      </div>
      <MapComponent key={`${pointA}-${pointB}`} pointA={pointA} pointB={pointB} />
    </div>
  );
};

export default DistanceCalculator;
