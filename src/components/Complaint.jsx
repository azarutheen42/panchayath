import { useState, useEffect } from "react";

import Config from '../Config'
import axios from 'axios'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

function List() {


    const [isAddComplaint, setIsAddComplaint] = useState();

    return (

        <>

            {isAddComplaint && (

                <ViewModal />
            )}
            <div class="content">
                <div className="page-header">
                    <div class="page-title">
                        <h4>Complaint List</h4>
                    </div>
                    <div class="page-btn">
                        <button class="btn btn-primary" onClick={() => setIsAddComplaint(true)}>
                            <span class="glyphicon glyphicon-user"></span> Add Complaint
                        </button>

                    </div>

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

        </>
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



function ViewModal(props) {

    const { setIsOpen, viewEmployee, getRoleLabel, edit, setViewEmployee, setPermEmployee, roles, handleClose, setError, setImage, image } = props



    const [publicToiletFormData, setPublicToiletFormData] = useState({
        request_id: '3',
        name: '',
        wardnum: '',
        address: '',
        details: '',
        image: null,
        type: '21'
    });

    const [tankCleaningFormData, setTankCleaningFormData] = useState({
        request_id: '4',
        name: '',
        wardnum: '',
        address: '',
        details: '',
        image: null,
        type: '22'
    });

    const handlePublicToiletChange = (e) => {
        const { name, value } = e.target;
        setPublicToiletFormData({ ...publicToiletFormData, [name]: value });
    };

    const handleTankCleaningChange = (e) => {
        const { name, value } = e.target;
        setTankCleaningFormData({ ...tankCleaningFormData, [name]: value });
    };

    const handlePublicToiletFileChange = (e) => {
        setPublicToiletFormData({ ...publicToiletFormData, image: e.target.files });
    };

    const handleTankCleaningFileChange = (e) => {
        setTankCleaningFormData({ ...tankCleaningFormData, image: e.target.files });
    };





    const handlePublicToiletSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', publicToiletFormData.name);
        data.append('wardnum', publicToiletFormData.wardnum);
        data.append('address', publicToiletFormData.address);
        data.append('details', publicToiletFormData.details);
        if (publicToiletFormData.image) {
            for (let i = 0; i < publicToiletFormData.image.length; i++) {
                const file = publicToiletFormData.image[i];
                // Check if the file format is allowed
                if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    data.append('image', file);
                } else {
                    // Display alert for disallowed file format
                    alert('Only PNG, JPG, and JPEG formats are allowed for images.');
                    return; // Prevent form submission
                }
            }
        }

        try {
            const response = await axios.post(`${Config.BASE_URL}request/`, data);
            console.log(response.data); // Handle success response
            toast.success('Successfully submitted!');
            setPublicToiletFormData({
                request_id: '3',
                name: '',
                wardnum: '',
                address: '',
                details: '',
                image: null,
                type: '21'
            });
        } catch (error) {
            console.error('Error occurred:', error); // Handle error
            toast.error('Submission failed. Please try again.');
        }
    };


    const handleTankCleaningSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', tankCleaningFormData.name);
        data.append('wardnum', tankCleaningFormData.wardnum);
        data.append('address', tankCleaningFormData.address);
        data.append('details', tankCleaningFormData.details);

        // Check if an image is selected
        if (tankCleaningFormData.image) {
            for (let i = 0; i < tankCleaningFormData.image.length; i++) {
                const image = tankCleaningFormData.image[i];
                const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

                // Check if the format of the selected image is allowed
                if (!allowedFormats.includes(image.type)) {
                    // If not allowed, show an alert and prevent form submission
                    alert('Unsupported file format. Please select an image in PNG, JPEG, or JPG format.');
                    return;
                }

                // If the format is allowed, append the image to the FormData
                data.append('image', image);
            }
        }

        try {
            const response = await axios.post(`${Config.BASE_URL}request/`, data);
            console.log(response.data); // Handle success response
            toast.success('Successfully submitted!');
            // Clear form fields
            setTankCleaningFormData({
                request_id: '4',
                name: '',
                wardnum: '',
                address: '',
                details: '',
                image: null,
                type: '22'
            });
        } catch (error) {
            console.error('Error occurred:', error); // Handle error
            toast.error('Submission failed. Please try again.');
        }
    };

    return (
        <div>

            <Modal
                // keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box
                    sx={style}
                >
                    <div class="modal-content"  >
                        <h3
                            style={{ marginLeft: 20 }}
                        >Request</h3>
                        <div class="modal-body">


                            <div className="content">



                                <form onSubmit={handlePublicToiletSubmit}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}> Name : <span className="form-required">*</span></label>
                                                        <input type="text" className="form-control" name="name" required value={publicToiletFormData.name} onChange={handlePublicToiletChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Ward No : <span className="form-required">*</span></label>
                                                        <select name="wardnum" className="custom-dropdown" required value={publicToiletFormData.wardnum} onChange={handlePublicToiletChange}>
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Address : <span className="form-required">*</span></label>
                                                        <textarea className="form-control" name="address" required value={publicToiletFormData.address} onChange={handlePublicToiletChange} cols="30" rows="2"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Details :</label>
                                                        <textarea className="form-control" name="details" required value={publicToiletFormData.details} onChange={handlePublicToiletChange} cols="30" rows="2"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Image : <span className="form-required">*</span></label>
                                                        <input type="file" className="form-control" id="fileInput" required multiple accept="image/*" onChange={handlePublicToiletFileChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>



                            </div>
                        </div>

                        <div class="modal-footer">
                            {edit && (
                                <button type="submit" class="btn btn-success" onClick={() => updateEmployee(viewEmployee?.id)} >Save</button>
                            )}

                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={handleClose}>Close</button>
                        </div>

                    </div>






                </Box>
            </Modal>




        </div>
    );
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