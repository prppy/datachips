import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet.heat'; // Import Heatmap plugin CSS
import data from './data.csv'; // Import your CSV data

const Heatmap = () => {
    const mapRef = useRef(null);
    
    useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current).setView([34.09, -118.32], 13); // Set initial view here

    // Add a tile layer (you can use other tile providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Parse your CSV data and create an array of latlng points
    const latlngs = data.map(point => {
        return [parseFloat(point.LAT), parseFloat(point.LON)];
    });

    // Create the heatmap layer
    L.heatLayer(latlngs).addTo(map);
  }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default HeatMap;