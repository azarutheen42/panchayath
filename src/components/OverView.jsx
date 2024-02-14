





function OverView() {



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
                                                <h5>Yesterday's Weighing</h5>

                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="shopping-cart"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das1">
                                            <div class="dash-counts">
                                                <h5>20 Tons of Total waste</h5>

                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="shopping-bag"></i>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das2">
                                            <div class="dash-counts">
                                                <h5>15 Tons of Bio Degradable waste</h5>
                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="archive"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12 d-flex">
                                        <div class="dash-count das3">
                                            <div class="dash-counts">
                                                <h5>5 Tons of Degradable waste</h5>
                                            </div>
                                            <div class="dash-imgs">
                                                <i data-feather="clipboard"></i>
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
                                                            <span class="counters" data-count="3000">3000</span>
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
                                                            <span class="counters" data-count="210">210</span>
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
                                                            <span class="counters" data-count="300">300 Ton</span>
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
                                            <a href="#today" data-toggle="pill">Today</a>
                                        </li>
                                        <li>
                                            <a href="#weekly" data-toggle="pill">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="#monthly" data-toggle="pill">Monthly</a>
                                        </li>
                                        <li>
                                            <a href="#lastyear" data-toggle="pill">Last Year</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="today">
                                            <div class="card-header">
                                                <h5 class="card-title">Column Chart</h5>
                                            </div>
                                            <div class="card-body">
                                                <div id="s-col" class="chart-set"></div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="weekly">

                                        </div>
                                        <div class="tab-pane" id="monthly">

                                        </div>
                                        <div class="tab-pane" id="lastyear">

                                        </div>
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
                                            <li class="active">
                                                <a href="#permanent" data-toggle="pill">Shift 1</a>
                                            </li>
                                            <li>
                                                <a href="#contract" data-toggle="pill">Shift 2</a>
                                            </li>
                                            <li>
                                                <a href="#Shift" data-toggle="pill">Shift 3</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="permanent">
                                                <br />
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr class="table-info">

                                                                <th>Employee</th>
                                                                <th>Shift</th>
                                                                <th>Timing</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>

                                                                <td>Nandhini</td>
                                                                <td>Shift 1</td>
                                                                <td>6.00 AM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Vignesh</td>
                                                                <td>Shift 1</td>
                                                                <td>6.00 AM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Nithya</td>
                                                                <td>Shift 1</td>
                                                                <td>6.00 AM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Deepa</td>
                                                                <td>Shift 1</td>
                                                                <td>6.00 AM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Muthu</td>
                                                                <td>Shift 1</td>
                                                                <td>6.00 AM</td>
                                                                <td>Punched</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="contract">
                                                <br />
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr class="table-info">

                                                                <th>Employee</th>
                                                                <th>Shift</th>
                                                                <th>Timing</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>

                                                                <td>Abi</td>
                                                                <td>Shift 2</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Anu</td>
                                                                <td>Shift 2</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Indhu</td>
                                                                <td>Shift 2</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Jefrin</td>
                                                                <td>Shift 2</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Udhaya</td>
                                                                <td>Shift 2</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="Shift">
                                                <br />
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr class="table-info">

                                                                <th>Employee</th>
                                                                <th>Shift</th>
                                                                <th>Timing</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>

                                                                <td>Thiru</td>
                                                                <td>Shift 3</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Akshaya</td>
                                                                <td>Shift 3</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Siva</td>
                                                                <td>Shift 3</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Banu</td>
                                                                <td>Shift 3</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>
                                                            <tr>

                                                                <td>Magesh</td>
                                                                <td>Shift 3</td>
                                                                <td>6.00 PM</td>
                                                                <td>Punched</td>
                                                            </tr>

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

        </>
    )
}



export default OverView