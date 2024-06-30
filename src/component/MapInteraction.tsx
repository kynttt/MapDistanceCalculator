import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-geosearch/dist/geosearch.css';

interface MapInteractionProps {
  pointA: [number, number];
  pointB: [number, number];
  updateDistance: (distance: number) => void;
}

const MapInteraction: React.FC<MapInteractionProps> = ({ pointA, pointB, updateDistance }) => {
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
    updateDistance(dist);

    return () => {
      map.remove();
    };
  }, [pointA, pointB, updateDistance]);

  return null;
};

export default MapInteraction;
