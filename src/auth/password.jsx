import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Config from "../Config";
import { ToastContainer } from "react-toastify";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function PasswordReset(props) {

    const [password1, setPassword1] = useState()
    const [password2, setPassword2] = useState();
    const [phone, setPhone] = useState();
    const [ispassword, setisPassword] = useState(false)

    const [otpSend, setOtpSend] = useState(false)
    const [msg, setMsg] = useState()

    const [otp, setOtp] = useState("")
    const navigate = useNavigate();

    const [loader, setLoader] = useState();



    const getPasswordResetOTP = () => {
        setLoader(true)
        const data = new FormData()
        data.append("phone_number", phone)

        // axios.post(`${Config.BASE_URL}auth/users/reset_password/`,
        axios.post(`${Config.BASE_URL}auth/mpin-reset`,
            data
        )
            .then(function (response) {
                if (response?.status === 200) {
                    console.log(response);
                    setOtpSend(true)
                    Config?.toastalert("OTP Send Successfully", "success")
                }
                setLoader(false)
                setMsg()
            })
            .catch(function (error) {
                console.log(error);
                setMsg(error.response.data.msg)
                setLoader(false)
                if (error?.response?.status === 404) {
                    console.log(error);
                    Config?.toastalert("Number Not Registered", "warn")
                }
                else {
                    Config?.toastalert("Something went wrong", "error")
                }
            });
    }


    // otp verification 
    const verifyUser = () => {
        setLoader(true)
        const data = new FormData()
        data.append("phone", phone)
        data.append("otp", otp)


        axios.post(`${Config.BASE_URL}auth/verify/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    setLoader(false)
                    Config?.toastalert("OTP Verified", "success")
                    setisPassword(true)
                }
                setMsg()


            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
                setMsg(error.response.data.msg)
                if (error?.response?.status === 400) {
                    console.log(error);
                    Config?.toastalert("Invalid OTP", "warn")
                }
                else {
                    Config?.toastalert("Something went wrong", "error")

                }

            });
    }




    // function to reset password
    const PasswordResetConfirm = () => {
        setLoader(true)

        if (password1 != password2) {
            setMsg("Password are Not Same")
            setLoader(false)
            // Config?.toastalert("Password Not match", "warn")
            return
        }

        const data = new FormData()
        data.append("new_password", password1)
        data.append("re_new_password", password2)
        data.append("otp", otp)
        data.append("phone", phone)

        axios.post(`${Config.BASE_URL}auth/password-reset-confirm/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    Config?.toastalert("Password Changed Successfully", "success")
                    window.location.href = "login"
                }
                setLoader(false)
                setMsg()

            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
                if (error?.response?.status === 400) {
                    console.log(error);
                    Config?.toastalert("Invalid OTP", "warn")
                }
                else {
                    Config?.toastalert("Something went wrong", "error")

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


    return (
        <>

            <ToastContainer />

            <div className="auth-page-wrapper pt-5">
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-12">

                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4">

                                    <div className="card-body p-4">





                                        {!ispassword ? (
                                            (!otpSend ? (


                                                <>

                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary">Password Reset</h5>

                                                    </div>

                                                    <div className="p-2">

                                                        <FormControl fullWidth variant="outlined">
                                                            <label htmlFor="outlined-adornment-phone">Phone</label>
                                                            <TextField
                                                                id="outlined-adornment-phone"
                                                                value={phone}
                                                                onChange={handlePhoneNumberChange}
                                                                fullWidth
                                                                style={{ minHeight: 50 ,marginTop: 5}}
                                                                size='small'
                                                                inputprops={{
                                                                    style: {

                                                                        transition: 'none'
                                                                    }
                                                                }}
                                                                variant="outlined"

                                                                type="number"
                                                                placeholder="Phone Number"
                                                            />
                                                        </FormControl>

                                                        <div className="text-center mt-4">
                                                            <button className="btn btn-success w-100" type="submit" disabled={!phone} onClick={getPasswordResetOTP}>
                                                                {loader && Config?.loader} Get OTP
                                                            </button>
                                                        </div>

                                                        {msg && (
                                                            <>
                                                                <p className="text-center text-danger">{msg}</p>
                                                            </>
                                                        )}

                                                    </div>
                                                </>

                                            ) : (
                                                <>

                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary">OTP Verification</h5>
                                                        {/* <p className="text-muted">verify your OTP </p> */}
                                                    </div>

                                                    <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                                        Enter OTP sent to your mobile Number !
                                                    </div>
                                                    <div className="p-2">


                                                        <FormControl fullWidth variant="outlined">
                                                            <label htmlFor="outlined-adornment-OTP">OTP</label>
                                                            <TextField
                                                                id="outlined-adornment-OTP"
                                                                value={otp}
                                                                onChange={(e) => setOtp(e.target.value)}
                                                                fullWidth
                                                                style={{ minHeight: 50 ,marginTop: 5}}
                                                                size='small'
                                                                inputprops={{
                                                                    style: {
                                                                        transition: 'none'
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                placeholder="otp"
                                                            />
                                                        </FormControl>

                                                        <div className="text-center mt-4">
                                                            <button className="btn btn-success w-100" type="submit" onClick={verifyUser} disabled={!otp}>
                                                                {loader && Config?.loader} Verify OTP
                                                            </button>
                                                        </div>

                                                        {msg && (
                                                            <>
                                                                <p className="text-center text-danger mt-2 ">{msg}</p>
                                                            </>
                                                        )}

                                                    </div>
                                                </>
                                            ))
                                        )
                                            :

                                            (
                                                <>

                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary">Password Reset Confirm</h5>
                                                    </div>

                                                    <div className="p-2">

                                                        <FormControl fullWidth variant="outlined">
                                                            <label htmlFor="outlined-adornment-password">Enter Your Password</label>
                                                            <TextField
                                                                id="outlined-adornment-password"
                                                                value={password1}
                                                                onChange={(e) => setPassword1(e.target.value)}
                                                                fullWidth
                                                                style={{ minHeight: 50, marginTop: 5 }}
                                                                size='small'
                                                                inputprops={{
                                                                    style: {
                                                                        transition: 'none'
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                placeholder="Password"

                                                            />
                                                        </FormControl>


                                                        <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
                                                            <label htmlFor="outlined-adornment-password2">Confirm Password</label>
                                                            <TextField
                                                                id="outlined-adornment-password2"
                                                                value={password2}
                                                                onChange={(e) => setPassword2(e.target.value)}
                                                                fullWidth
                                                                style={{ minHeight: 50, marginTop: 5 }}
                                                                size='small'
                                                                inputprops={{
                                                                    style: {
                                                                        transition: 'none'
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                placeholder="confirm password"

                                                            />
                                                        </FormControl>

                                                        {/* <div className="mb-4">
                                                            <label className="form-label">Confirm Password</label>
                                                            <input type="text" className="form-control" id="email" placeholder="confirm password"

                                                                onChange={(e) => setPassword2(e.target.value)}
                                                            />
                                                        </div> */}

                                                        <div className="text-center mt-4">
                                                            <button className="btn btn-success w-100" type="submit" onClick={PasswordResetConfirm}

                                                                disabled={!password1 || !password2}
                                                            > {loader && Config?.loader} Reset Password</button>
                                                        </div>

                                                        {msg && (
                                                            <>
                                                                <p className="text-center text-danger mt-2">{msg}</p>
                                                            </>
                                                        )}

                                                    </div>
                                                </>
                                            )

                                        }

                                    </div>

                                    <div className="mt-5 text-center">
                                        <p className="mb-4">Wait, Back to your Page... <a href="/login" className="fw-semibold text-primary text-decoration-underline"> Login Here </a> </p>
                                    </div>


                                </div>
                            </div>
                        </div>




                    </div>

                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">

                                </div>

                            </div>
                        </div>
                    </div>
                </footer>

            </div>









        </>
    )
}

export default PasswordReset
