import { useState, useEffect } from "react"
import Config from "../Config";
import axios from "axios";
import CountUp from 'react-countup';
// import { Doughnut } from 'react-chartjs-2';
// // import { PieChart } from '@mui/x-charts/PieChart';

import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";






function OverView() {


    const [overData, setOverData] = useState();
    const [worker, setWorker] = useState();
    const [compData, setcompData] = useState([]);

    const [registerUser, setRegisterUser] = useState();
    const [totalWeight, setTotalWeight] = useState();

    // render chart
    const [isRender, setIsRender] = useState(false);


    useEffect(() => {


        getoverData();
        getComplaints();
        getAtendence();
        getRegisteredUsers()


    }, [])


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


    // function render() {
    //     if (overData) {
    //         var sCol = {
    //             chart: {
    //                 height: 400,
    //                 type: 'bar',
    //                 toolbar: {
    //                     show: false,
    //                 }
    //             },
    //             plotOptions: {
    //                 bar: {
    //                     horizontal: false,
    //                     columnWidth: '25%',
    //                     endingShape: 'rounded'
    //                 },
    //             },
    //             // colors: ['#888ea8', '#4361ee'],
    //             dataLabels: {
    //                 enabled: false
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 2,
    //                 colors: ['transparent']
    //             },
    //             series: [{
    //                 name: 'bio',
    //                 data: [overData?.bio]
    //             },
    //             {
    //                 name: 'non-bio',
    //                 data: [overData?.non_bio]
    //             },

    //             {
    //                 name: 'hazard',
    //                 data: [overData?.hazard]
    //             },


    //             ],
    //             xaxis: {
    //                 categories: ['Garbage collection Chart'],
    //             },
    //             yaxis: {
    //                 title: {
    //                     text: 'Kg'
    //                 }
    //             },
    //             fill: {
    //                 opacity: 1

    //             },
    //             tooltip: {
    //                 y: {
    //                     formatter: function (val) {
    //                         return + val + "Kg"
    //                     }
    //                 }
    //             }
    //         }

    //         var chart = new ApexCharts(
    //             document.querySelector("#g-col"),
    //             sCol
    //         );

    //         chart.render();
    //     }

    // }


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

    return (

        <>


            <div class="content">
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-12" >
                        <h1>Dashboard</h1>
                        {/* <span style={{color: "#E04A3C;"}}>Das</span><span style={{color: "#4A8AF4"}}>hbo</span><span   style={{color: "#16A25E"}}>ard</span>  */}
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count">
                                            <div class="dash-counts">
                                                <h5> {parseFloat(overData?.total) < 1000 ? parseFloat(overData?.total) : (parseFloat(overData?.total) / 1000)}{" "}
                                                    {parseFloat(overData?.total) < 1000 ? "Kg" : "Ton"} of total waste</h5>

                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="shopping-cart"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das3">
                                            <div class="dash-counts">
                                                <h5>{overData?.non_bio} kg of Degradable waste</h5>
                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="clipboard"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das2">
                                            <div class="dash-counts">
                                                <h5>{overData?.bio} kg of Bio Degradable waste</h5>
                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="archive"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das1">
                                            <div class="dash-counts">
                                                <h5>{overData?.hazard}  Kg of Hazard waste</h5>

                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="shopping-bag"></i>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-4 col-5">
                                                        <img class="img-responsive" src="assets/img/customer-review.png"
                                                        // style={{height:60}} alt="" 
                                                        />
                                                    </div>
                                                    <div class="col-md-8 col-7">
                                                        <h3>
                                                            <CountUp
                                                                end={registerUser?.user_count}
                                                            />

                                                            {/* <span class="counters" data-coun    t={registerUser?.user_count || 0}>{registerUser?.user_count || 0}</span> */}
                                                        </h3>
                                                        <h4>User Registration</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-4 col-5">
                                                        <img class="img-responsive" src="assets/img/complain.png"
                                                            // style="height: 60px;"
                                                            alt="" />
                                                    </div>
                                                    <div class="col-md-8 col-7">
                                                        <h3>
                                                            {/* <span class="counters" 
                                                            data-count={compData?.total? compData?.total : 0.00}
                                                            ></span> */}
                                                            <CountUp end={compData?.total ? compData?.total : 0.00} />
                                                        </h3>
                                                        <h4> Ward Complaints</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-4 col-5">
                                                        <img class="img-responsive" src="assets/img/shopping-cart.png"
                                                            // style="height: 60px;" 
                                                            alt="" />
                                                    </div>
                                                    <div class="col-md-8 col-7">
                                                        <h3>
                                                            <span >
                                                                <CountUp
                                                                    end={parseFloat(overData?.total) < 1000 ? parseFloat(overData?.total) : (parseFloat(overData?.total) / 1000)}
                                                                />
                                                                {" "}{parseFloat(overData?.total) < 1000 ? "Kg" : "Ton"}
                                                            </span>
                                                        </h3>
                                                        <h4>Garbage Wastages</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="card">
                                <div class="card-body">
                                    <h2
                                    //  style="color: black;"
                                    >Overall Statistics</h2>
                                    <ul class="nav nav-pills"
                                    // style="margin-top: 20px;" 
                                    >
                                        <li class="active">
                                            {/* <a href="#today" data-toggle="pill">Today</a> */}
                                        </li>
                                        {/* <li>
                                            <a href="#weekly" data-toggle="pill">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="#monthly" data-toggle="pill">Monthly</a>
                                        </li>
                                        <li>
                                            <a href="#lastyear" data-toggle="pill">Last Year</a>
                                        </li> */}
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="today">
                                            <div class="card-header">
                                                {/* <h5 class="card-title">Column Chart</h5> */}
                                            </div>
                                            <div class="card-body" style={{width:500}}>
                                                <Pie data={data} 
                                                arc={20}
                                                // width={50} height={50}
                                                // height={2000}
                                                //     width={2000}
                                                     />
                                                {/* <div id="g-col" class="chart-set"></div> */}

                                                {/* <ChartA type='Pie' data={data} /> */}
                                            </div>
                                        </div>
                                        {/* <div class="tab-pane" id="weekly">

                                        </div>
                                        <div class="tab-pane" id="monthly">

                                        </div>
                                        <div class="tab-pane" id="lastyear">

                                        </div> */}
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div class="row">
                            {/* <div class="col-md-4 col-sm-12 col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h2>Pie Chart Example</h2>
                                        <canvas id="pieChart" width="400" height="400"></canvas>
                                    </div>
                                </div>
                            </div> */}


                            <div class="col-md-12 col-sm-12 col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h2>Attendance</h2>
                                        <ul class="nav nav-pills"
                                            style={{ marginTop: 20 }}
                                        >

                                            {/* <li>
                                                <a href="#Shift" data-toggle="pill">Shift 3</a>
                                            </li> */}
                                        </ul>
                                        <div class="tab-content">

                                            <div class="" id="Shift">
                                                <br />
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr class="table-info">

                                                                <th>Employee</th>
                                                                <th>Role</th>
                                                                <th>Timing</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {worker?.map((e, index) => (
                                                                <tr key={index}>

                                                                    <td>{e?.name}</td>
                                                                    <td>{e?.role_name}</td>
                                                                    <td>{e?.clock_in ? e.clock_in : "0.00"}</td>
                                                                    <td>{e?.present ? "present" : "absent"}</td>
                                                                </tr>
                                                            )
                                                            )}



                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* <div>
            <Pie data={data} />
            </div> */}

        </>
    )
}



export default OverView