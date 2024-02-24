import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Config from "../Config";

function PasswordReset(props) {

    const [password1, setPassword1] = useState()
    const [password2, setPassword2] = useState()

    const [ispassword, setisPassword] = useState(false)
    const [msg, setMsg] = useState()

    const [otp, setOtp] = useState("")
    const navigate= useNavigate()

    const verifyUser = () => {
        const data = new FormData()
        data.append("phone", props?.phone)
        data.append("otp", otp)


        axios.post(`${Config.BASE_URL}auth/verify/`,
            data
        )
            .then(function (response) {
                if (response?.status === 200) {
                    console.log(response);
                    if (!props?.signUp){
                        setisPassword(true)
                    }
                    else{
                        navigate("/login")
                    }
                    
                }
                else if (response?.status === 400) {
                    console.log("status")
                }
            })
            .catch(function (error) {
                console.log(error);
                setMsg(error.response.data.msg)
            });
    }

    const register = () => {

        const data = new FormData()
        data.append("new_password", password1)
        data.append("re_new_password", password2)
        data.append("otp", otp)
        data.append("phone", props.phone)

        axios.post(`${Config.BASE_URL}auth/password-reset-confirm/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    window.href.url("/login")
                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    
    return (
        <>
            {!ispassword ?
                <div class="auth-page-wrapper pt-5">
                    <div class="auth-page-content">
                        <div class="container">
                            <div class="row mt-5">
                                <div class="col-lg-12">

                                </div>
                            </div>


                            <div class="row justify-content-center">
                                <div class="col-md-8 col-lg-6 col-xl-5">
                                    <div class="card mt-4">

                                        <div class="card-body p-4">
                                            <div class="text-center mt-2">
                                                <h5 class="text-primary">Verification</h5>
                                                <p class="text-muted">verify your OTP </p>



                                            </div>

                                            <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                                Enter OTP sent to your mobile Number !
                                            </div>
                                            <div class="p-2">

                                                <div class="mb-4">
                                                    <label class="form-label">OTP</label>
                                                    <input type="text" class="form-control" id="email" placeholder="Enter otp"

                                                        onChange={(e) => setOtp(e.target.value)}
                                                    />
                                                </div>

                                                <div class="text-center mt-4">
                                                    <button class="btn btn-success w-100" type="submit" onClick={verifyUser}>Submit</button>
                                                </div>

                                                {msg && (
                                                    <>
                                                        <p className="text-center text-danger">{msg}</p>
                                                    </>
                                                )}

                                            </div>
                                        </div>

                                    </div>


                                    <div class="mt-4 text-center">
                                        <p class="mb-0">Wait, Back to your Page... <a href="/login" class="fw-semibold text-primary text-decoration-underline"> Login Here </a> </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <footer class="footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="text-center">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>

                :
                <>

                    <p>enter password</p>
                </>
            }
        </>
    )
}

export default PasswordReset
