
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import SignUp from "./auth/Signup";
import PasswordReset from "./auth/password";
import Dashboard from "./components/Dashboard";
import Config from "./Config";
import { useEffect,useState } from "react";





function Routers() {

   

    return (
        <>

            {! Config?.userState  ?

                <Routes path="/" >
                     <Route path="" element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="password-reset" element={<PasswordReset />} />
                    <Route path="/*" element={<Login />}></Route>
                </Routes>
                :
                <Routes path="/*" >
                     <Route path="login" element={<Login />} />
                    <Route path="dashboard" index element={<Dashboard />}></Route>
                    {/* <Route path="/*" element={<Dashboard />}></Route> */}
                </Routes>

            }

        </>


    )
}

export default Routers
