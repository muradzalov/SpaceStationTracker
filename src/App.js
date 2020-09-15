import React, { useState, useEffect } from 'react';
import './App.css';
import Map from '../src/Components/Map/Map'
import axios from 'axios'

function App() {

  useEffect(() => {
    const timer = setInterval(() => {
      getISSLocation()
      // console.log('This will run after 3 second!')
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const [ISSCoordinates, setCoordinates] = useState({})

  const getISSLocation = async () => {
    try {
      const response = await axios.get('http://api.open-notify.org/iss-now.json')
      // console.log('ISS coordinates: ', response.data.iss_position)
      setCoordinates(response.data.iss_position)
    }
    catch (error) {
      console.log(error)
    }
  }

  // console.log('ISS coordinates in state: ', ISSCoordinates)

  // useEffect(() => { getISSLocation() }, [])

  return (
    <div>
      The current coordinates of the ISS are:

      <div>
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
        <Map coordinates={ISSCoordinates}/>
      </div>

    </div>
  );
}

export default App;
