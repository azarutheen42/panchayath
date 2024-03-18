import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../Context"
import { useContext, createContext } from 'react';



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
import { mainListItems, secondaryListItems } from './listItems';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';







function SideBar1(props) {

    const user = useContext(UserContext);
    // const user = useSelector((state) => state?.user?.value);
    console.log(user?.admin)

    const navigate = useNavigate()

    const handlenavigate = (e) => {

        navigate("?" + e)

    }


    return (

        <div class="main-wrapper">
            <div class="sidebar" id="sidebar">

                <div class="sidebar-inner slimscroll"
                // style="background-color: aliceblue;"
                >
                    <div id="sidebar-menu" class="sidebar-menu">

                        <ul>
                            <li class="submenu-open">
                                <h6 class="submenu-hdr">Main</h6>
                                <ul>
                                    <li class="active">
                                        <a
                                            onClick={() => handlenavigate("")}
                                        >
                                            <i data-feather="grid"></i>
                                            <span>Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* <li class="submenu-open">
                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="file-text"></i><span>Employee Details</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a  onClick={() => handlenavigate("m=employee&s=permenant")}
                                               

                                            >Permanent Employee</a></li>
                                            <li><a 
                                            onClick={() => handlenavigate("m=employee&s=contract")}
                                            >Contract Employee</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li> */}

                            <li class="submenu-open">
                                <ul>
                                    <li>
                                        <a onClick={() => handlenavigate("m=employee&s=permenant")}>Permanent Employee</a>
                                    </li>
                                </ul>
                            </li>



                            <li class="submenu-open">
                                <ul>
                                    <li>
                                        <a onClick={() => handlenavigate("m=attendance")}
                                        >
                                            <i data-feather="users"></i>
                                            <span>Attendance</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="shopping-cart"></i><span>Collectors</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=collector&s=house")}>House collector</a></li>
                                            <li><a onClick={() => handlenavigate("m=collector&s=street")}>Street collector</a></li>
                                            <li><a onClick={() => handlenavigate("m=collector&s=shop")}>Shop collector</a></li>
                                            <li><a onClick={() => handlenavigate("m=collector&s=overall-weighing")}>Overall weighing</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li class="submenu-open">
                                <ul>
                                    <li>
                                        <a onClick={() => handlenavigate("m=user-register")}>
                                            <i data-feather="user"></i>
                                            <span>User Registration</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>


                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="box"></i><span>Complaint</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=complaint&s=list")}>Complaints List</a></li>
                                            {/* <li><a onClick={() => handlenavigate("m=complaint&s=status")}>Complaints Status</a></li> */}
                                            <li><a onClick={() => handlenavigate("m=complaint&s=water-supply")}>Water Supply</a></li>
                                            <li><a onClick={() => handlenavigate("m=complaint&s=street-light")}>Street Light</a></li>
                                            <li><a onClick={() => handlenavigate("m=complaint&s=sanittion")}>Sanitation</a></li>
                                            <li><a onClick={() => handlenavigate("m=complaint&s=solid-waste")}>Solid Waste</a></li>
                                            <li><a onClick={() => handlenavigate("m=complaint&s=qr-issue")}>QR Issue</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);" onClick={() => handlenavigate("m=request&s=list")}><i data-feather="shopping-bag"></i><span>Request</span>
                                            {/* <span class="menu-arrow"></span> */}
                                        </a>
                                        <ul>
                                            {/* <li><a onClick={() => handlenavigate("m=request&s=list")}>Request List</a></li>
                                            <li><a onClick={() => handlenavigate("m=request&s=public-toilet")}>Public Toilet</a></li>
                                            <li><a onClick={() => handlenavigate("m=request&s=tank-cleaning")}>Specific Tank Cleaning</a></li> */}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="activity"></i><span>Activity</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=activity&s=minutes-of-meeting")}>Minutes of Meeting</a></li>
                                            <li><a onClick={() => handlenavigate("m=activity&s=scheme")}> Scheme </a></li>
                                            <li><a onClick={() => handlenavigate("m=activity&s=events")}>Events </a></li>
                                            {/* <li><a onClick={() => handlenavigate("m=activity&s=public-notice")}>Public Notice Board</a></li> */}
                                            <li><a onClick={() => handlenavigate("m=activity&s=staff-notice")} >Staff Notice Board</a></li>
                                            <li><a onClick={() => handlenavigate("m=activity&s=announcements")}>Announcements </a></li>

                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu-open">
                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="maximize"></i><span>Reports</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            {/* <li><a onClick={() => handlenavigate("m=reports&s=house")}>House Reports</a></li> */}
                                            <li><a onClick={() => handlenavigate("m=reports&s=street")}>Ward Reports</a></li>
                                            {/* <li><a onClick={() => handlenavigate("m=reports&s=shop")}>Shop Reports</a></li> */}
                                            <li><a onClick={() => handlenavigate("m=reports&s=overall")}>Overall Reports</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="gift"></i><span>Masters</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            {/* <li><a onClick={() => handlenavigate("m=masters&s=districts")}>District</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=cities")}>City</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=panchayath")}>Panchayath</a></li> */}

                                            <li><a onClick={() => handlenavigate("m=masters&s=ward")}>Ward</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=streets")}>Street</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=house")}>Building</a></li>
                                            {/* <li><a onClick={() => handlenavigate("m=masters&s=shops")}>Register Shops</a></li> */}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="grid"></i><span>QR Details</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=qr&s=generator")}>QR generator</a></li>
                                            <li><a onClick={() => handlenavigate("m=qr&s=issuelist")}>QR issue list</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li> */}
                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="settings"></i><span>Settings</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=settings&s=permissions")}>Permission</a></li>
                                            <li><a onClick={() => handlenavigate("m=settings&s=roles")}>Roles</a></li>
                                            {/* <li><a onClick={() => handlenavigate("m=settings&s=menu")}>Menus</a></li> */}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>


                </div>

            </div>
        </div>
    )
}








import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';



// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { ReceiptLong } from "@mui/icons-material";
// import AssignmentIcon from '@mui/icons-material/Assignment';



function SideBar(props) {

    const { open, setOpen, toggleDrawer, drawerWidth } = props



    const [show, setShow] = React.useState({
        "collector": false,
        "complaint": false,
        "activity": false,
        "reports": false,
        "masters": false,
        "menu": false,

    });

    const handleClick = (e) => {
        console.log(e)
        setShow((prevstate) => {
            return {
                ...prevstate, [e]: !show[e]
            }
        })

    };



    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );





    const user = useContext(UserContext);
    // const user = useSelector((state) => state?.user?.value);
    console.log(user?.admin)

    const navigate = useNavigate()

    const handlenavigate = (e) => {

        navigate("?" + e)

    }




    return (

        <>


            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >



                    <div class="header-left active">
                        {/* <a href="#" class="logo logo-normal"> */}
                            <img src="assets/img/logo.png" alt />
                        {/* </a> */}
                        {/* <a href="#" class="logo logo-white">
                            <img src="assets/img/logo.png" alt />
                        </a> */}
                    </div>



                    <IconButton onClick={toggleDrawer}>

                        <ChevronLeftIcon />
                    </IconButton>

                </Toolbar>
                <Divider />

                {/* DASHBOARD */}

                <List component="nav">

                    {/* {mainListItems} */} <ListItemButton onClick={() => handlenavigate("")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                    {/* PERMENANT EMPLOYEES */}


                    <ListItemButton onClick={() => handlenavigate("m=employee&s=permenant")}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Permanent Employee" />
                    </ListItemButton>



                    {/* COLLECTORS */}
                    <ListItemButton onClick={() => handleClick("collector")}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Collectors" />
                        {show?.collector ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={show?.collector} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=collector&s=house")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="House collector" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=collector&s=street")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Street collector" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} a onClick={() => handlenavigate("m=collector&s=shop")} >
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Shop collector" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=collector&s=overall-weighing")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Overall weighing" />
                            </ListItemButton>

                        </List>
                    </Collapse>




                    {/* ATTENDENCE */}
                    <ListItemButton onClick={() => handlenavigate("m=attendance")}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Attendance" />
                    </ListItemButton>


                    {/* USER REGISTER */}

                    <ListItemButton onClick={() => handlenavigate("m=user-register")}>
                        <ListItemIcon>
                            {/* <PeopleIcon /> */}
                            < PersonAddTwoToneIcon />
                            {/* <ShoppingCartIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="User Registeration" />
                    </ListItemButton>


                    {/* COMPLAINTS */}


                    <ListItemButton onClick={() => handlenavigate("m=complaint&s=list")} >
                        <ListItemIcon>

                            <AssignmentIcon />

                        </ListItemIcon>
                        <ListItemText primary="Complaints" />
                    </ListItemButton>

                    {/* <ListItemButton onClick={() => handleClick("complaint")}>
                        <ListItemIcon>
                           
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Complaints" />
                        {show?.complaint ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>



                    <Collapse in={show?.complaint} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=list")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Complaints List" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=water-supply")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Water Supply" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=street-light")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Street Light" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=solid-waste")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Solid Waste" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=sanittion")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Sanitation" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=complaint&s=qr-issue")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Solid Waste" />
                            </ListItemButton>

                        </List>
                    </Collapse> */}






                    {/* REQUEST */}
                    <ListItemButton onClick={() => handlenavigate("m=request&s=list")}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request" />

                    </ListItemButton>



                    {/* ACTIVITIES */}
                    <ListItemButton onClick={() => handleClick("activity")}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Activities" />

                        {show?.activity ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>


                    <Collapse in={show?.activity} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=activity&s=minutes-of-meeting")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Minutes of Meeting" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=activity&s=scheme")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Scheme" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=activity&s=events")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Events" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=activity&s=staff-notice")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Staff Notice Board" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=activity&s=announcements")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Announcements" />
                            </ListItemButton>

                        </List>
                    </Collapse>


                    {/* REPORTS */}
                    <ListItemButton onClick={() => handleClick("reports")}>
                        <ListItemIcon>
                            {/* <LayersIcon /> */}
                            <ReceiptLongIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                        {show?.reports ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>



                    <Collapse in={show?.reports} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=reports&s=street")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Ward Reports" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=reports&s=overall")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Overall Reports" />
                            </ListItemButton>

                        </List>
                    </Collapse>


                    {/* MASTERS */}
                    <ListItemButton onClick={() => handleClick("masters")}>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Masters" />
                        {show?.masters ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>


                    <Collapse in={show?.masters} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=masters&s=ward")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Ward" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=masters&s=streets")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Street" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=masters&s=house")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Building" />
                            </ListItemButton>

                        </List>
                    </Collapse>






                    {/* MENU */}


                    <ListItemButton onClick={() => handlenavigate("m=settings&s=roles")} >
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Permissions" />

                    </ListItemButton>

                    {/* <ListItemButton onClick={() => handleClick("menu")}>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Permissions" />
                        {show?.menu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>





                    <Collapse in={show?.menu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=settings&s=roles")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Role" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=masters&s=streets")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Street" />
                            </ListItemButton>


                            <ListItemButton sx={{ pl: 4 }} onClick={() => handlenavigate("m=masters&s=house")}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Building" />
                            </ListItemButton>

                        </List>
                    </Collapse> */}



                    <Divider sx={{ my: 1 }} />
                    {/* {secondaryListItems} */}




                </List>

            </Drawer>

        </>
    )
}






export default SideBar;