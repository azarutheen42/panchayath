
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
import EditIcon from '@mui/icons-material/Edit';
import CustomTable from "./Table";
import AlertDialog from "./Alert"

import { Typography, Container, Grid, Paper } from '@mui/material';


import AddIcon from '@mui/icons-material/Add';

import SelectDropDown from "../utils/SelectDropDown"
import FormModal from "../utils/FormModal";
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";
import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';



function UserRegister() {

    // sys
    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const streetList = useSelector((state) => state?.street?.value);


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

    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const modalHeader = "User Registration"

    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label ?? "Nill"
    }

    const getStreetLabel = (id) => {
        const label = streetList?.find((e) => e?.id === id)?.name
        return label ?? "Nill"
    }


    const formatAddress = (addressData) => {
        const data = `${addressData?.door_no ? addressData?.door_no + "," : ''}  ${addressData.line1 || ''} ${addressData.line2 || ''} `.replace(/, +/g, ', ').trim();
        if (!data) {
            return "Nill"
        }
        return data
    };


    // META DATA
    const headersToShow = ["Image", "Name", "Contact No", "Address", "Ward", "Street"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'image': (value) => value,
        'name': (value) => value,
        'phone': (value) => value,
        'get_user_address': (value) => formatAddress(value),
        'get_user_address.ward': (value) => getWardLabel(value),
        'get_user_address.street': (value) => getStreetLabel(value),
    }


    const handleClose = () => {
        setIsOpen(false);
        setisAdd(false);
        setisEdit(false);
        setInstanceData();
        setError();
        setImage();

    }

    // -----------------


    useEffect(() => {
        // fetchwards()
        fetchuser()

    }, [])




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




    const checkValidation = () => {

        if (!instanceData?.name || !instanceData?.get_user_address?.ward || !instanceData?.get_user_address?.street
            || !instanceData?.phone || !instanceData?.get_user_address?.door_no || !instanceData?.get_user_address?.line1) {

            console.log("please fill required fields")
            setError(true)
            return false



        }
        else {
            if (instanceData?.phone?.length != 10) {
                seterrString("Phone Number Should be in 10 Characters")
                setError(true)
                return false
            }

            else {
                setError(false)
                seterrString();
                return true
            }

        }

    }



    // create new instance
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('name', instanceData?.name);
        data.append('phone', instanceData?.phone);
        data.append('password', instanceData?.phone);
        data.append('image', image);


        data.append('line1', instanceData?.get_user_address?.line1);
        data.append('door_no', instanceData?.get_user_address?.door_no);
        data.append('ward', instanceData?.get_user_address?.ward);
        data.append('street', instanceData?.get_user_address?.street);

        axios
            .post(`${Config.BASE_URL}auth/registered-users/`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    Config?.toastalert("Submitted Successfully", "success")
                    setListInstanceData((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                }
                handleClose();
            })
            .catch(function (error) {
                if (error?.response?.status === 400) {
                    console.log(error);
                    setErrorMsg(error?.response?.data)
                    Config?.toastalert("Submission Failed", "warn")
                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
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
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('name', instanceData?.name);
        data.append('phone', instanceData?.phone);
        data.append('password', instanceData?.phone);
        if (image) {
            data.append('image', image);
        }
        data.append('line1', instanceData?.get_user_address?.line1);
        data.append('door_no', instanceData?.get_user_address?.door_no);
        data.append('ward', instanceData?.get_user_address?.ward);
        data.append('street', instanceData?.get_user_address?.street);

        axios
            .put(`${Config.BASE_URL}auth/registered-users/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)
                    Config?.toastalert("Updated Successfully", "success")
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

                if (error?.response?.status === 400) {
                    console.log(error);
                    setErrorMsg(error?.response?.data)
                    Config?.toastalert("Updation Failed", "warn")
                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
            })
    }


    // delete instance
    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}auth/registered-users/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    Config?.toastalert("Deleted Successfully", "info")
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    setIsOpen(false)
                }
                handleClose();
            })
            .catch(function (error) {
                if (error?.response?.status === 400) {
                    console.log(error);
                    setErrorMsg(error?.response?.data)
                    Config?.toastalert("Failed to Delete", "warn")
                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
            })
    }




    const handleDateChange = (e) => {
        const date = Config?.DateFormater(e)
        setInstanceData((prevstate) => {
            return {
                ...prevstate, start_date: date
            }

        })

    };



    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setInstanceData((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })


    }



    // handle new instance
    const handleChange = (e) => {
        const { name, value } = e.target

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

            // const { value } = e.target

            setInstanceData(prevState => ({
                ...prevState,
                get_user_address: {
                    ...prevState.get_user_address,
                    [name]: value
                }
            }));

        }

    }


    console.log(instanceData)


    return (

        <>


            {
                (isOpen || isAdd) && (

                    // <CustomizedDialogs
                    //     setIsOpen={setIsOpen}
                    //     isAdd={isAdd}
                    //     error={error}

                    //     setListData={tableData}
                    //     instanceData={instanceData}
                    //     setInstanceData={setInstanceData}
                    //     handleClose={handleClose}

                    //     // functions
                    //     addInstance={addNewInstance}
                    //     updateInstance={updateInstance}
                    //     deleteInstance={deleteInstance}
                    //     handleChange={handleChange}
                    //     wardlist={wardlist}

                    // // setImage={setImage}
                    // // image={image}


                    // />

                    <FormModal
                        modalHeader={modalHeader}
                        lazyLoading={lazyLoading}
                        setIsOpen={setIsOpen}
                        isAdd={isAdd}
                        isedit={isedit}
                        setisEdit={setisEdit}
                        error={error}
                        errorMsg={errorMsg}

                        setListData={tableData}
                        instanceData={instanceData}
                        setInstanceData={setInstanceData}

                        handleClose={handleClose}

                        // functions
                        addInstance={addNewInstance}
                        updateInstance={updateInstance}
                        deleteInstance={deleteInstance}
                        handleChange={handleChange}




                        child={<Child
                            lazyLoading={lazyLoading}
                            setIsOpen={setIsOpen}
                            isAdd={isAdd}
                            isedit={isedit}

                            error={error}
                            errorMsg={errorMsg}
                            errString={errString}

                            setListData={tableData}
                            instanceData={instanceData}
                            setInstanceData={setInstanceData}

                            handleClose={handleClose}
                            handleChange={handleChange}
                            handleMainChange={handleMainChange}


                            wardlist={wardlist}
                            streetList={streetList}
                            image={image}
                            setImage={setImage}


                        />}
                    />
                )
            }


            <Grid item xs={12} sm={6}>
                <Typography variant="h6">User Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setisAdd(true)}>
                    Add User
                </Button>
            </Grid>




            <Grid item xs={12}>
                <CustomTable
                    headers={headersToShow}
                    data={tableData}
                    fieldsToShow={fieldsToShow}
                    fields={fields}
                    getInstanceData={getInstanceData}
                    loader={loader}
                    setLoader={setLoader}
                />
            </Grid>

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








const Child = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose, handleMainChange,
        wardlist, streetList, image, setImage,


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
                    <Grid >

                    </Grid>
                    <TextInput

                        label="Name"
                        placeholder="Name"
                        name={"name"}
                        value={instanceData?.name}
                        required={true}
                        handleChange={handleMainChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"name"}

                    />
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={wardlist}
                        handleChange={handleChange}
                        selected={instanceData?.get_user_address?.ward}
                        showname={"name"}
                        name={"ward"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"ward"}
                        label="Select Ward"
                    />

                    {/* 
                    {(error && !instanceData?.get_user_address?.ward) && (
                        <span className="req-text">This field is required</span>
                    )} */}
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={streetList}
                        handleChange={handleChange}
                        selected={instanceData?.get_user_address?.street}
                        showname={"name"}
                        name={"street"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"street"}
                        label="Select Street"
                    />


                    {/* {(error && !instanceData?.get_user_address?.street) && (
                        <span className="req-text">This field is required</span>
                    )} */}
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Contact Number"
                        placeholder="Phone"
                        name="phone"
                        value={instanceData?.phone}
                        required={true}
                        handleChange={handleMainChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"phone"}
                        type={"Number"}

                    />
                    {errString && (
                        <span className="req-text">{errString}</span>
                    )}
                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <FileUploadComponent
                        filelabel="Image"
                        name="image"
                        value={instanceData?.image}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        image={image}
                        setImage={setImage}
                        errorMsg={errorMsg}
                        errorField={"image"}
                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <TextInput
                        label="Door No"
                        placeholder="door no"
                        name="door_no"
                        value={instanceData?.get_user_address?.door_no}
                        required={true}
                        handleChange={handleChange}   //for main element change
                        disabled={!isedit && !isAdd}
                        error={error}
                        // errorMsg={errorMsg}
                        errorField={"door_no"}

                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <TextInput
                        label="Address"
                        placeholder="Address"
                        name="line1"
                        value={instanceData?.get_user_address?.line1}
                        required={true}
                        handleChange={handleChange}   //for main element change
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"line1"}
                        multiline={true}
                        rows={2}

                    />


                </Grid>



            </Grid>




        </>



    )
}



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
                    loading={loading}
                    setLoading={setLoading}

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

