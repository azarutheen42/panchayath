import { useState, createContext, useContext } from "react";
import UserContext from "./Dashboard"



function Qrhandler(props) {

    // const user =useContext(UserContext)
    // console.log(props?.path,user,"iiiiiiiiiiiiiiiiiii")

    return (

        <>
         
        
            {/* // GENERATOR */}

            {props?.path === "generator" && (


                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4> QR Generator Details  </h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-user"></span> Generate QR
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        <form action="" method="post"  id="">
                                            <h3 style={{ marginLeft: 20 }}>QR Generator</h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Ward No : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Door No : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Name : <span class="form-required">*</span></label>
                                                                    <input type="text" class="form-control" name="category_name" required />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">Address : <span class="form-required">*</span></label>
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
                                                    <th>Ward No  </th>
                                                    <th>Door No </th>
                                                    <th>Address</th>
                                                    <th>QR code </th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>12</td>
                                                    <td>02</td>
                                                    <td>North st, Ayikudy</td>
                                                    <td> QR code</td>
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



            )}

            {/* issues */}
            {props?.path === "issuelist" && (




                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4> QR Issuelist Details</h4>
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
                                                    <th>Ward No </th>
                                                    <th>Address</th>
                                                    <th>Needs </th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1.</td>
                                                    <td>12-12-23</td>
                                                    <td>02</td>
                                                    <td>North st, Ayikudy</td>
                                                    <td>Replace QR code</td>
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

            )}


        </>
    )
}



export default Qrhandler;