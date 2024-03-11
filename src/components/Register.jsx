
import { useState, useEffect } from "react"
import Config from '../Config'
import axios from 'axios'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'


import { UpdateButton, SaveButton, CloseButton, DeleteButton, AddButton } from "./Button";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CustomTable from "./Table";
import AlertDialog from "./Alert"




function UserRegister() {

    // sys
    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);


    // meta StATE
    const [listInstanceData, setListInstanceData] = useState([])
    const [instanceData, setInstanceData] = useState({})

    const [isOpen, setIsOpen] = useState();
    const [isedit, setisEdit] = useState();
    const [isAdd, setisAdd] = useState();
    const [error, setError] = useState(false);
    const [image, setImage] = useState();
    const [loader, setLoader] = useState();

    const [hide, setHide] = useState(true);


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }

    const getStreetLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }


    const formatAddress = (data) => {
        const addressData = data;
        return `${addressData.door_no || ''} ${addressData.line1 || ''} ${addressData.line2 || ''} 
        ${getWardLabel(addressData?.ward )|| ''} ${getStreetLabel(addressData.street) || ''}`.replace(/, +/g, ', ').trim();
      };


    // META DATA
    const headersToShow = ["Ward No", "Name", "Contact No", "Address",]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'ward_name': (value) => value,
        'name': (value) => value,
        'phone': (value) => value,
        'get_user_address': (value) =>formatAddress(value),
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();


    }

    // -----------------


    useEffect(() => {
        // fetchwards()
        fetchuser()

    }, [])


    // handle new instance
    const handleChange = (e, name) => {
        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            setImage(value)
        }
        else {

            const { value } = e.target
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }

    }


    // fetch all users
    const fetchuser = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'auth/registered-users/', Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)
        } catch (error) {
            //   setLoading(false);
            console.error('Error fetching data:', error)
        }
    }





    // create new instance
    const addNewInstance = async (e) => {

        const data = new FormData()
        data.append('name', instanceData?.name);
        data.append('phone', instanceData?.phone);
        data.append('ward', instanceData?.ward);
        data.append('email', instanceData?.email);
        data.append('image', image);
        // data.append('address', address);
        // data.append('door', door);
        // data.append('panchayat', panchayat);

        data.append('password', instanceData?.password);
        data.append('is_admin', true);

        axios
            .post(`${Config.BASE_URL}auth/registered-users/`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    setListInstanceData((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                }
                handleClose();
            })
            .catch(function (error) {
                console.log(error)
            })
    }



    // get single instrance

    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}auth/registered-users/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setInstanceData(response?.data)
                    setIsOpen(true)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    // update instance
    const updateInstance = (id) => {
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()
        data.append('name', instanceData?.name);
        data.append('phone', instanceData?.phone);
        data.append('ward', instanceData?.ward);
        data.append('email', instanceData?.email);
        data.append('image', image);

        axios
            .put(`${Config.BASE_URL}auth/registered-users/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setListInstanceData((prevArray) => {
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
                    handleClose();


                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    // delete instance
    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}auth/registered-users/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    setIsOpen(false)
                }
                handleClose();
            })
            .catch(function (error) {
                console.log(error)
            })
    }




    return (

        <>
            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <CustomizedDialogs
                                setIsOpen={setIsOpen}
                                isAdd={isAdd}
                                error={error}

                                setListData={tableData}
                                instanceData={instanceData}
                                setInstanceData={setInstanceData}
                                handleClose={handleClose}

                                // functions
                                addInstance={addNewInstance}
                                updateInstance={updateInstance}
                                deleteInstance={deleteInstance}
                                handleChange={handleChange}
                                wardlist={wardlist}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>User Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={"Add User"}
                                />


                            </div>
                        </div>


                        <CustomTable
                            headers={headersToShow}
                            data={tableData}
                            fieldsToShow={fieldsToShow}
                            fields={fields}
                            getInstanceData={getInstanceData}
                            loader={loader}
                            setLoader={setLoader}
                        />
                    </div>
                </>
            )}



            {!hide && (
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>User Details</h4>
                        </div>
                        <div className="page-btn">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span className="glyphicon glyphicon-user"></span> Add User
                            </button>

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
                                                                    <label style={{ color: 'grey' }}>
                                                                        Ward No :
                                                                    </label>
                                                                    <select
                                                                        name="ward"
                                                                        id=""
                                                                        className="custom-dropdown"
                                                                        onChange={(e) =>
                                                                            setWard(e?.target?.value)
                                                                        }
                                                                    >
                                                                        <option disabled selected value>
                                                                            -----------
                                                                        </option>
                                                                        {wardlist?.map((e) => (
                                                                            <option value={e?.id}>{e?.ward_no} </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">Name : <span className="form-required">*</span></label>
                                                                    <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} defaultValue={name || ''} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">Contact Number : <span className="form-required">*</span></label>
                                                                    <input type="number" className="form-control" name="phone" onChange={(e) => setPhone(e.target.value)} defaultValue={phone || ''} required />
                                                                </div>
                                                            </div>


                                                            <div className="col-lg-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label style={{ color: 'grey' }}> Images :</label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="fileInput"
                                                                        multiple
                                                                        accept="image/*" name="image"
                                                                        onChange={(e) => setFile(e.target.files[0])}
                                                                    />
                                                                    <div id="preview"></div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">Address : <span className="form-required">*</span></label>
                                                                    <input type="text" className="form-control" name="Address" onChange={(e) => setAddres(e.target.value)} defaultValue={street || ''} required />
                                                                    <input type="hidden" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
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



                            <div id="myModal" className="modal fade" role="dialog">
                                <div className="modal-dialog modal-lg modal-dialog-centered">

                                    <div className="modal-content">


                                        <h3 style={{ marginLeft: 20 }}>User Details</h3>
                                        <div className="modal-body">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">

                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>
                                                                    Ward No :
                                                                </label>
                                                                <select
                                                                    name="ward"
                                                                    id=""
                                                                    className="custom-dropdown"
                                                                    onChange={(e) =>
                                                                        setWard(e?.target?.value)
                                                                    }
                                                                >
                                                                    <option disabled selected value>
                                                                        -----------
                                                                    </option>
                                                                    {wardlist?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no} </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Name : <span className="form-required">*</span></label>
                                                                <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Contact Number : <span className="form-required">*</span></label>
                                                                <input type="number" className="form-control" name="phone" onChange={(e) => setPhone(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Email : <span className="form-required">*</span></label>
                                                                <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} required />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}> Images :</label>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="fileInput"
                                                                    multiple
                                                                    accept="image/*" name="image"
                                                                    onChange={(e) => setFile(e.target.files[0])}
                                                                />
                                                                <div id="preview"></div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Door No : <span className="form-required">*</span></label>
                                                                <input type="text" className="form-control" name="door" onChange={(e) => setDoor(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">Address : <span className="form-required">*</span></label>
                                                                <input type="text" className="form-control" name="Address" onChange={(e) => setAddres(e.target.value)} required />
                                                                <input type="hidden" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {/* <button type="submit" className="btn btn-success" onClick={handleSubmitregister}>Sign up</button> */}
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">

                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="table-info">
                                            <th>S.No</th>
                                            <th>Ward No</th>
                                            <th>Name</th>
                                            <th>Contact No</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listInstanceData?.map((userlist, e) => (

                                            <tr key={userlist.id}>

                                                <td>{e + 1}</td>
                                                <td>{userlist.ward_name}</td>
                                                <td>{userlist.name}</td>
                                                <td>{userlist.phone}</td>
                                                <td>{userlist.street}</td>



                                                <td>
                                                    <button className="btn btn-success" onClick={() => getusers(userlist?.id, true)}>
                                                        <span className="glyphicon glyphicon-pencil"></span> Edit
                                                    </button>
                                                    <button className="btn btn-info" onClick={() => getusers(userlist?.id, false)} >
                                                        <span className="glyphicon glyphicon-eye-open"></span> View
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => deleteusers(userlist?.id)} >
                                                        <span className="glyphicon glyphicon-trash"></span> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}


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


export default UserRegister;

import React from 'react';
import ReactDOM from 'react-dom/client';


class User extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "name": "name" };
        this.data = { "id": 1, "name": "name" }

    }


    handlechange = (e) => {
        this.setState({ name: e.target.value });
        this.setData({ name: e.target.value });

    }

    render() {

        return (
            <>

                {/* <UserRegister/> */}

                <p>{this.data.name}</p>
                <p>{this.state.name}</p>
                <input type="text" onChange={(e) => this.handlechange(e)} />

            </>



        )
    }
}

// export default User;




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CustomizedDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
    const [image, setImage] = useState();

    const [loading, setLoading] = useState(false);


    const handleClickOpen = () => {
        setisDelete(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            {/* <Button variant="outlined" >
        Open dialog
      </Button> */}

            {isdelete && (
                <AlertDialog
                    handleClose={handleClickClose}
                    onClick={() => deleteInstance(instanceData?.id)}

                />
            )}



            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
                    <h6>Permanent Employee Details

                        {!isAdd && (
                            // <EditIcon 
                            // onClick={() => setIsedit(!isedit)}
                            // />
                            <button className="btn btn-sm" onClick={() => setIsedit(!isedit)}>  <EditIcon
                                style={{ color: "blue" }}
                            // onClick={() => setIsedit(!isedit)}
                            />  </button>
                        )}

                    </h6>
                </DialogTitle>

                {/* {!isAdd && (<div>
  
                    <button className="button btn-edit" onClick={() => setIsedit(!isedit)}>  Edit  </button>
  
                </div>
                )} */}

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>




                <DialogContent dividers

                    sx={Config.style}
                >


                    {/* <Typography gutterBottom>
  
                    </Typography> */}

                    {/* <div class="modal-body">
                        <div class="card"> */}


                    {/* ----------------modal data */}

                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>
                                        Ward No :
                                    </label>
                                    <select
                                        name="ward"
                                        id=""
                                        className="custom-dropdown"
                                        onChange={(e) => handleChange(e, "ward")}
                                        defaultValue={instanceData?.get_user_address?.ward}
                                    >
                                        {/* <option disabled selected value>
                                            -----------
                                        </option> */}
                                        {wardlist?.map((e) => (
                                            <option value={e?.id}>{e?.name} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Name : <span className="form-required">*</span></label>
                                    <input type="text" className="form-control" name="name" onChange={(e) => handleChange(e, "name")}
                                        defaultValue={instanceData?.name || ''} required />
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Contact Number : <span className="form-required">*</span></label>
                                    <input type="number" className="form-control" name="phone" onChange={(e) => handleChange(e, "phone")}
                                        defaultValue={instanceData?.phone || ''} required />
                                </div>
                            </div>


                            <div className="col-lg-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}> Images :</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="fileInput"
                                        onChange={(e) => handleChange(e, "image")}
                                    />
                                    <div id="preview"></div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">Address : <span className="form-required">*</span></label>

                                    <input type="text" className="form-control" name="Address" onChange={(e) => handleChange(e, "name")}
                                        defaultValue={instanceData?.street || ''} required />

                                    <input type="hidden" className="form-control" name="password"
                                        onChange={(e) => handleChange(e, "password")} />
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* </div>
                    </div> */}
                    <Typography gutterBottom>

                    </Typography>

                </DialogContent>



                <DialogActions  >
                    {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}


                    <div class="col-md-12">
                        {
                            !isAdd && (

                                <div className="col">
                                    <DeleteButton
                                        loading={loading}
                                        setLoading={setLoading}
                                        onClick={handleClickOpen}
                                    />
                                </div>

                            )
                        }


                        <div className="text-end">

                            {isedit && (
                                <UpdateButton
                                    loading={loading}
                                    setLoading={setLoading}
                                    onClick={() => updateInstance(instanceData?.id)}
                                />
                            )}
                            {isAdd && (
                                <SaveButton
                                    loading={loading}
                                    setLoading={setLoading}
                                    onClick={addInstance}
                                />
                            )}

                            <CloseButton
                                onClick={handleClose}
                            />

                        </div>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

