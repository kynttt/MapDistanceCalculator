import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-geosearch/dist/geosearch.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Search from 'react-leaflet-search';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapInteractionProps {
  pointA: [number, number];
  pointB: [number, number];
  setDistance: (distance: number) => void;
}

const MapInteraction: React.FC<MapInteractionProps> = ({ pointA, pointB, setDistance }) => {
  useEffect(() => {
    const map = L.map('map').setView(pointA, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
      const toRad = (x: number) => (x * Math.PI) / 180;
      const lat1 = coords1[0];
      const lon1 = coords1[1];
      const lat2 = coords2[0];
      const lon2 = coords2[1];
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    L.marker(pointA).addTo(map).bindPopup('Point A');
    L.marker(pointB).addTo(map).bindPopup('Point B');
    const dist = calculateDistance(pointA, pointB);
    setDistance(dist);

    return () => {
      map.remove();
    };
  }, [pointA, pointB, setDistance]);

  return null;
};

interface MapComponentProps {
  pointA: [number, number];
  pointB: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ pointA, pointB }) => {
  const [distance, setDistance] = useState<number | null>(null);

  return (
    <div className="w-full h-screen">
      <div id="map" className="w-full h-full">
        <MapInteraction pointA={pointA} pointB={pointB} setDistance={setDistance} />
      </div>
      {distance !== null && (
        <div className="flex items-center justify-center h-16 bg-gray-200">
          Distance: {distance.toFixed(2)} km
        </div>
      )}
    </div>
  );
};

export default MapComponent;
