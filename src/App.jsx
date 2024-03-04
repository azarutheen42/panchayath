import { useState, useEffect, useContext } from 'react'
import { React, Component } from 'react';
// import './App.css'
import Routers from "./route"
import axios from 'axios'
import Config from './Config'
import UserContext from './Context';
import { useDispatch } from "react-redux";
import { setCollector } from './features/CollectorSlice';
import { setDistrict } from './features/DistrictSlice';
import { setPanchayath } from './features/PanchayathSlice';
import { setWard } from './features/WardSlice';
import { setCity } from './features/CitiySlice';
import { setUser } from './features/UserSlice';

// css
import "./assets/css/app.min.css"
import "./assets/css/icons.min.css"
import "./assets/css/style.css"
import "./assets/css/custom.css"

import "./assets/plugins/fontawesome/css/all.min.css"
import "./assets/plugins/fontawesome/css/fontawesome.min.css"
import "./assets/css/dataTables.bootstrap4.min.css"
import "./assets/css/animate.css"
import "./assets/css/responsive.css"
// import "./assets/css/bootstrap.min.css"  #responsive issue


// const UserContext = createContext()


function App() {

  const [user, setUser] = useState();
  const dispatch = useDispatch()

  useEffect(() => {

    if (Config?.userState) {
      getUser()
    }
    getCollectorRoles()
    getDistricts()
    getWards()
    getCities()
    getPanchayaths()

  }, [])



  const getUser = () => {

    axios.get(`${Config.BASE_URL}auth/users/me`,
      Config?.config
    )
      .then(function (response) {

        if (response.status === 200) {
          setUser(response?.data)
          // dispatch(setUser(response.data));

        }

      })
      .catch(function (error) {
        if (error?.response?.status === 401) {
          console.log(error);
          Config.logout()

        }
      });

  }



  const getCollectorRoles = () => {
    axios.get(`${Config.BASE_URL}contract-employee-type`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {

          dispatch(setCollector(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }


  const getPanchayaths = () => {
    axios.get(`${Config.BASE_URL}get-panchayath`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {

          dispatch(setPanchayath(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }


console.log(Config.config)
  const getDistricts = () => {
    axios.get(`${Config.BASE_URL}districts`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          dispatch(setDistrict(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }



  const getCities = () => {
    axios.get(`${Config.BASE_URL}get-cities`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {

          dispatch(setCity(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }



  const getWards = () => {


    axios.get(`${Config.BASE_URL}get-ward`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          dispatch(setWard(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }


  // console.log(user)

  return (
    <>
      <UserContext.Provider value={user}>

        <Routers />
      </UserContext.Provider>

    </>
  )
}


export default App
