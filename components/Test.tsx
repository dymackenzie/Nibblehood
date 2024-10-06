import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const Test = () => {
  // Define the center of the map and circle
  const center = [51.505, -0.09]; // Coordinates (Latitude, Longitude)
  const radius = 100; // Radius in meters  


  return (
    
    <MapContainer center={center} zoom={25} scrollWheelZoom={false} style={{width: '300px', height: '300px'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
  </MapContainer>
    
  
   
  );
};

export default Test;

/*
<Circle center={center} radius={radius} color="blue" fillColor="blue" fillOpacity={0.2}>
        <Popup>
          This is the highlighted area.
        </Popup>
      </Circle>
*/    
