

function UserRegister(){


    return(

        <div class="content">
        <div class="page-header">
            <div class="page-title">
                <h4>User Details</h4>
            </div>
            <div class="page-btn">
                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    <span class="glyphicon glyphicon-user"></span> Add User
                </button>
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                    
                        <div class="modal-content">
                          
                            <form action="" method="post"  id="">
                                <h3 style={{ marginLeft: 20 }}>User Details</h3>
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
                                                        <label class="form-label">Name : <span class="form-required">*</span></label>
                                                        <input type="text" class="form-control" name="category_name" required />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Contact Number : <span class="form-required">*</span></label>
                                                        <input type="number" class="form-control" name="category_code" required /> 
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Address :</label>
                                                        <textarea cols="30" rows="2"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-success">Sign up</button>
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
                                <th>Ward No</th>
                                <th>Name</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.</td>
                                <td>05</td>
                                <td>jeeva</td>
                                <td>123456789</td>
                                <td>Tenkasi</td>
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
                                <td>Siva</td>
                                <td>123456789</td>
                                <td>12</td>
                                <td>Ayikudy</td>
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
    )
}


export default UserRegister;

import React from 'react';
import ReactDOM from 'react-dom/client';


class User extends React.Component{


    constructor(props){
        super(props);
        this.state={"name":"name"};
        this.data={"id":1,"name":"name"}

    }


   handlechange=(e)=>{
        this.setState({name :e.target.value});
        this.setData({name :e.target.value});
        
    }

    render(){
        
        return(
            <>

            {/* <UserRegister/> */}

             <p>{this.data.name}</p>
             <p>{this.state.name}</p>
             <input type="text" onChange={(e)=>this.handlechange(e)} />
            </>
           

        
        )
    }
}

// export default User;