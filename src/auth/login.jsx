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



function Login() {
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

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
                    setError(error?.response?.data)
                    Config?.toastalert("Invalid Credential", "warn")
                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
            });
    }






    return (
        <>
            <div class="auth-page-wrapper pt-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-6 col-xl-5">
                            <div class="card">

                                <div class="card-body p-4">
                                    <div class="text-center mt-2">
                                        <h5 class="text-primary">Welcome Back !</h5>
                                        <p class="text-muted">Sign in to continue to vinsup.</p>
                                    </div>
                                    <div class="p-2 mt-4">


                                        <div class="mb-3">
                                            {/* <label for="username" class="form-label">Phone Number</label>
                                            <input type="number" class="form-control" id="username" placeholder="Enter Phone number" onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <p>{error || " "}</p> */}


                                            <FormControl fullWidth variant="outlined">
                                                <label htmlFor="outlined-adornment-phone">Phone</label>
                                                <TextField
                                                    id="outlined-adornment-phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    fullWidth
                                                    style={{ minHeight: 50 }}
                                                    size='small'
                                                    inputprops={{
                                                        style: {
                                                            // height: '40px', // Set a fixed height
                                                            transition: 'none' // Disable transitions
                                                        }
                                                    }}
                                                    variant="outlined"

                                                    type="number"
                                                />
                                            </FormControl>
                                            <span>{error || " "}</span>
                                        </div>

                                        <div class="mb-3">
                                            {/* <div class="float-end">
                                                <a href="/password-reset" class="text-muted">Forgot password?</a>
                                            </div> */}
                                            {/* <label class="form-label" for="password-input">Password</label>
                                            <div class="position-relative auth-pass-inputgroup mb-3">
                                                <input type={visible ? "text" : "password"} class="form-control pe-5 password-input" placeholder="Enter password" id="password-input" onChange={(e) => setPassword(e.target.value)} />
                                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted shadow-none password-addon" type="button" id="password-addon"
                                                    onClick={() => { setVisible(!visible) }}

                                                ><i class="ri-eye-fill align-middle"></i></button>
                                            </div> */}

                                     
                                                    <FormControl fullWidth variant="outlined">
                                                        <label htmlFor="outlined-adornment-password">Password</label>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            fullWidth
                                                            size='small'
                                                            // style={{ minHeight: 50 }}
                                                            inputprops={{
                                                                style: {
                                                                    height: '50px', 
                                                                    transition: 'none' 
                                                                }
                                                            }}
                                                            // variant="outlined"

                                                            type={visible ? 'text' : 'password' }
                                                            endAdornment={
                                                                <InputAdornment position="end"  >
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
                                          
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                            <label class="form-check-label" for="auth-remember-check">Remember me</label>
                                        </div>

                                        <div class="mt-4">
                                            <button class="btn btn-success w-100" type="submit" onClick={validate}>Sign In</button>
                                        </div>

                                        <div class="mt-1 text-center p-1">
                                            {notify && (
                                                <>
                                                    <span className="req-text">{notify}</span>
                                                </>
                                            )}
                                        </div>



                                    </div>
                                </div>

                            </div>


                            {/* <div class="mt-4 text-center">
                                <p class="mb-0">Don't have an account ? <a href="/sign-up" class="fw-semibold text-primary text-decoration-underline"> Signup </a> </p>
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

                <footer class="footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-center">
                                    <p class="mb-0 text-muted">&copy;
                                        <script>
                                            document.write(new Date().getFullYear())
                                        </script> vinsup. Crafted with <i class="mdi mdi-heart text-danger"></i> by vinsup
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
