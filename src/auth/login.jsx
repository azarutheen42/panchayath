import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Config from "../Config";
import Cookies from "js-cookie";


import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from "react-toastify";
import { AccountCircle } from "@mui/icons-material";



function Login() {
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

    // const [phone, setPhone] = useState(9715636823)
    // const [password, setPassword] = useState("azar3255")

    const [error, setError] = useState()
    const [visible, setVisible] = useState(false)
    const [notify, setNotify] = useState()

    const [token, setToken] = useState();

    const [loader, setLoader] = useState();



    const validate = () => {
        if (phone && password) {
            register()
        }
        else {
            setNotify("Invalid Credentials")
        }

    }

    const navigate = useNavigate()

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const register = () => {
        setLoader(true)

        const data = new FormData()
        data.append("phone", phone)
        data.append("password", password)


        axios.post(`${Config.BASE_URL + Config.LOGIN_URL}`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setLoader(false)
                    Config?.toastalert("Loged in Successfully", "success")
                    let userData = {
                        token: response.data.access,
                        refresh_token: response.data.refresh,
                    };

                    Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, {
                        domain: Config.COOKIE_DOMAIN,
                    });
                    Cookies.set(
                        import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME,
                        JSON.stringify(userData),
                        { domain: Config.COOKIE_DOMAIN }
                    );
                    window.location.href = "dashboard"
                }

            })
            .catch(function (error) {
                console.log(error);
                setNotify("Invalid Credentials")
                setLoader(false)
                if (error?.response?.status === 401) {
                    console.log(error);
                    // setError(error?.response?.data)
                    Config?.toastalert("Invalid Credential", "warn")
                }
                else if (error?.response?.status === 400) {
                    Config?.toastalert(error?.response?.data?.detail[0], "warn")

                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
            });
    }


    const handlePhoneNumberChange = (e) => {
        const { name, value } = e.target

        const inputValue = e.target.value;
        if (inputValue.length <= 10) {
            setPhone(value)
        }
    }


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  

    return (
        <>

            <ToastContainer />

            <div className="auth-page-wrapper pt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card">

                                <div className="card-body p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">Sign in to continue to vinsup.</p>
                                    </div>
                                    <div className="p-2 mt-4">


                                        {/* <div className="mb-3"> */}

                                        <FormControl fullWidth variant="outlined">
                                            <label htmlFor="outlined-adornment-phone">Phone</label>
                                            <TextField
                                                id="outlined-adornment-phone"
                                                value={phone}
                                                onChange={handlePhoneNumberChange}
                                                fullWidth
                                                style={{ minHeight: 50 }}
                                                size='small'
                                                inputprops={{
                                                    style: {
                                                        transition: 'none'
                                                    },
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}


                                                variant="outlined"
                                                type="number"
                                                disableUnderline={false}
                                                // margin="normal"
                                                placeholder="Phone Number"
                                                autoFocus
                                                required

                                            />

                                        </FormControl>
                                        <span>{error || " "}</span>
                                        {/* </div> */}

                                        {/* <div className="mb-3"> */}
                                        <div className="float-end">
                                            <a href="/password-reset" className="text-muted">Forgot password?</a>
                                        </div>

                                        <FormControl fullWidth variant="outlined">
                                            <label htmlFor="outlined-adornment-password">Password</label>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                fullWidth
                                                size='small'
                                                style={{ minHeight: 45 }}
                                                inputprops={{
                                                    style: {
                                                        // height: '45px',
                                                        transition: 'none',
                                                        border: 'none', "& fieldset": { border: 'none' }
                                                    }
                                                }}
                                                // variant="outlined"
                                                type={visible ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end"   >
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { setVisible(!visible) }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"


                                                        >
                                                            {visible ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />

                                           
                                        </FormControl>

                                        {/* </div> */}

                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                            <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                        </div>

                                        <div className="mt-4">
                                            <button className="btn btn-success w-100" type="submit" onClick={validate}

                                                disabled={!phone || !password}
                                            >{loader && Config?.loader}Sign In</button>
                                        </div>

                                        <div className="mt-1 text-center p-1">
                                            {notify && (
                                                <>
                                                    <span className="req-text">{notify}</span>
                                                </>
                                            )}
                                        </div>



                                    </div>
                                </div>

                            </div>


                            {/* <div className="mt-4 text-center">
                                <p className="mb-0">Don't have an account ? <a href="/sign-up" className="fw-semibold text-primary text-decoration-underline"> Signup </a> </p>
                            </div> */}

                        </div>
                    </div>

                </div>




                {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={visible ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => { setVisible(!visible) }}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {visible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl> */}

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy;
                                        <script>
                                            document.write(new Date().getFullYear())
                                        </script> vinsup. Crafted with <i className="mdi mdi-heart text-danger"></i> by vinsup
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

        </>
    )
}

export default Login
