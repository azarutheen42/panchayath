import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PasswordReset from "./password";
import Config from "../Config";

function SignUp() {
    const [phone, setPhone] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const [error, setError] = useState()
    const [notify, setNotify] = useState()

    const [isOtp, setisOtp] = useState(false)

    const[visible,setVisible] =useState(false)

    const navigate = useNavigate()

    const validate = () => {

        const phone_len = phone?.split("").length
        if (phone_len > 10) {
            setError({phone:"Phone number must be 10 digits"})
        }
        else if (phone_len < 10){
            setError({phone:"Phone number must be 10 digits"})
        }
        else {
            setError()
        }
        console.log("registered")
        register()

    }


    const register = () => {
        console.log(error)
        if (error) {
            setNotify("Please Enter The valid Input")
            return
        }
  
        const data = new FormData()
        data.append("phone", phone)
        data.append("name", name)
        data.append("password", password)

        axios.post(`${Config.BASE_URL}auth/users/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setisOtp(true)

                }
                else {
                    console.log(error.response.data);
                    setNotify(error.response.data)
                }

            })
            .catch(function (error) {
                console.log(error.response.data);
                setNotify(error.response.data)
            });
    }



    return (
        <>
        


            {!isOtp ? <>

                <div class="auth-page-wrapper pt-5">
                    <div class="auth-page-content">
                        <div class="container">


                            <div class="row justify-content-center">
                                <div class="col-md-8 col-lg-6 col-xl-5">
                                    <div class="card mt-4">

                                        <div class="card-body p-4">
                                            <div class="text-center mt-2">
                                                <h5 class="text-primary">Create New Account</h5>
                                                <p class="text-muted">Get your panchayath account now</p>
                                            </div>
                                            <div class="p-2 mt-4">


                                                <div class="mb-3">
                                                    <label for="useremail" class="form-label">Phone No <span class="text-danger">*</span></label>
                                                    <input type="number" class="form-control" id="useremail" placeholder="Enter mobile number" 
                                                            max="10"
                                                        onChange={(e) =>{
                                                       
                                                            setPhone(e.target.value)
                                                        }
                                                        
                                                        }
                                                        required />
                                                    {notify && (
                                                        <>
                                                            <p>{notify?.phone}</p>
                                                        </>
                                                    )}
                                                     {error && (
                                                        <>
                                                            <p>{error?.phone}</p>
                                                        </>
                                                    )}
                                                    <div class="invalid-feedback">
                                                        Please enter Phone Number
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="username" placeholder="Enter username" require
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                    <div class="invalid-feedback">
                                                        Please enter username
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label class="form-label" for="password-input">Password</label>
                                                    <div class="position-relative auth-pass-inputgroup">
                                                        <input type={visible ? "text":"password"} class="form-control pe-5 password-input" onpaste="return false" placeholder="Enter password" id="password-input" aria-describedby="passwordInput" patt ern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
                                                            onChange={(e) => setPassword(e.target.value)}

                                                        />
                                                           {notify && (
                                                        <>
                                                            <p>{notify?.password}</p>
                                                        </>
                                                    )}      
                                                        <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon" type="button" id="password-addon"
                                                        
                                                        onClick={()=>{setVisible(!visible)}}
                                                        ><i class="ri-eye-fill align-middle"></i></button>
                                                        <div class="invalid-feedback">
                                                            Please enter password
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mb-4">
                                                    <p class="mb-0 fs-12 text-muted fst-italic">By registering you agree to the vinsup <a href="#" class="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                                </div>

                                                <div id="password-contain" class="p-3 bg-light mb-2 rounded">
                                                    <h5 class="fs-13">Password must contain:</h5>
                                                    <p id="pass-length" class="invalid fs-12 mb-2">Minimum <b>8 characters</b></p>
                                                    <p id="pass-lower" class="invalid fs-12 mb-2">At <b>lowercase</b> letter (a-z)</p>
                                                    <p id="pass-upper" class="invalid fs-12 mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                                                    <p id="pass-number" class="invalid fs-12 mb-0">A least <b>number</b> (0-9)</p>
                                                </div>

                                                <div class="mt-4">
                                                    <button class="btn btn-success w-100" type="submit" onClick={validate}>Sign Up</button>
                                                </div>

                                                <div class="mt-4 text-center">
                                                    <div class="signin-other-title">
                                                        <h5 class="fs-13 mb-4 title text-muted">Create account with</h5>
                                                    </div>

                                                    <div>
                                                        <button type="button" class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-facebook-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-google-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-dark btn-icon waves-effect waves-light"><i class="ri-github-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-info btn-icon waves-effect waves-light"><i class="ri-twitter-fill fs-16"></i></button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>


                                        <div class="mt-4 text-center">
                                            <p class="mb-0">Already have an account ? <a href="/login" class="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
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


                </div>
            </>
                :
                <>
                    <PasswordReset phone={phone} signUp={true} />
                </>

            }





        </>
    )
}

export default SignUp
