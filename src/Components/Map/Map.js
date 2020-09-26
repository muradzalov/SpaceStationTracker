import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = props => {
    
  const {coordinates} = props;

  console.log('ISS information: ', coordinates)

  const numericalLongitude = Number(coordinates.longitude)
  const numericalLatitude = Number(coordinates.latitude)

  return (
    <div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
          }
        </Geographies>

        {/* Longitude, Latitude */}
        {/* <Marker coordinates={[-74.006, 40.7128]}> */}
        <Marker coordinates={[numericalLongitude, numericalLatitude]}>
          <circle r={8} fill="#F53" />
        </Marker>
      </ComposableMap>
    </div>
  )
};

export default Map;
