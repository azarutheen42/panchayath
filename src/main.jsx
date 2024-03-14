import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from "react-router-dom";
import CollectorReducer from "./features/CollectorSlice.jsx"
import DistrictReducer from "./features/DistrictSlice.jsx"
import PanchayathReducer from "./features/PanchayathSlice.jsx"
import WardReducer from "./features/WardSlice.jsx"
import StreetReducer from "./features/StreetSlice.jsx"
import CityReducer from "./features/CitiySlice.jsx"
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "./features/UserSlice.jsx"
import RequestTypeReducer from "./features/RequestType.jsx"
import ComplaintTypeReducer from "./features/ComplaintType.jsx"
import { Provider } from 'react-redux';
import App  from "./App.jsx"




const store = configureStore({
  reducer: {
      collector:CollectorReducer,
      district:DistrictReducer,
      panchayath:PanchayathReducer,
      ward:WardReducer,
      city:CityReducer,
      user:UserReducer,
      requesttype:RequestTypeReducer,
      complainttype:ComplaintTypeReducer,
      street:StreetReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(


  

    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>

    </BrowserRouter>


)
