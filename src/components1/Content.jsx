import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';




import OverView from "./OverView"

import Header from "./Header"
import { useEffect, useState } from "react"
// import Config from "../auth/login"
import Garbage from "./Garbage"
import Complaint from "./Complaint"
import Employee from "./Emp"
import Attendance from "./Attendence"
import Collectors from "./Collector"
import UserRegister from "./Register"
import Requests from "./Requests"
import Reports from "./Reports"
import Settings from "./Settings"
import Masters from "./Master"
import Qrhandler from "./QR"
import { useLocation } from "react-router-dom"
import Events from "./Events"
import { useContext, createContext } from 'react';
import Config from "../Config"
import UserContext from "../Context"
import CustomTable from "./Table"
import Activity from './Activities';
import MyTable from './Lazy LoadingTable';

import Copyright from './copywright';







export default function Content() {




    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',

                    // backgroundColor: "white"s
                }}
            >
                <Toolbar />


                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                    <Paper
                        sx={{ p: 2, flexDirection: 'column' }}
                    >
                          <Grid container spacing={2} >

                        <GridContent />

                        </Grid>

                    </Paper>

                    {/* <Copyright sx={{ pt: 4 }} /> */}
                </Container>
            </Box>


        </>
    )
}


















function GridContent(props) {

    const userName = useContext(UserContext);



    const [path, setpath] = useState();

    const [view, setView] = useState();

    const { state } = useLocation()
    const search = useLocation().search;
    const url = window.location.search


    useEffect(() => {
        // console.log("triggered",url)
        if (url) {
            const main = new URLSearchParams(search).get("m");
            const sub = new URLSearchParams(search).get("s");
            // console.log(main, "URLS", sub);
            setView(main)
            setpath(sub)
        }
        else {
            setView("dashboard")
        }

    }, [url])


    switch (view) {
        case "employee":
            return <Employee
                path={path}
            />
        // return <CustomTable
        // path={path}
        // />
        case "attendance":
            return <Attendance />
        case "collector":
            return <Collectors
                path={path}
            />
        case "user-register":
            return <UserRegister />
        case "complaint":
            return <Complaint
                path={path}
            />

        case "activity":
            // return <Events
            //     path={path}
            // />

            return <Activity
                path={path}
            />

        case "request":
            return <Requests
                path={path}
            />
        case "reports":
            return <Reports
                path={path}
            />
        case "settings":
            return <Settings
                path={path}
            />
        case "masters":
            return <Masters
                path={path}
            />
        case "qr":
            return <Qrhandler
                path={path}
            />
        case "dashboard":
            return <OverView />
        default:
            return <OverView />

    }



}