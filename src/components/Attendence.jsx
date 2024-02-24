


function Attendance (){


    return (


        <>
          <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4>Attendance Details</h4>
                    </div>
                    
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
							<div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
								<div class="form-group">
									<label 
                                    // style="font-weight: bold;"
                                    >Employee Name :</label>
									<input type="text" class="form-control" />
								</div>
							</div>
							<div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
								<div class="form-group">
									<label for="fromDate" 
                                    // style="font-weight: bold;"
                                    >From Date :</label>
									<input type="date" class="form-control" id="fromDate" />
								</div>
							</div>
							<div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
								<div class="form-group">
									<label for="fromDate" 
                                    // style="font-weight: bold;"
                                    >To Date :</label>
									<input type="date" class="form-control" id="fromDate" />
								</div>
							</div>
							<div class="col-md-3 col-lg-3 col-xs-3 col-sm-6">
								<div class="form-group">
									<label for="search" 
                                    // style="font-weight: bold;"
                                    >Search :</label>
									<button class="btn btn-success" onclick="getReport()">Get Report</button>
								</div>
							</div>
							
						</div>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th>S.No</th>
                                        <th>Date </th>
                                        <th>Employee Name </th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>31-10-23</td>
                                        <td>Nithya</td>
                                        <td>9.00 AM</td>
                                        <td>6.00 PM</td>
                                        
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
                                        <td>1-11-23</td>
                                        <td>Deepa</td>
                                        <td>9.00 AM</td>
                                        <td>5.00 PM</td>
                                        
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
                                        <td>3.</td>
                                        <td>1-11-23</td>
                                        <td>Muthu</td>
                                        <td>8.00 AM</td>
                                        <td>4.00 PM</td>
                                        
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
                        <br />
                    </div>
                </div>
            </div>
            
   
        </>
    )
}


export default Attendance