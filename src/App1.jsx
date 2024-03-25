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
import { setStreet } from './features/StreetSlice.jsx';
import { setCity } from './features/CitiySlice';
import { setUser } from './features/UserSlice';
import {setRequest} from "./features/RequestType.jsx"
import {setComplaint} from "./features/ComplaintType.jsx"


import "./assets/css/style.css"
import "./assets/css/custom.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// import "./assets/js/feather.min.js"




// const UserContext = createContext()


function App() {

  const [user, setUser] = useState();
  const dispatch = useDispatch()

  useEffect(() => {

    if (Config?.userState) {
      getUser()
    }
    getCollectorRoles();
    getDistricts();
    getWards();
    getCities();
    getPanchayaths();
    getRequestType();
    getCompalintType();
    getStreet();

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



  const  getWards = () => {
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



  const  getStreet = () => {
    axios.get(`${Config.BASE_URL}get-streets`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          dispatch(setStreet(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }




// get request type
  const getRequestType = () => {
    axios.get(`${Config.BASE_URL}get-request-type`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          dispatch(setRequest(response.data));

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }


  // get request type
  const getCompalintType = () => {
    axios.get(`${Config.BASE_URL}complainttype`,
      Config?.config
    )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          dispatch(setComplaint(response.data));

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
