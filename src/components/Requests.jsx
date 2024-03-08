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



function Requests(props) {


    const [requestId, setRequestId] = useState();
    const [name, setName] = useState();
    const [wardnum, setwardnum] = useState();
    const [address, setAddress] = useState();
    const [details, setDetails] = useState();
    const [id, setId] = useState();
    const [isedit, setisEdit] = useState();
    const [open, setOpen] = useState(false)
    const [wardlist, setWardlist] = useState();
    const [request, setRequest] = useState();
    const [image, setImage] = useState();

    const [isAddRequest, setIsAddRequest] = useState(false);

    useEffect(() => {
        fetchrequests()
        fetchwards()
        // fetchevent()
    }, [])


    const [requestList, setRequestList] = useState();

    const fetchrequests = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'request/', Config?.config)
            const data = await response.json()
            console.log(data)
            setRequestList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    //Fetch Wards

    const fetchwards = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'get-ward', Config?.config)
            const data = await response.json()
            console.log(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            setWardlist(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    //EDIT REQUESTS


    const getrequests = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}request/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // setupdatemeetings(response?.data)
                    setRequestId(response.data.request_id)
                    setName(response.data.name)
                    setwardnum(response.data.wardnum)
                    // settime(response.data.time)
                    setAddress(response.data.address)
                    setDetails(response.data.details)
                    // setScheme_Details(response.data.details)
                    setId(response.data.id)

                    // setViewEmployee(response?.data)
                    setisEdit(edit)
                    setOpen(true)

                    // $('#myModal').modal('show')
                    // $('.modal-backdrop').show();
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Handleopen

    const handleOpenEvent = () => {
        getrequests()
        setOpen(true)
    }

    //Handle Close

    const handleClose = () => {
        setOpen(false)
        setisEdit()
    }
    //Validation



    //UPDATE REQUESTS

    const updateRequest = (id) => {
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()
        // data.append('date', name)
        data.append('name', name);
        data.append('wardnum', wardnum);
        data.append('address', address);
        data.append('details', details);

        axios
            .put(`${Config.BASE_URL}request/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setRequestList((prevArray) => {
                        const index = prevArray.findIndex((obj) => obj.id === id)
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ]
                        }
                        return prevArray
                    })
                    // setIsOpen(false)
                    handleClose()

                    // $('#myModal').modal('show')
                    // $('.modal-backdrop').show();
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteRequests = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}request/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setRequestList(requestList?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // md gang




    return (



        <>

            <ToastContainer />

            {props?.path === "list" && (


                <>

                    {isAddRequest && (

                        <ViewModal />
                    )}

                    <div className="content">
                        <div className="page-header">
                            <div class="page-title">
                                <h4>Request List</h4>
                            </div>
                            <div class="page-btn">
                                <button class="btn btn-primary" onClick={() => setIsAddRequest(true)}>
                                    <span class="glyphicon glyphicon-user"></span> Add Request
                                </button>

                            </div>

                        </div>

                        {open && (
                            <Modal
                                // keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="modal-content">
                                        <h3 style={{ marginLeft: 20 }}>
                                            Request{' '}
                                        </h3>
                                        <div className="modal-body">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}> Name : <span className="form-required">*</span></label>
                                                                <input type="text" className="form-control" name="name" onChange={(e) => setName(e?.target?.value)} defaultValue={name || ''} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>
                                                                    Ward No :
                                                                </label>
                                                                <select name="ward_no" id="" className="custom-dropdown" onChange={(e) => setwardnum(e?.target?.value)} defaultValue={wardnum || ''}>
                                                                    <option disabled selected value>
                                                                        -----------
                                                                    </option>
                                                                    {wardlist?.map((e) => (<option value={e?.id}>{e?.ward_no}</option>))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>Request Address : <span className="form-required">*</span></label>
                                                                <textarea className="form-control" name="address" onChange={(e) => setAddress(e?.target?.value)} defaultValue={address || ''} required cols="30" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>Request Details :</label>
                                                                <textarea className="form-control" name="details" onChange={(e) => setDetails(e?.target?.value)} defaultValue={details || ''} required cols="30" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>Image : <span className="form-required">*</span></label>
                                                                <input type="file" className="form-control" id="fileInput" onChange={(e) => setImage(e?.target?.value)} defaultValue={image || ''} required multiple accept="image/*" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {isedit && (
                                                <button
                                                    type="submit"
                                                    className="btn btn-success" onClick={() => updateRequest(id)}

                                                >
                                                    Save
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                data-dismiss="modal"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}

                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 col-lg-3 col-xs-8">
                                        <div className="form-group">
                                            <label for="fromDate">Ward No :</label>
                                            <select name="" id="" className="custom-dropdown">
                                                <option value="">01</option>
                                                <option value="">02</option>
                                                <option value="">03</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-lg-2 col-xs-4">

                                        <div className="form-group">
                                            <label for="fromDate" style={{ color: "white" }}>Search :</label>
                                            <button className="btn btn-success" onclick="getReport()">Search</button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-lg-2 col-xs-6">
                                        <div class="form-group">
                                            <label for="fromDate">From Date :</label>
                                            <input type="date" className="form-control" id="fromDate" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-lg-2 col-xs-6">
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
                                                <th>Name</th>
                                                <th>Ward No</th>
                                                <th>Request Type</th>
                                                <th>Address </th>
                                                <th>Details </th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {requestList?.map((requests, e) => (
                                                <tr key={requests.id}>
                                                    <td><td>{e + 1}</td></td>
                                                    <td>{requests.request_id}</td>
                                                    <td>{requests.date}</td>
                                                    <td>{requests.name}</td>
                                                    <td>{requests.ward}</td>
                                                    <td>{requests.type}</td>
                                                    <td>{requests.address}</td>

                                                    <td>{requests.details}</td>
                                                    <td><img src={Config.MEDIA_URL + requests.image} /></td>
                                                    {/* <td>{requests.details}</td> */}
                                                    <td>
                                                        <button
                                                            class="btn btn-success"
                                                            onClick={() => getrequests(requests?.id, true)}

                                                        >
                                                            <span class="glyphicon glyphicon-pencil"></span>{' '}
                                                            Edit
                                                        </button>
                                                        <button
                                                            class="btn btn-info" onClick={handleOpenEvent}

                                                        >
                                                            <span class="glyphicon glyphicon-eye-open"></span>{' '}
                                                            View
                                                        </button>
                                                        <button class="btn btn-danger" onClick={() => deleteRequests(requests?.id)}>
                                                            <span
                                                                class="glyphicon glyphicon-trash"

                                                            ></span>{' '}
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </>
            )}
            {props?.path === 'public-toilet' && (
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Public Toilet Request</h4>
                        </div>
                    </div>
                    <div className="tab-pane active" id="compl">
                        <div className="tab-content">
                            <div className="tab-pane active" id="public">
                                <br />
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
                                                        <label style={{ color: 'grey' }}>Request Address : <span className="form-required">*</span></label>
                                                        <textarea className="form-control" name="address" required value={publicToiletFormData.address} onChange={handlePublicToiletChange} cols="30" rows="2"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Request Details :</label>
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
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        <button type="button" className="btn btn-danger">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
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
                                                        <label style={{ color: 'grey' }}>Request Address : <span className="form-required">*</span></label>
                                                        <textarea className="form-control" name="address" required value={publicToiletFormData.address} onChange={handlePublicToiletChange} cols="30" rows="2"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label style={{ color: 'grey' }}>Request Details :</label>
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


