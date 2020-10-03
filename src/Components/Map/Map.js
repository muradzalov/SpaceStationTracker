import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  ZoomableGroup,
  Line,
  Annotation,
  Sphere
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = props => {

  const { coordinates, userCoordinates } = props;

  const numericalLongitude = Number(coordinates.longitude);
  const numericalLatitude = Number(coordinates.latitude);

  // console.log('userCoordinates from props', userCoordinates)

  return (
    <div>
      <ComposableMap projectionConfig={{ scale: 140 }}>
        <ZoomableGroup zoom={1}>

          <Sphere stroke="#FF5533" strokeWidth={2} />
          <Graticule stroke="#cfe3dd" />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>




          <Line
            from={[2.3522, 48.8566]}
            to={[-74.006, 40.7128]}
            stroke="#FF5533"
            strokeWidth={4}
            strokeLinecap="round"
          />


          <Annotation
            subject={[2.3522, 48.8566]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#FF5533",
              strokeWidth: 3,
              strokeLinecap: "round"
            }}
          >
            <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              {"Paris"}
            </text>
          </Annotation>

          {/* Longitude, Latitude */}
          {/* <Marker coordinates={[-74.006, 40.7128]}> */}
          <Marker coordinates={[numericalLongitude, numericalLatitude]}>
            <circle r={8} fill="#F53" />
          </Marker>
          <Marker coordinates={[userCoordinates.userLongitude, userCoordinates.userLatitude]}>
            <circle r={8} fill="#1527cf" />
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
