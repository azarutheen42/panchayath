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
import { Paper } from '@mui/material';




import OverView from "./OverView"
import SideBar from "./SideBar"
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
import Masters from "./Masters"
import Qrhandler from "./QR"
import { useLocation } from "react-router-dom"
import Events from "./Events"
import { useContext, createContext } from 'react';
import Config from "../Config"
import UserContext from "../Context"
import CustomTable from "./Table"


import Copyright from './copywright';







// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (


        <>





            <ThemeProvider theme={defaultTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />



                    <Header
                        open={open}
                        setOpen={setOpen}
                        toggleDrawer={toggleDrawer}
                        drawerWidth={drawerWidth}
                    />

                    <SideBar
                        open={open}
                        setOpen={setOpen}
                        toggleDrawer={toggleDrawer}
                        drawerWidth={drawerWidth}
                    />




                    <Box
                        sx={{ width: '100%', overflow: 'hidden' }}
                    // component="main"
                    // style={{backgroundColor:"grey"}}
                    // sx={{
                    //     backgroundColor: (theme) =>
                    //         theme.palette.mode === 'light'
                    //             ? theme.palette.grey[100]
                    //             : theme.palette.grey[900],
                    //     flexGrow: 1,
                    //     height: '100vh',
                    //     overflow: 'auto',
                    // }}
                    >


                        <Toolbar />

                        <div style={{ margin: 10,padding:20}} className='container   bg-white'>

                                <Content

                                />
                        </div>







                        {/* <Container
                            //  maxWidth="lg"
                            sx={{ mt: 4, mb: 4 }}



                        >

                            <Grid container spacing={3}>

                                <Grid item xs={12} md={12} lg={12}>

                                    <Content

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                    </Paper>
                                </Grid>

                            </Grid>



                        </Container> */}


                    </Box>


                    {/* <Copyright sx={{ pt: 4 }} /> */}


                </Box>
            </ThemeProvider>

        </>
    );
}





function Content(props) {

    const userName = useContext(UserContext);

    console.log(userName, "action")

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
            return <Events
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
