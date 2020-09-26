import React, { useState, useEffect } from 'react';
import './App.css';
import Map from '../src/Components/Map/Map'
import axios from 'axios'

function App() {

  const [ISSCoordinates, setCoordinates] = useState({})


  const getISSLocation = async () => {
    try {
      // const responseOld = await axios.get('http://api.open-notify.org/iss-now.json')
      // console.log('ISS coordinates OLD: ', responseOld.data.iss_position)
      const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
      const issInfo = { 
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        visibility: response.data.visibility,
        altitude: response.data.altitude,
        velocity: response.data.velocity
      }
      
      // console.log('ISS Coordinates: ', response.data)
      // console.log('ISS Info object', issInfo)

      setCoordinates(issInfo)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const timer = setInterval(() => {
      getISSLocation()
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className='app'>


      <div>
        The current coordinates of the ISS are:
          {Object.keys(ISSCoordinates).length ?
          <div>
            <h4>
              Latitude: {ISSCoordinates.latitude}
            </h4>
            <h4>
              Longitude: {ISSCoordinates.longitude}
            </h4>
          </div>
          : null
        }
      </div>

      <div className='map'>
        <Map coordinates={ISSCoordinates} />
      </div>

    </div>
  );
}

export default App;
