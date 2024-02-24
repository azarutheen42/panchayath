import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "../Context"
import { useContext, createContext } from 'react';







function SideBar(props) {

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
                                            <li><a onClick={() => handlenavigate("m=complaint&s=status")}>Complaints Status</a></li>
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
                                        <a href="javascript:void(0);"><i data-feather="shopping-bag"></i><span>Request</span><span class="menu-arrow"></span></a>
                                        <ul>
                                        <li><a onClick={() => handlenavigate("m=request&s=list")}>Request List</a></li>
                                            <li><a onClick={() => handlenavigate("m=request&s=public-toilet")}>Public Toilet</a></li>
                                            <li><a onClick={() => handlenavigate("m=request&s=tank-cleaning")}>Specific Tank Cleaning</a></li>
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
                                        <a href="javascript:void(0);"><i data-feather="settings"></i><span>Settings</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=settings&s=permissions")}>Permission</a></li>
                                            <li><a onClick={() => handlenavigate("m=settings&s=roles")}>Roles</a></li>
                                            <li><a onClick={() => handlenavigate("m=settings&s=menu")}>Menus</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="gift"></i><span>Masters</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=masters&s=districts")}>District</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=cities")}>City</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=panchayath")}>Panchayath</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=ward")}>Ward</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=house")}>Register House</a></li>
                                            <li><a onClick={() => handlenavigate("m=masters&s=shops")}>Register Shops</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu-open">

                                <ul>
                                    <li class="submenu">
                                        <a href="javascript:void(0);"><i data-feather="grid"></i><span>QR Details</span><span class="menu-arrow"></span></a>
                                        <ul>
                                            <li><a onClick={() => handlenavigate("m=qr&s=generator")}>QR generator</a></li>
                                            <li><a onClick={() => handlenavigate("m=qr&s=issuelist")}>QR issue list</a></li>
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


export default SideBar;
