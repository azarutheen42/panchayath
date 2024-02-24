import SideBar from "./SideBar"
import Header from "./Header"
import { useLocation } from "react-router-dom";





function List() {

    return (
        <div class="content">
            <div class="page-header">
                <h4>Complaints List</h4>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 col-lg-3 col-xs-8">
                            <div class="form-group">
                                <label for="fromDate">Ward No :</label>
                                <select name="" id="" className="custom-dropdown"

                                >
                                    <option value="">01</option>
                                    <option value="">02</option>
                                    <option value="">03</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xs-4">

                            <div class="form-group">
                                <label for="fromDate"
                                    style={{ color: "white" }}
                                >Search :</label>
                                <button class="btn btn-success" onclick="getReport()">Search</button>
                            </div>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xs-6">
                            <div class="form-group">
                                <label for="fromDate">From Date :</label>
                                <input type="date" class="form-control" id="fromDate" />
                            </div>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xs-6">
                            <div class="form-group">
                                <label for="toDate">To Date :</label>
                                <input type="date" class="form-control" id="toDate" />
                            </div>
                        </div>

                        <div class="col-md-3 col-lg-3 col-xs-6">

                            <div class="form-group">
                                <label for="fromDate"
                                    style={{ color: "white" }}
                                >Next :</label>
                                <button class="btn btn-success" onclick="getReport()">Get</button>
                            </div>
                        </div>

                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>


                                <tr ctdss="table-info">
                                    <td>S NO</td>
                                    <td>Complaint ID</td>
                                    <td>Date</td>
                                    <td>Ward No</td>
                                    <td>Complaint</td>
                                    <td>Complaint Address </td>
                                    <td>Complaint Details </td>
                                    <td>Complaint Image </td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>


                                <tr>
                                    <td>1</td>
                                    <td>001</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address</td>

                                    <td>details</td>
                                    <td>images</td>
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
                                    <td>2</td>
                                    <td>002</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address</td>

                                    <td>details</td>
                                    <td>images</td>
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
                                    <td>3</td>
                                    <td>003</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address </td>

                                    <td>details </td>
                                    <td>images</td>
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
        </div>
    )
}


function Status() {

    return (
        <div class="content">
            <div class="page-header">
                <h4>Complaints Status</h4>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 col-lg-3 col-xs-8">
                            <div class="form-group">
                                <label for="fromDate">Complaint ID :</label>
                                <select name="" id="" className="custom-dropdown">
                                    <option value="">Tirunelveli</option>
                                    <option value="">Tenkasi</option>
                                    <option value="">Thoothukudi</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-9 col-lg-9 col-xs-4">

                            <div class="form-group">
                                <label for="fromDate" style={{ color: "white" }}>Search :</label>
                                <button class="btn btn-success" onclick="getReport()">Search</button>
                            </div>
                        </div>


                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>


                                <tr class="table-info">
                                    <th>S NO</th>
                                    <th>Complaint ID</th>
                                    <th>Date</th>
                                    <th>Ward No</th>
                                    <th>Complaint</th>
                                    <th>Complaint Address </th>
                                    <th>Complaint Details </th>
                                    <th>Complaint Image </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>


                                <tr>
                                    <td>1</td>
                                    <td>001</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address</td>

                                    <td>details</td>
                                    <td>images</td>
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
                                    <td>2</td>
                                    <td>002</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address</td>

                                    <td>details</td>
                                    <td>images</td>
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
                                    <td>3</td>
                                    <td>003</td>
                                    <td>27-04-2023</td>
                                    <td>05</td>
                                    <td>Water </td>
                                    <td>address </td>

                                    <td>details </td>
                                    <td>images</td>
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
        </div>
    )
}




function Type(props) {


    const head = {
        "water-supply": "Water Supply",
        "street-light": "Street Light",
        "sanittion": "Sanitation",
        "solid-waste": "Solid Waste",
    }

    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>{head[props?.path]}</h4>

                </div>

            </div>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label style={{ color: "grey" }}> Name :</label>
                                <input type="hidden" class="form-control" name="" value="" />
                                <input type="text" class="form-control" name="" value="" />
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label style={{ color: "grey" }}>Ward No :</label>
                                <select name="" id="" className="custom-dropdown">
                                    <option value="">01</option>
                                    <option value="">02</option>
                                    <option value="">03</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label style={{ color: "grey" }}>Complaint Address :</label>
                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="form-group">
                                <label style={{ color: "grey" }}>Complaint Details :</label>
                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 col-12">
                            <div class="form-group">
                                <label style={{ color: "grey" }}>Complaint Images :</label>
                                <input type="file" class="form-control" id="fileInput" multiple accept="image/*" onchange="handleFiles(this.files)" />
                                <div id="preview"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="card-footer">
                    <button class="btn btn-success">Submit</button>
                    <button class="btn btn-danger">Cancel</button>
                </div>
            </div>


        </div>
    )
}


function Content(props) {

    switch (props?.path) {
        case "list":
            return <List />
        case "status":
            return <Status />
        default:
            return <Type
                path={props?.path}
            />
    }

}

function Complaint(props) {

    return (
        <>

            <Content
                path={props?.path}
            />
        </>
    )
}






export default Complaint;