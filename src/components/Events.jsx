



function Events(props) {
    return (
        <>


            {props?.path === "minutes-of-meeting" && (

                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Minutes of Meeting Details</h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add meeting
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        <form action="" method="post"  id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Minute Of Meeting </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Date : <span class="form-required">*</span></label>
                                                                    <input type="date" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Time : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Subject : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_code" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Place : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Held By : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Meeting Details :</label>
                                                                    <textarea cols="30" rows="1"></textarea>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Subject</th>
                                            <th>Place</th>
                                            <th>Held by</th>
                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>1.</td>
                                            <td>01-11-23</td>
                                            <td>04.30 PM</td>
                                            <td>Panchayat Project</td>
                                            <td>Tenkasi</td>
                                            <td>Vinsup</td>
                                            <td>Project</td>
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
            )}


            {props?.path === "scheme" && (


                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4> Scheme Details</h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add scheme
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        <form action="" method="post"  id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Scheme </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Date : <span class="form-required">*</span></label>
                                                                    <input type="date" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Time : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Scheme Name : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_code" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Period : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Announced By : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Scheme Details :</label>
                                                                    <textarea cols="30" rows="1"></textarea>
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
                                            <th>Date </th>

                                            <th>Scheme Name</th>
                                            <th>Scheme period</th>
                                            <th>Announced by</th>
                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>31-10-23</td>

                                            <td>Park Improvement</td>
                                            <td>3 Months</td>
                                            <td>State Board</td>
                                            <td>park area</td>
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
            )}

            {props?.path === "events" && (

                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Events Details</h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Events
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        <form action="" method="post"  id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Events </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Date : <span class="form-required">*</span></label>
                                                                    <input type="date" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Time : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Event Name : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_code" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Place : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label"> Details :</label>
                                                                    <textarea cols="30" rows="1"></textarea>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Event Name</th>
                                            <th>Place</th>

                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>31-10-23</td>
                                            <td>05.30 PM</td>
                                            <td>Panchayat Project</td>
                                            <td>Ayikudy</td>

                                            <td>Discuss with Project</td>
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


            )}


            {props?.path === "public-notice" && (
                <div className="d-flex align-content-end flex-wrap">
                    <div>
                        <h3>No Data To Dispaly</h3>
                    </div>

                </div>
            )}


            {props?.path === "staff-notice" && (

                <div className="d-flex align-content-end flex-wrap">
                    <div>
                    <h3>No Data To Dispaly</h3>
                    </div>

                </div>
            )}


            {props?.path === "announcements" && (

                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Announcement Details</h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Announcement
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        <form action="" method="post"  id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Announcement </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Date : <span class="form-required">*</span></label>
                                                                    <input type="date" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Time : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Announcement Name : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_code" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Place : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label"> Details :</label>
                                                                    <textarea cols="30" rows="1"></textarea>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Announcement Name</th>
                                            <th>Place</th>

                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>31-10-23</td>
                                            <td>05.30 PM</td>
                                            <td>Panchayat Project</td>
                                            <td>Ayikudy</td>

                                            <td>Discuss with Project</td>
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


            )}


        </>
    )
}



export default Events;


