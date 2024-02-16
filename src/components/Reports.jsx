




function House(){


    return(
        <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>House Report Details</h4>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label 
                            style={{fontWeight:"bold"}}
                            
                            >District :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Tirunelveli</option>
                                <option value="">Tenkasi</option>
                                <option value="">Thoothukudi</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>City :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Melagaram</option>
                                <option value="">Sengotai</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Panchayat :</label>
                            <select name="" id=""  className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Coutrallam</option>
                                <option value="">Melagaram</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Ward No :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">01</option>
                                <option value="">02</option>
                                <option value="">03</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="row" style={{marginTop:5}}>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="fromDate" style={{fontWeight:"bold"}}>From Date :</label>
                            <input type="date" class="form-control" id="fromDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="toDate" style={{fontWeight:"bold"}}>To Date :</label>
                            <input type="date" class="form-control" id="toDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="search" style={{fontWeight:"bold"}}>Search :</label>
                            <button class="btn btn-success" onclick="getReport()">Get Report</button>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xs-6" style={{marginTop:5}}>
                        <br /><button class="btn btn-secondary" onclick="exportToExcel()">Export to Excel</button>
                        <button class="btn btn-secondary" onclick="exportToCSV()">Export to CSV</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6" style={{marginTop:5}}>
                        <br /><input type="text" class="form-control" id="searchInput" placeholder="Type to search" />
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th>S.No</th>
                                        <th>District</th>
                                        <th>City</th>
                                        <th>Panchayatht</th>
                                        <th>Ward No </th>
                                        <th>Date </th>

                                        <th>Bio in Kg </th>
                                        <th>Non-Bio in Kg</th>
                                        <th>Hazard in kg</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>Tirunelveli</td>
                                        <th>Palayankotai</th>
                                        <th>Palayankotai</th>
                                        <td>02</td>
                                        <td>12-12-23</td>

                                        <td>7</td>
                                        <td>3</td>
                                        <td>1</td>
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
        </div>
    </div>
    )
}


function Street(){


    return(
        <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>Ward Report Details</h4>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label 
                            style={{fontWeight:"bold"}}
                            
                            >District :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Tirunelveli</option>
                                <option value="">Tenkasi</option>
                                <option value="">Thoothukudi</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>City :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Melagaram</option>
                                <option value="">Sengotai</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Panchayat :</label>
                            <select name="" id=""  className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Coutrallam</option>
                                <option value="">Melagaram</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Ward No :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">01</option>
                                <option value="">02</option>
                                <option value="">03</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="row" style={{marginTop:5}}>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="fromDate" style={{fontWeight:"bold"}}>From Date :</label>
                            <input type="date" class="form-control" id="fromDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="toDate" style={{fontWeight:"bold"}}>To Date :</label>
                            <input type="date" class="form-control" id="toDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="search" style={{fontWeight:"bold"}}>Search :</label>
                            <button class="btn btn-success" onclick="getReport()">Get Report</button>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xs-6" style={{marginTop:5}}>
                        <br /><button class="btn btn-secondary" onclick="exportToExcel()">Export to Excel</button>
                        <button class="btn btn-secondary" onclick="exportToCSV()">Export to CSV</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6" style={{marginTop:5}}>
                        <br /><input type="text" class="form-control" id="searchInput" placeholder="Type to search" />
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th>S.No</th>
                                        <th>District</th>
                                        <th>City</th>
                                        <th>Panchayatht</th>
                                        <th>Ward No </th>
                                        <th>Date </th>

                                        <th>Bio in Kg </th>
                                        <th>Non-Bio in Kg</th>
                                        <th>Hazard in kg</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>Tirunelveli</td>
                                        <th>Palayankotai</th>
                                        <th>Palayankotai</th>
                                        <td>02</td>
                                        <td>12-12-23</td>

                                        <td>7</td>
                                        <td>3</td>
                                        <td>1</td>
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
        </div>
    </div>
    )
}




function Shop (){


    return(
        <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>Shop Report Details</h4>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label 
                            style={{fontWeight:"bold"}}
                  
                            >District :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Tirunelveli</option>
                                <option value="">Tenkasi</option>
                                <option value="">Thoothukudi</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>City :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Melagaram</option>
                                <option value="">Sengotai</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Panchayat :</label>
                            <select name="" id=""  className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Coutrallam</option>
                                <option value="">Melagaram</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Ward No :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">01</option>
                                <option value="">02</option>
                                <option value="">03</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="row" style={{marginTop:5}}>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="fromDate" style={{fontWeight:"bold"}}>From Date :</label>
                            <input type="date" class="form-control" id="fromDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="toDate" style={{fontWeight:"bold"}}>To Date :</label>
                            <input type="date" class="form-control" id="toDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="search" style={{fontWeight:"bold"}}>Search :</label>
                            <button class="btn btn-success" onclick="getReport()">Get Report</button>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xs-6" style={{marginTop:5}}>
                        <br /><button class="btn btn-secondary" onclick="exportToExcel()">Export to Excel</button>
                        <button class="btn btn-secondary" onclick="exportToCSV()">Export to CSV</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6" style={{marginTop:5}}>
                        <br /><input type="text" class="form-control" id="searchInput" placeholder="Type to search" />
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th>S.No</th>
                                        <th>District</th>
                                        <th>City</th>
                                        <th>Panchayatht</th>
                                        <th>Ward No </th>
                                        <th>Date </th>

                                        <th>Bio in Kg </th>
                                        <th>Non-Bio in Kg</th>
                                        <th>Hazard in kg</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>Tirunelveli</td>
                                        <th>Palayankotai</th>
                                        <th>Palayankotai</th>
                                        <td>02</td>
                                        <td>12-12-23</td>

                                        <td>7</td>
                                        <td>3</td>
                                        <td>1</td>
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
        </div>
    </div>
    )
}




function Overall(){


    return(
        <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>Overall Report Details</h4>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label 
                            style={{fontWeight:"bold"}}
                            
                            >District :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Tirunelveli</option>
                                <option value="">Tenkasi</option>
                                <option value="">Thoothukudi</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>City :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Melagaram</option>
                                <option value="">Sengotai</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Panchayat :</label>
                            <select name="" id=""  className="report-dropdown"
                            
                            >
                                <option value="">Ayikudy</option>
                                <option value="">Coutrallam</option>
                                <option value="">Melagaram</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                        <div class="form-group">
                            <label style={{fontWeight:"bold"}}>Ward No :</label>
                            <select name="" id=""   className="report-dropdown"
                            
                            >
                                <option value="">01</option>
                                <option value="">02</option>
                                <option value="">03</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="row" style={{marginTop:5}}>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="fromDate" style={{fontWeight:"bold"}}>From Date :</label>
                            <input type="date" class="form-control" id="fromDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="toDate" style={{fontWeight:"bold"}}>To Date :</label>
                            <input type="date" class="form-control" id="toDate" />
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-3">
                        <div class="form-group">
                            <label for="search" style={{fontWeight:"bold"}}>Search :</label>
                            <button class="btn btn-success" onclick="getReport()">Get Report</button>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xs-6" style={{marginTop:5}}>
                        <br /><button class="btn btn-secondary" onclick="exportToExcel()">Export to Excel</button>
                        <button class="btn btn-secondary" onclick="exportToCSV()">Export to CSV</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6" style={{marginTop:5}}>
                        <br /><input type="text" class="form-control" id="searchInput" placeholder="Type to search" />
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th>S.No</th>
                                        <th>District</th>
                                        <th>City</th>
                                        <th>Panchayatht</th>
                                        <th>Ward No </th>
                                        <th>Date </th>

                                        <th>Bio in Kg </th>
                                        <th>Non-Bio in Kg</th>
                                        <th>Hazard in kg</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>Tirunelveli</td>
                                        <th>Palayankotai</th>
                                        <th>Palayankotai</th>
                                        <td>02</td>
                                        <td>12-12-23</td>

                                        <td>7</td>
                                        <td>3</td>
                                        <td>1</td>
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
        </div>
    </div>
    )
}



function Reports(props) {


    return (
        <Content
        path={props?.path}
        />
       
    )
}

export default Reports;



function Content(props) {

    switch (props?.path) {
        case "house":
            return <House />
        case "street":
            return <Street />
        case "shop":
            return <Shop />
        case "overall":
            return <Overall />
        default:
            return <Overall />
    }

}
