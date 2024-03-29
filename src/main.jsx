import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from "react-router-dom";
import CollectorReducer from "./features/CollectorSlice.jsx"
import DistrictReducer from "./features/DistrictSlice.jsx"
import PanchayathReducer from "./features/PanchayathSlice.jsx"
import WardReducer from "./features/WardSlice.jsx"
import CityReducer from "./features/CitiySlice.jsx"
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';




const store = configureStore({
  reducer: {
      collector:CollectorReducer,
      district:DistrictReducer,
      panchayath:PanchayathReducer,
      ward:WardReducer,
      city:CityReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(


  

    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>

    </BrowserRouter>


)
