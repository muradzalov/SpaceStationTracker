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

  const { coordinates, userCoordinates, ISSMapLine } = props;

  const numericalLongitude = Number(coordinates.longitude);
  const numericalLatitude = Number(coordinates.latitude);

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
            // coordinates={[[-180, 0], [0, 0]]}
            coordinates={ISSMapLine.slice(2)}
            stroke="#023302"
            strokeWidth={2}
          />

          {Object.keys(coordinates).length > 0 &&
            <Annotation
              subject={[numericalLongitude, numericalLatitude]}
              dx={0}
              dy={-30}
              connectorProps={{
                stroke: "#FF5533",
                strokeWidth: 2,
                strokeLinecap: "round"
              }}
            >
              <text textAnchor="middle" alignmentBaseline="middle" fill="#F53">
                {"International Space Station"}
              </text>
            </Annotation>
          }

          {Object.keys(userCoordinates).length > 0 &&
            <Annotation
              subject={[userCoordinates.userLongitude, userCoordinates.userLatitude]}
              dx={0}
              dy={-30}
              connectorProps={{
                stroke: "#080361",
                strokeWidth: 2,
                strokeLinecap: "round"
              }}>
              <text textAnchor="middle" alignmentBaseline="middle" fill="#3235f0">
                {"User"}
              </text>
            </Annotation>
          }

          {/* Longitude, Latitude */}
          {/* <Marker coordinates={[-74.006, 40.7128]}> */}



          {Object.keys(coordinates).length > 0 &&
            <Marker coordinates={[numericalLongitude, numericalLatitude]}>
              <circle r={8} fill="#F53" />
            </Marker>
          }

          {Object.keys(userCoordinates).length > 0 &&
            <Marker coordinates={[userCoordinates.userLongitude, userCoordinates.userLatitude]}>
              <circle r={8} fill="#1527cf" />
            </Marker>
          }

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
