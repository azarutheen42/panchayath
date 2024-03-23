
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import SignUp from "./auth/Signup";
import PasswordReset from "./auth/password";
// import Dashboard from "./components/Dashboar";
import Config from "./Config";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard"
import { ToastContainer } from "react-toastify";




function Routers() {



    return (
        <>

            {!Config?.userState ?

                <Routes path="/" >
                    <Route path="" element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="password-reset" element={<PasswordReset />} />
                    <Route path="/*" element={<Login />}></Route>
                </Routes>
                :
                <Routes path="/" >
                    <Route path="" index element={<Dashboard />} />
                    <Route path="dashboard" index element={<Dashboard />} />
                    <Route path="login" element={<Login />} />

                </Routes>

            }

        </>


    )
}

export default Routers
