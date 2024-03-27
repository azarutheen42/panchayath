import { useState, useEffect } from "react"
import Config from "../Config";
import axios from "axios";
import CountUp from 'react-countup';
// import { Doughnut } from 'react-chartjs-2';
// // import { PieChart } from '@mui/x-charts/PieChart';

import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { Typography, Container, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import CustomTable from "./Table";




function OverView() {


    const [overData, setOverData] = useState();
    const [worker, setWorker] = useState();
    const [compData, setcompData] = useState([]);

    const [registerUser, setRegisterUser] = useState();
    const [totalWeight, setTotalWeight] = useState();

    const [loader, setLoader] = useState();
    const actionShow = true;

    // render chart
    const [isRender, setIsRender] = useState(false);


    useEffect(() => {


        getoverData();
        getComplaints();
        getAtendence();
        getRegisteredUsers()


    }, [])



    const headersToShow = ["Employee", "Role", "Timing", "Status"]
    const tableData = worker
    const fieldsToShow = []
    const fields = {
        'name': (value) => value,
        'role_name': (value) => value,
        'clock_in': (value) => value ? value : "0.00",
        'present': (value) => value ? "Present" : "absent",

    }



    useEffect(() => {
        // console.log("enter")
        // if(isRender){
        // render()
        setIsRender(true)
        // }

    }, [overData])


    const getoverData = () => {
        axios.get(`${Config.BASE_URL}garbage-stats`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setOverData(response?.data)
                    // weighconversion()


                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }



    const getComplaints = () => {
        axios.get(`${Config.BASE_URL}complaint-stats`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setcompData(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


    const getAtendence = () => {
        axios.get(`${Config.BASE_URL}worker-stats`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setWorker(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


    const weighconversion = () => {
        const data = Math.ceil((parseFloat(overData?.bio) + parseFloat(overData?.non_bio) + parseFloat(overData?.hazard)))
        if (data < 1000) {
            setTotalWeight({ "total": data, "unit": "kg" })
        }
        else {
            setTotalWeight({ "total": data / 1000, "unit": "Ton" })
        }

    }


    const getRegisteredUsers = () => {
        axios.get(`${Config.BASE_URL}register-user-stats`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setRegisterUser(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    const data = {
        labels: [
            'bio',
            'non-bio',
            'hazard'
        ],
        datasets: [{
            label: 'Garbage Report',
            data: [overData?.bio, overData?.non_bio, overData?.hazard],
            backgroundColor: [

                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }]
    };


    const config = {
        type: 'pie',
        data: data,
    };



    const styles = {
        card1Title: {
            color: 'white',
            fontWeight: 400,
            fontSize: '1.2rem',

        },
        card1Text: {
            color: 'white',
            fontWeight: 400,
            fontSize: '1rem',
        },
        card2Title: {
            color: 'black',
            fontWeight: 500,
            fontSize: '1.2rem',

        },
        card2Text: {
            color: 'black',
            fontWeight: 500,
            fontSize: '1rem',
        },

    };



    return (

        <>

            {/* first card */}
            <Grid item xs={12}  sm={3}  >
                <Card style={{ backgroundColor: '#ff9f43' }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={styles.card1Title}>
                            {parseFloat(overData?.total) < 1000 ? parseFloat(overData?.total) : (parseFloat(overData?.total) / 1000)}{" "}
                            {parseFloat(overData?.total) < 1000 ? "Kg" : "Ton"}
                        </Typography>
                        <Typography variant="body2" component="div" sx={styles.card1Text}>
                            Total Waste
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Card style={{ backgroundColor: '#28C76F' }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={styles.card1Title}>
                            {overData?.non_bio} kg
                        </Typography>
                        <Typography variant="body2" component="div" sx={styles.card1Text}>
                            Degradable waste
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}  sm={3}>
                <Card style={{ backgroundColor: '#1B2850' }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={styles.card1Title}>
                            {overData?.bio} kg
                        </Typography>
                        <Typography variant="body2" component="div" sx={styles.card1Text}>
                            Bio Degradable waste
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}  sm={3} >
                <Card style={{ backgroundColor: '#00CFE8' }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={styles.card1Title}>
                            {overData?.hazard} Kg
                        </Typography>
                        <Typography variant="body2" component="div" sx={styles.card1Text}>
                            Hazard waste
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>




            {/* second card */}

            {/* ----------------------------------------- */}

            <Grid item xs={12} sm={4}>
                <Card sx={{ padding: '25px' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                // height="100"
                                image="assets/img/customer-review.png"
                                alt="Placeholder"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent>
                                <Typography variant="h6" component="div" sx={styles.card2Title}>
                                    <CountUp
                                        end={registerUser?.user_count}
                                    />
                                </Typography>
                                <Typography variant="body2" component="div" sx={styles.card2Text}>
                                    User Registration
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card sx={{ padding: '25px' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                // height="100"
                                image="assets/img/complain.png"
                                alt="Placeholder"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent>
                                <Typography variant="h6" component="div" sx={styles.card2Title}>
                                    <CountUp end={compData?.total ? compData?.total : 0.00} />
                                </Typography>
                                <Typography variant="body2" component="div" sx={styles.card2Text} >
                                    Ward Complaints
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card sx={{ padding: '25px' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                // height="100"
                                image="assets/img/shopping-cart.png"
                                alt="Placeholder"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent>
                                <Typography variant="h6" component="div" sx={styles.card2Title} >
                                    <CountUp
                                        end={parseFloat(overData?.total) < 1000 ? parseFloat(overData?.total) : (parseFloat(overData?.total) / 1000)}
                                    />
                                    {" "}{parseFloat(overData?.total) < 1000 ? "Kg" : "Ton"}
                                </Typography>
                                <Typography variant="body2" component="div" sx={styles.card2Text}>
                                    Garbage Wastages
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>






            {/* ------------------------------------------------------------------- */}
            {/* <Grid item xs={12} sm={6} >
                <h2
                //  style="color: black;"
                >Overall Statistics</h2>
            </Grid> */}
            <Grid item xs={12} sm={6} display="flex" >

                <Typography variant="h6" component="div" sx={styles.card2Title}>
                    Overall Statistics
                </Typography>

                <Typography variant="body2" component="div" sx={styles.card2Text}>
                <Pie data={data}
                    arc={20}
                // width={50} height={50}
                // height={2000}
                //     width={2000}
                />
                </Typography>

               

            </Grid>


            <Grid item xs={12}>
                <CustomTable
                    headers={headersToShow}
                    data={tableData}
                    fieldsToShow={fieldsToShow}
                    fields={fields}
                    // getInstanceData={getInstanceData}
                    loader={loader}
                    setLoader={setLoader}
                    actionShow={actionShow}

                />
            </Grid>




        </>
    )
}



export default OverView