import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../src/Components/Map/Map";
import axios from "axios";

function App() {

  const [ISSCoordinates, setCoordinates] = useState({})
  const [userCoordinates, setUserCoordinates] = useState({})


  //******************    *******************//
  const getISSLocation = async () => {
    try {
      const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544')
      const issInfo = {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        visibility: response.data.visibility,
        altitude: response.data.altitude,
        velocity: response.data.velocity
      }

      setCoordinates(issInfo);
    } catch (error) {
      console.log(error);
    }
  };


  //******************  PULL USER COORDINATES BASED ON GEOLOCATION API  *******************//
  const retrieveUserLocation = () => {
    const successCallback = (position) => {
      const userCoordinates = {
        userLatitude: position.coords.latitude,
        userLongitude: position.coords.longitude
      }
      setUserCoordinates(userCoordinates)
    }

    const errorCallback = (error) => {
      console.error(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true
    })
  }


  //******************  PULL USER LOCATION BASED ON   *******************//
  const getUserDetailedInformation = async (longitude, latitude) => {
    try {
      const response = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`)
      const userDetailedInfo = response.data;
      console.log('PassTimesInfo: ', userDetailedInfo)

    } catch (error) {
      console.log(error)
    }
  }
  retrieveUserLocation()
 

  useEffect(() => {
    const timer = setInterval(() => {
      getISSLocation();
      getUserDetailedInformation(userCoordinates.userLongitude, userCoordinates.userLatitude)
    }, 4000);
    return () => clearInterval(timer);
  }, [userCoordinates.userLongitude, userCoordinates.userLatitude]);


  return (
    <div className="app">

      <div>
        The current coordinates of the ISS are:
        {Object.keys(ISSCoordinates).length ? (
          <div>
            <h4>Latitude: {ISSCoordinates.latitude}</h4>
            <h4>Longitude: {ISSCoordinates.longitude}</h4>
          </div>
        ) : null}
      </div>

      <div className='map'>
        <Map coordinates={ISSCoordinates} userCoordinates={userCoordinates}/>
      </div>
      
    </div>
  );
}

export default App;
