



function Requests(props) {


    return (

        <>
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