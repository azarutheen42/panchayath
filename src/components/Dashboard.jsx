
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




function Dashboard() {

    const userName = useContext(UserContext);

    console.log(userName, "action")

    const [path, setpath] = useState();

    const [view, setView] = useState();


    const url = window.location.search
    const { state } = useLocation()
    const search = useLocation().search;


    // useEffect(() => {
    //     if (url) {
    //         const main = new URLSearchParams(search).get("m");
    //         const sub = new URLSearchParams(search).get("s");
    //         setView(main)
    //         setpath(sub)
    //     }
    //     else {
    //         setView("dashboard")
    //     }

    // }, [url])



    return (

        <>

            {/* <div id="global-loader">
                <div class="whirly-loader"></div>
            </div> */}



            <div className="main-wrapper">

                <SideBar
                />
                <Header />

                <div className="page-wrapper">
                    <Content
                        // path={path}
                        // view={view}
                        // setView={setView}
                        // setpath={setpath
                        // }
                    />

                </div>

            </div>


        </>
    )
}








export default Dashboard;



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
