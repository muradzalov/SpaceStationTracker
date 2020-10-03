import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../src/Components/Map/Map";
import axios from "axios";

function App() {

  const [ISSCoordinates, setCoordinates] = useState({})
  const [userCoordinates, setUserCoordinates] = useState({})


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

      setCoordinates(issInfo);
    } catch (error) {
      console.log(error);
    }
  };


  // const getPassTimes = async () => {
  //   try {
  //     const response = await axios.get('https://api.open-notify.org/iss-pass.json?lat=40.7128&lon=-74.006')
  //     const passTimesInfo = response.data;

  //     console.log('PassTimesInfo: ', passTimesInfo)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const getUserLocation = async () => {
  //   try {
  //     const response = await axios.get("https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91")
  //     const data = await response.json()
  //     console.log('USER LOCATION: ', data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // getUserLocation();

  // const getUserLocation = () => {
  //     navigator.geolocation.getCurrentPosition(console.log, console.log)
  //     console.log('USER LOCATION: ', position.coords);
  // }

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




  const getUserDetailedInformation = async (longitude, latitude) => {
    try {
      // const response = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${latitude}`,`${longitude}`)
      const response = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${userCoordinates.userLatitude},${userCoordinates.userLongitude}`)

      const userDetailedInfo = response.data;

      console.log('PassTimesInfo: ', userDetailedInfo)

    } catch (error) {
      console.log(error)
    }
  }

  retrieveUserLocation()
  // getUserDetailedInformation(userCoordinates.userLongitude, userCoordinates.userLatitude)
  // console.log('USER LOCATION: ', userCoordinates)


  useEffect(() => {
    const timer = setInterval(() => {
      getISSLocation();
      // getUserDetailedInformation(userCoordinates.userLongitude, userCoordinates.userLatitude)
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
