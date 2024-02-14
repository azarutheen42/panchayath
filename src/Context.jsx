import { useState, useEffect, useContext } from 'react'
import { React, Component} from 'react';
// import './App.css'
import Routers from "./route"
import axios from 'axios'
import Config from './Config'
import { createContext } from 'react'

const UserContext = createContext()


export default UserContext;
