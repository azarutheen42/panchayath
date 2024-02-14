
import OverView from "./OverView"
import SideBar from "./SideBar"
import Header from "./Header"
import { useEffect, useState } from "react"
import Config from "../auth/login"
import Garbage from "./Garbage"
import Complaint from "./Complaint"

function Dashboard() {

    const url = window.location.pathname

    const [path, setpath] = useState()

    console.log(url)

    useEffect(() => {

        setpath(url)
    }, [])



    console.log(Config?.token, path)
    return (

        <>

            {/* <div id="global-loader">
                <div class="whirly-loader"></div>
            </div> */}
            <div className="main-wrapper">

                <SideBar
                    path={path}
                    setpath={setpath}
                />
                <Header />

                <div className="page-wrapper">
                    {path === "/dashboard" ?
                        <OverView />
                        :
                        path === "/register" ?
                            <div class="content">
                                <div class="row">
                                    <div class="col-md-9 col-lg-9">
                                        <h1>Admin Registration</h1>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}> Select District :</label>
                                                        <select name="" id=""
                                                        //  style="width: 100%;height: 40px;border:1px solid #D7DEE6;"
                                                        >
                                                            <option value="">Tenkasi</option>
                                                            <option value="">Tirunelveli</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}> Select Panchayat :</label>
                                                        <select name="" id=""
                                                        //  style="width: 100%;height: 40px;border:1px solid #D7DEE6;"
                                                        >
                                                            <option value="">Ayikudy</option>
                                                            <option value="">Melagaram</option>
                                                            <option value="">coutrallam</option>
                                                            <option value="">Ilanji</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}> EO Name :</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}> Contact No :</label>
                                                        <input type="number" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}> Email :</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}>Create pin :</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}>Confirm Pin :</label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <div class="form-group">
                                                        <label style={{ color: "grey" }}>Address :</label>
                                                        <textarea name="" id="" cols="30" rows="2" class="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-3 col-12">
                                                    <button class="btn btn-success">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            :

                            path === "/Panchayat-register" ?

                                <div class="content">
                                    <div class="row">
                                        <div class="col-md-9 col-lg-9">
                                            <h1>Panchayat Registration</h1>

                                        </div>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}> Select District :</label>
                                                            <select name="" id=""
                                                            // style="width: 100%;height: 40px;border:1px solid #D7DEE6;"
                                                            >
                                                                <option value="">Tenkasi</option>
                                                                <option value="">Tirunelveli</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}> Select Panchayat :</label>
                                                            <select name="" id=""
                                                            //  style="width: 100%;height: 40px;border:1px solid #D7DEE6;" 
                                                            >
                                                                <option value="">Ayikudy</option>
                                                                <option value="">Melagaram</option>
                                                                <option value="">coutrallam</option>
                                                                <option value="">Ilanji</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}> Name :</label>
                                                            <input type="text" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}> Contact No :</label>
                                                            <input type="number" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}> Email :</label>
                                                            <input type="text" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}>Lattitude :</label>
                                                            <input type="text" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}>Longitude :</label>
                                                            <input type="text" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <div class="form-group">
                                                            <label style={{ color: "grey" }}>Address :</label>
                                                            <textarea name="" id="" cols="30" rows="2" class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-sm-3 col-12">
                                                        <button class="btn btn-success">Submit</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>


                                :
                                path === "/street-collector" ?

                                    <div class="content">
                                        <div class="page-header">
                                            <div class="page-title">
                                                <h4>Steet Collector Details</h4>
                                            </div>
                                            <div class="page-btn">
                                                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                    <span class="glyphicon glyphicon-user"></span> Add Street collector
                                                </button>
                                                <div id="myModal" class="modal fade" role="dialog">
                                                    <div class="modal-dialog modal-lg modal-dialog-centered">

                                                        <div class="modal-content">

                                                            <form action="" method="post"  id="">
                                                                <h3
                                                                    style={{ marginLeft: 20 }}
                                                                //  style="margin-left: 20px;"
                                                                >Street collector Details</h3>
                                                                <div class="modal-body">
                                                                    <div class="card">
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label class="form-head">Street collector Name : <span style={{ color: "red" }}>*</span></label>
                                                                                        <input type="text" class="form-control" name="category_name" />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label class="form-head">Ward No : <span style={{ color: "red" }}>*</span></label>
                                                                                        <select name="" id=""
                                                                                            style={{ width: 100, height: 40 }}
                                                                                        //  style="width:100%;height:40px;border:1px solid gray;" 
                                                                                        >
                                                                                            <option value="">01</option>
                                                                                            <option value="">02</option>
                                                                                            <option value="">03</option>
                                                                                            <option value="">04</option>
                                                                                            <option value="">05</option>
                                                                                        </select>

                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label class="form-head">Contact No : <span style={{ color: "red" }}>*</span></label>
                                                                                        <input type="number" class="form-control" name="category_code" />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label class="form-head">Description :</label>
                                                                                        <input type="text" class="form-control" name="category_desc" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="submit" class="btn btn-success">Save</button>
                                                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>


                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <tr class="table-info">
                                                            <th class="text-center">S.No</th>
                                                            <th class="text-center">Street collector Name</th>
                                                            <th class="text-center">Ward No</th>
                                                            <th class="text-center">Contact No</th>
                                                            <th class="text-center">Description</th>
                                                            <th class="text-center">Action</th>
                                                        </tr>
                                                        <tr>
                                                            <td>1 </td>
                                                            <td>Siva</td>
                                                            <td>03</td>
                                                            <td>9790244626</td>
                                                            <td>Street Collecor</td>
                                                            <td>
                                                                <button class="btn btn-success">
                                                                    <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                </button>
                                                                <button class="btn btn-info">
                                                                    <span class="glyphicon glyphicon-eye-open"></span> View
                                                                </button>
                                                                <button class="btn btn-danger">
                                                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>2 </td>
                                                            <td>Jeeva</td>
                                                            <td>07</td>
                                                            <td>9790123456</td>
                                                            <td>Street Collecor</td>
                                                            <td>
                                                                <button class="btn btn-success">
                                                                    <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                </button>
                                                                <button class="btn btn-info">
                                                                    <span class="glyphicon glyphicon-eye-open"></span> View
                                                                </button>
                                                                <button class="btn btn-danger">
                                                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>3 </td>
                                                            <td>Siva</td>
                                                            <td>02</td>
                                                            <td>1234567890</td>
                                                            <td>Street Collecor</td>
                                                            <td>
                                                                <button class="btn btn-success">
                                                                    <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                </button>
                                                                <button class="btn btn-info">
                                                                    <span class="glyphicon glyphicon-eye-open"></span> View
                                                                </button>
                                                                <button class="btn btn-danger">
                                                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    :
                                    path === "/shop-collector" ?

                                        <div class="content">
                                            <div class="page-header">
                                                <div class="page-title">
                                                    <h4>Shop Collector Details</h4>
                                                </div>
                                                <div class="page-btn">
                                                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                        <span class="glyphicon glyphicon-user"></span> Add Shop collector
                                                    </button>
                                                    <div id="myModal" class="modal fade" role="dialog">
                                                        <div class="modal-dialog modal-lg modal-dialog-centered">

                                                            <div class="modal-content">

                                                                <form action="" method="post"  id="">
                                                                    <h3 style={{ marginLeft: 20 }}
                                                                    // style="margin-left: 20px;"
                                                                    >Shop collector Details</h3>
                                                                    <div class="modal-body">
                                                                        <div class="card">
                                                                            <div class="card-body">
                                                                                <div class="row">
                                                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label class="form-head">Shop collector Name : <span style={{ color: "red" }}>*</span></label>
                                                                                            <input type="text" class="form-control" name="category_name" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label class="form-head">Ward No : <span style={{ color: "red" }}>*</span></label>
                                                                                            <select name="" id=""
                                                                                            //  style="width:100%;height:40px;border:1px solid gray;"
                                                                                            >
                                                                                                <option value="">01</option>
                                                                                                <option value="">02</option>
                                                                                                <option value="">03</option>
                                                                                                <option value="">04</option>
                                                                                                <option value="">05</option>
                                                                                            </select>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label class="form-head">Contact No : <span style={{ color: "red" }}>*</span></label>
                                                                                            <input type="number" class="form-control" name="category_code" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label class="form-head">Description :</label>
                                                                                            <input type="text" class="form-control" name="category_desc" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="submit" class="btn btn-success">Save</button>
                                                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="table-responsive">
                                                        <table class="table table-bordered">
                                                            <tr class="table-info">
                                                                <th class="text-center">S.No</th>
                                                                <th class="text-center">Shop collector Name</th>
                                                                <th class="text-center">Ward No</th>
                                                                <th class="text-center">Contact No</th>
                                                                <th class="text-center">Description</th>
                                                                <th class="text-center">Action</th>
                                                            </tr>
                                                            <tr>
                                                                <td>1 </td>
                                                                <td>Siva</td>
                                                                <td>03</td>
                                                                <td>9790244626</td>
                                                                <td>Shop Collecor</td>
                                                                <td>
                                                                    <button class="btn btn-success">
                                                                        <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                    </button>
                                                                    <button class="btn btn-info">
                                                                        <span class="glyphicon glyphicon-eye-open"></span> View
                                                                    </button>
                                                                    <button class="btn btn-danger">
                                                                        <span class="glyphicon glyphicon-trash"></span> Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2 </td>
                                                                <td>Jeeva</td>
                                                                <td>07</td>
                                                                <td>9790123456</td>
                                                                <td>Shop Collecor</td>
                                                                <td>
                                                                    <button class="btn btn-success">
                                                                        <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                    </button>
                                                                    <button class="btn btn-info">
                                                                        <span class="glyphicon glyphicon-eye-open"></span> View
                                                                    </button>
                                                                    <button class="btn btn-danger">
                                                                        <span class="glyphicon glyphicon-trash"></span> Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>3 </td>
                                                                <td>Siva</td>
                                                                <td>02</td>
                                                                <td>1234567890</td>
                                                                <td>Shop Collecor</td>
                                                                <td>
                                                                    <button class="btn btn-success">
                                                                        <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                    </button>
                                                                    <button class="btn btn-info">
                                                                        <span class="glyphicon glyphicon-eye-open"></span> View
                                                                    </button>
                                                                    <button class="btn btn-danger">
                                                                        <span class="glyphicon glyphicon-trash"></span> Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        :

                                        path === "/tractor-collector" ?

                                            <div class="content">
                                                <div class="page-header">
                                                    <div class="page-title">
                                                        <h4>Tractor Collector Details</h4>
                                                    </div>
                                                    <div class="page-btn">
                                                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                            <span class="glyphicon glyphicon-user"></span> Add Tractor collector
                                                        </button>
                                                        <div id="myModal" class="modal fade" role="dialog">
                                                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                                                <div class="modal-content">

                                                                    <form action="" method="post"  id="">
                                                                        <h3
                                                                        // style="margin-left: 20px;"
                                                                        >Tractor collector Details</h3>
                                                                        <div class="modal-body">
                                                                            <div class="card">
                                                                                <div class="card-body">
                                                                                    <div class="row">
                                                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label class="form-head">Tractor collector Name : <span style={{ color: "red" }}>*</span></label>
                                                                                                <input type="text" class="form-control" name="category_name" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label class="form-head">Ward No : <span style={{ color: "red" }}>*</span></label>
                                                                                                <select name="" id=""
                                                                                                //  style="width:100%;height:40px;border:1px solid gray;"
                                                                                                >
                                                                                                    <option value="">01</option>
                                                                                                    <option value="">02</option>
                                                                                                    <option value="">03</option>
                                                                                                    <option value="">04</option>
                                                                                                    <option value="">05</option>
                                                                                                </select>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label class="form-head">Contact No : <span style={{ color: "red" }}>*</span></label>
                                                                                                <input type="number" class="form-control" name="category_code" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label class="form-head">Tractor No : <span style={{ color: "red" }}>*</span></label>
                                                                                                <input type="number" class="form-control" name="category_code" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label class="form-head">Description :</label>
                                                                                                <input type="text" class="form-control" name="category_desc" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="submit" class="btn btn-success">Save</button>
                                                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered">
                                                                <tr class="table-info">
                                                                    <th class="text-center">S.No</th>
                                                                    <th class="text-center">Tractor collector Name</th>
                                                                    <th class="text-center">Ward No</th>
                                                                    <th class="text-center">Tractor No</th>
                                                                    <th class="text-center">Contact No</th>
                                                                    <th class="text-center">Description</th>
                                                                    <th class="text-center">Action</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>1 </td>
                                                                    <td>Ananth</td>
                                                                    <td>12</td>
                                                                    <td>TN 76 A 1515</td>
                                                                    <td>9790244626</td>
                                                                    <td>Tractor Collecor</td>
                                                                    <td>
                                                                        <button class="btn btn-success">
                                                                            <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                        </button>
                                                                        <button class="btn btn-info">
                                                                            <span class="glyphicon glyphicon-eye-open"></span> View
                                                                        </button>
                                                                        <button class="btn btn-danger">
                                                                            <span class="glyphicon glyphicon-trash"></span> Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2 </td>
                                                                    <td>Jeeva</td>
                                                                    <td>04</td>
                                                                    <td>TN 72 B 5555</td>
                                                                    <td>9790123456</td>
                                                                    <td>Tractor Collecor</td>
                                                                    <td>
                                                                        <button class="btn btn-success">
                                                                            <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                        </button>
                                                                        <button class="btn btn-info">
                                                                            <span class="glyphicon glyphicon-eye-open"></span> View
                                                                        </button>
                                                                        <button class="btn btn-danger">
                                                                            <span class="glyphicon glyphicon-trash"></span> Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3 </td>
                                                                    <td>Siva</td>
                                                                    <td>11</td>
                                                                    <td>TN 69 A 1111</td>
                                                                    <td>1234567890</td>
                                                                    <td>Tractor Collecor</td>
                                                                    <td>
                                                                        <button class="btn btn-success">
                                                                            <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                        </button>
                                                                        <button class="btn btn-info">
                                                                            <span class="glyphicon glyphicon-eye-open"></span> View
                                                                        </button>
                                                                        <button class="btn btn-danger">
                                                                            <span class="glyphicon glyphicon-trash"></span> Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            :
                                            path === "/overall-collector" ?

                                                <div class="content">
                                                    <div class="page-header">
                                                        <div class="page-title">
                                                            <h4>Tractor Collector Details</h4>
                                                        </div>
                                                        <div class="page-btn">
                                                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                                <span class="glyphicon glyphicon-user"></span> Add collector
                                                            </button>
                                                            <div id="myModal" class="modal fade" role="dialog">
                                                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                                                    <div class="modal-content">

                                                                        <form action="" method="post"  id="">
                                                                            <h3

                                                                            >Tractor collector Details</h3>
                                                                            <div class="modal-body">
                                                                                <div class="card">
                                                                                    <div class="card-body">
                                                                                        <div class="row">
                                                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                                                <div class="form-group">
                                                                                                    <label class="form-head">Tractor collector Name : <span style={{ color: "red" }}>*</span></label>
                                                                                                    <input type="text" class="form-control" name="category_name" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                                                <div class="form-group">
                                                                                                    <label class="form-head">Ward No : <span style={{ color: "red" }}>*</span></label>
                                                                                                    <select name="" id=""
                                                                                                    // style="width:100%;height:40px;border:1px solid gray;"
                                                                                                    >
                                                                                                        <option value="">01</option>
                                                                                                        <option value="">02</option>
                                                                                                        <option value="">03</option>
                                                                                                        <option value="">04</option>
                                                                                                        <option value="">05</option>
                                                                                                    </select>

                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                                                <div class="form-group">
                                                                                                    <label class="form-head">Contact No : <span style={{ color: "red" }}>*</span></label>
                                                                                                    <input type="number" class="form-control" name="category_code" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                                                <div class="form-group">
                                                                                                    <label class="form-head">Description :</label>
                                                                                                    <input type="text" class="form-control" name="category_desc" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button type="submit" class="btn btn-success">Save</button>
                                                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered">
                                                                    <tr class="table-info">
                                                                        <th class="text-center">S.No</th>
                                                                        <th class="text-center">Name</th>
                                                                        <th class="text-center">Ward No</th>
                                                                        <th class="text-center">Total Weight</th>
                                                                        <th class="text-center">Action</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td >1 </td>
                                                                        <td>Siva</td>
                                                                        <td>12</td>
                                                                        <td>152 Ton</td>
                                                                        <td>
                                                                            <button class="btn btn-success">
                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                            </button>
                                                                            <button class="btn btn-info">
                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                            </button>
                                                                            <button class="btn btn-danger">
                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>2 </td>
                                                                        <td>Jeeva</td>
                                                                        <td>04</td>
                                                                        <td>120 Ton</td>
                                                                        <td>
                                                                            <button class="btn btn-success">
                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                            </button>
                                                                            <button class="btn btn-info">
                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                            </button>
                                                                            <button class="btn btn-danger">
                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>3 </td>
                                                                        <td>Nandhini</td>
                                                                        <td>11</td>
                                                                        <td>230 Ton</td>
                                                                        <td>
                                                                            <button class="btn btn-success">
                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                            </button>
                                                                            <button class="btn btn-info">
                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                            </button>
                                                                            <button class="btn btn-danger">
                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                :

                                                path === "/employee" ?


                                                    <div class="content">
                                                        <div class="page-header">
                                                            <div class="page-title">
                                                                <h4>Employee Management</h4>
                                                            </div>
                                                            <div class="page-btn">
                                                                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                                    <span class="glyphicon glyphicon-user"></span> Add Employee
                                                                </button>
                                                                <div id="myModal" class="modal fade" role="dialog">
                                                                    <div class="modal-dialog modal-lg modal-dialog-centered">

                                                                        <div class="modal-content">

                                                                            <form action="" method="post"  id="">
                                                                                <h3

                                                                                >Employee Details</h3>
                                                                                <div class="modal-body">
                                                                                    <div class="card">
                                                                                        <div class="card-body">
                                                                                            <div class="row">
                                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-head">Employee Name :</label>
                                                                                                        <input type="text" class="form-control" name="category_name" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-head">Employee Id :</label>
                                                                                                        <input type="text" class="form-control" name="category_code" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-head">Assign department :</label>
                                                                                                        <select name="" id="" class="form-control">
                                                                                                            <option value="">Engineer</option>
                                                                                                            <option value="">Supervisor</option>
                                                                                                            <option value="">Member</option>
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                                                    <div class="form-group">
                                                                                                        <label class="form-head">Mobile Number :</label>
                                                                                                        <input type="number" class="form-control" name="category_desc" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button type="submit" class="btn btn-success">Save</button>
                                                                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <ul class="nav nav-pills">
                                                                    <li class="active">
                                                                        <a href="#permanent" data-toggle="pill">Permanent Employee</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#contract" data-toggle="pill">Contract Employee</a>
                                                                    </li>
                                                                </ul>
                                                                <div class="tab-content">
                                                                    <div class="tab-pane active" id="permanent">
                                                                        <br />
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered">
                                                                                <thead>
                                                                                    <tr class="table-info">
                                                                                        <th>S.No</th>
                                                                                        <th>Name</th>
                                                                                        <th>Roll</th>
                                                                                        <th>Attendance</th>
                                                                                        <th>Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>1.</td>
                                                                                        <td>Nandhini</td>
                                                                                        <td>Cleaning</td>
                                                                                        <td>Active</td>
                                                                                        <td>
                                                                                            <button class="btn btn-success">
                                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                                            </button>
                                                                                            <button class="btn btn-info">
                                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                                            </button>
                                                                                            <button class="btn btn-danger">
                                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>2.</td>
                                                                                        <td>Nithya</td>
                                                                                        <td>Housekeeping</td>
                                                                                        <td>Active</td>
                                                                                        <td>
                                                                                            <button class="btn btn-success">
                                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                                            </button>
                                                                                            <button class="btn btn-info">
                                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                                            </button>
                                                                                            <button class="btn btn-danger">
                                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                                            </button>
                                                                                        </td>
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
                                                                                        <th>S.No</th>
                                                                                        <th>Name</th>
                                                                                        <th>Roll</th>
                                                                                        <th>Attendance</th>
                                                                                        <th>Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>1.</td>
                                                                                        <td>Nandhini</td>
                                                                                        <td>Cleaning</td>
                                                                                        <td>Active</td>
                                                                                        <td>
                                                                                            <button class="btn btn-success">
                                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                                            </button>
                                                                                            <button class="btn btn-info">
                                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                                            </button>
                                                                                            <button class="btn btn-danger">
                                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>2.</td>
                                                                                        <td>Nithya</td>
                                                                                        <td>Housekeeping</td>
                                                                                        <td>Active</td>
                                                                                        <td>
                                                                                            <button class="btn btn-success">
                                                                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                                                                            </button>
                                                                                            <button class="btn btn-info">
                                                                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                                                                            </button>
                                                                                            <button class="btn btn-danger">
                                                                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                                                                            </button>
                                                                                        </td>
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

                                                    :

                                                    path === "/user-register" ?

                                                        <div class="content">
                                                            <div class="row">
                                                                <div class="col-md-9 col-lg-9">
                                                                    <h1>Admin Registration</h1>


                                                                </div>
                                                                <div class="card">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head"> Select District :</label>
                                                                                    <select
                                                                                        name="" id=""
                                                                                    //    class="width: 100%;height: 40px;border:1px solid #D7DEE6;" 
                                                                                    >
                                                                                        <option value="">Tenkasi</option>
                                                                                        <option value="">Tirunelveli</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head"> Select Panchayat :</label>
                                                                                    <select name="" id=""
                                                                                    //   style="width: 100%;height: 40px;border:1px solid #D7DEE6;"
                                                                                    >
                                                                                        <option value="">Ayikudy</option>
                                                                                        <option value="">Melagaram</option>
                                                                                        <option value="">coutrallam</option>
                                                                                        <option value="">Ilanji</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head"> EO Name :</label>
                                                                                    <input type="text" class="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head"> Contact No :</label>
                                                                                    <input type="number" class="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head"> Email :</label>
                                                                                    <input type="text" class="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head">Create pin :</label>
                                                                                    <input type="text" class="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head">Confirm Pin :</label>
                                                                                    <input type="text" class="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <div class="form-group">
                                                                                    <label class="form-head">Address :</label>
                                                                                    <textarea name="" id="" cols="30" rows="2" class="form-control"></textarea>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-sm-3 col-12">
                                                                                <button class="btn btn-success">Submit</button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        :
                                                        <p></p>

                    }

                </div>

            </div>
        </>
    )
}








export default Dashboard