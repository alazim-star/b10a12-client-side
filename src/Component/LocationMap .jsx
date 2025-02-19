import React from "react";
import { Map, Marker } from "pigeon-maps";
import SectionTitle from "../Shard/SectionTitle";

const LocationMap = () => {
  // Example university locations with coordinates and names
  const universityLocations = [
    { name: "University of Dhaka", location: [23.734007, 90.392857] },
    { name: "Harvard University", location: [42.377003, -71.116660] },
    { name: "University of Oxford", location: [51.754816, -1.254367] },
    { name: "National University of Singapore", location: [1.296643, 103.776393] },
    { name: "University of Melbourne", location: [-37.796367, 144.961417] },
  ];

  return (
    <div className="p-4 container mx-auto">
      <address className="text-center text-lg font-semibold mb-4">
      
       <SectionTitle subHeading=" Scholarship universities around the world" heading="University Locations"></SectionTitle>
      </address>
      <div className="w-full h-[450px]">
        <Map
          height={450}
          defaultCenter={[20.5937, 78.9629]} // Center of the map (India for example)
          defaultZoom={2} // Zoom level to cover multiple locations
        >
          {universityLocations.map((university, index) => (
            <Marker
              key={index}
              width={50}
              anchor={university.location}
              color="red" // Marker will appear in red
              onClick={() => alert(`This is ${university.name}`)}
            />
          ))}
        </Map>
      </div>

     
      
      
     
    </div>
  );
};

export default LocationMap;
