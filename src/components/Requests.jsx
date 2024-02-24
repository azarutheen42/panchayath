



function Requests(props) {


    return (

        <>

        {  props?.path === "list" &&(

        
            <>
  
            <div class="content">
                <div class="page-header">
                    <h4>Request List</h4>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3 col-lg-3 col-xs-8">
                                <div class="form-group">
                                 <label for="fromDate">Ward No :</label>
                               <select name="" id="" className="custom-dropdown">
                                                <option value="">01</option>
                                                <option value="">02</option>
                                                <option value="">03</option>
                                            </select>
                                </div>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xs-4">
                               
                                <div class="form-group">
                                    <label for="fromDate" style={{ color: "white" }}>Search :</label>
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
                                    <label for="fromDate" style={{ color: "white" }}>Next :</label>
                                    <button class="btn btn-success" onclick="getReport()">Get</button>
                                </div>
                            </div>
                           
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                <tr class="table-info">
                                    <th>S NO</th>
                                    <th>Request ID</th>
                                    <th>Date</th>
                                    <th>Ward No</th>
                                    <th>Request Type</th>
                                    <th>Address </th>
                                    <th>Details </th>
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
      
            
            </>
        )}
            {props?.path === "public-toilet" && (


                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Public Toilet Request</h4>

                        </div>

                    </div>

                    <div class="tab-pane active" id="compl">

                        <div class="tab-content">
                            <div class="tab-pane active" id="public">
                                <br />
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label style={{ color: "grey" }}> Name : <span class="form-required">*</span></label>
                                                    <input type="hidden" class="form-control" name="" value="" />
                                                    <input type="text" class="form-control" name="" value="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label style={{ color: "grey" }}>Ward No : <span class="form-required">*</span></label>
                                                    <select name="" id="" className="custom-dropdown"
                                                  
                                                    >
                                                        <option value="">01</option>
                                                        <option value="">02</option>
                                                        <option value="">03</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">

                               
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Address : <span class="form-required">*</span></label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Details :</label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row">

                                     
                                        <div class="col-lg-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Images : <span class="form-required">*</span></label>
                                                <input type="file" class="form-control" id="fileInput" multiple accept="image/*" onchange="handleFiles(this.files)" />
                                                <div id="preview"></div>
                                            </div>
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
                        {/* <div class="tab-pane fade" id="specific">
                            <br />
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}> Name : <span class="form-required">*</span></label>
                                                <input type="hidden" class="form-control" name="" value="" />
                                                <input type="text" class="form-control" name="" value="" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Ward No : <span class="form-required">*</span></label>
                                                <input type="text" class="form-control" name="" value="" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Address : <span class="form-required">*</span></label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Details :</label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Images : <span class="form-required">*</span></label>
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
                        </div> */}

                    </div>
                </div>

            )}



            {props?.path === "tank-cleaning" && (


                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Specific Tank Cleaning Request</h4>

                        </div>

                    </div>

                    <div class="tab-pane active" id="compl">

                        <div class="tab-content">
                            <div class="tab-pane active" id="public">
                                <br />
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label style={{ color: "grey" }}> Name : <span class="form-required">*</span></label>
                                                    <input type="hidden" class="form-control" name="" value="" />
                                                    <input type="text" class="form-control" name="" value="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label style={{ color: "grey" }}>Ward No : <span class="form-required">*</span></label>
                                                    <select name="" id="" className="custom-dropdown"
                                                    
                                                    >
                                                        <option value="">01</option>
                                                        <option value="">02</option>
                                                        <option value="">03</option>
                                                    </select>
                                                </div>
                                            </div>
                                   
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Address : <span class="form-required">*</span></label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Details :</label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Images : <span class="form-required">*</span></label>
                                                <input type="file" class="form-control" id="fileInput" multiple accept="image/*" onchange="handleFiles(this.files)" />
                                                <div id="preview"></div>
                                            </div>
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
                        {/* <div class="tab-pane fade" id="specific">
                            <br />
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}> Name : <span class="form-required">*</span></label>
                                                <input type="hidden" class="form-control" name="" value="" />
                                                <input type="text" class="form-control" name="" value="" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Ward No : <span class="form-required">*</span></label>
                                                <input type="text" class="form-control" name="" value="" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Address : <span class="form-required">*</span></label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Details :</label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label style={{ color: "grey" }}>Request Images : <span class="form-required">*</span></label>
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
                        </div> */}

                    </div>
                </div>

            )}


        </>
    )


}

export default Requests;
