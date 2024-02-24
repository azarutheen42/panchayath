

function Settings(props) {

    return (

        <>
        
        {props?.path==="permissions" && (

        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Government Permission</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add permission
                    </button>
                    <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog modal-lg modal-dialog-centered">

                            <div class="modal-content">

                                <form action="" method="post"  id="">
                                    <h3 style={{ marginLeft: 20 }}>Give Permissions</h3>
                                    <div class="modal-body">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label>Roles : </label>
                                                            <select name="" id="" 
                                                            className="report-dropdown"
                                                            // style="width: 100%;height:35px;border:1px solid #D7DEE6;border-radius:4px;"
                                                            >
                                                                <option value="">Editor</option>
                                                                <option value="">Admin</option>
                                                                <option value="">viewer</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="form-check mb-2 mt-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> Dashboard</label>
                                                    </div>
                                                    <div class="form-check mb-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> Employees</label>
                                                    </div>
                                                    <div class="form-check mb-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> complaint</label>
                                                    </div>
                                                    <div class="form-check mb-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> Request</label>
                                                    </div>
                                                    <div class="form-check mb-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> Reports</label>
                                                    </div>
                                                    <div class="form-check mb-2">
                                                        <input type="checkbox" class="form-check-input" id="check1" value="" />
                                                        <label class="form-check-label" for="check1"> Activity</label>
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
                    <div class="row">
                        <div class="col-md-3 col-lg-3 col-xs-6 col-12">


                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xs-6 col-12"></div>
                    <div class="col-md-3 col-lg-4 col-xs-6 col-12"></div>
                    <div class="col-md-3 col-lg-2 col-xs-6 col-12">

                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">
                                <th>S.No</th>
                                {/* <th></th> */}
                                <th>Menu </th>
                                <th>Access </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>Ayikudy</td>

                                <td><input type="checkbox" /><lable>&nbsp; Admin</lable><br/>
										<input type="checkbox" /><lable>&nbsp; EO</lable><br/>
										<input type="checkbox"/><lable> &nbsp;Workers</lable>
								</td>

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
            <br />
        </div>
  )}

        {props?.path==="roles" && (      

        <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4> Roles Details</h4>
                    </div>
                    <div class="page-btn">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
							<span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Roles
						</button>
                        <div id="myModal" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                               
                                <div class="modal-content">
                                    
                                    <form action="" method="post"  id="">
                                        <h3 style={{ marginLeft: 20 }}>Create Roles</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Roles : <span class="form-required">*</span></label> 
                                                                <input type="text" class="form-control" name="category_name" required />
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
								<thead>
									<tr class="table-info">
										<th>S.No</th>
										<th>Role </th>
									
										
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Admin</td>
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
										<td>Editor</td>
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
                        <br/>
                    </div>
                </div>
            </div>
  )}

            {props?.path==="menu" && (

            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4> Menu's Details</h4>
                    </div>
                    <div class="page-btn">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
							<span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Menu's
						</button>
                        <div id="myModal" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                             
                                <div class="modal-content">
                              
                                    <form action="" method="post"  id="">
                                        <h3 style={{ marginLeft: 20 }}>Create Menu's</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Menu's : <span class="form-required">*</span></label> 
                                                                <input type="text" class="form-control" name="category_name" required />
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
								<thead>
									<tr class="table-info">
										<th>S.No</th>
										<th>Menu's </th>
									
										
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1.</td>
										<td>Admin</td>
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
                        <br/>
                    </div>
                </div>
            </div>
              )}

        </>

    )

}

export default Settings;