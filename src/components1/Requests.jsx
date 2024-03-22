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
import AlertDialog from "./Alert";
import React from "react";
import Grid from '@mui/material/Grid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectDropdown from "./Dropdown"



import SelectDropDown from "../utils/SelectDropDown"
import FormModal from "../utils/FormModal";
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";
import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function Requests(props) {

    const modalHeader="Request";
    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const requestTypeList = useSelector((state) => state?.requesttype?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }


    const getStreetLabel = (id) => {
        const label = streetList?.find((e) => e?.id === id)?.name
        return label ?? "Nill"
    }


    const getRequestTypeLabel = (id) => {
        const label = requestTypeList?.find((e) => e?.id === id)?.type
        return label
    }

    // META DATA
    const headersToShow = ["Request ID", "Date", "Name", "Ward","Street", "Type", "Address", "Details", "Image"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'request_id': (value) => value,
        'date': (value) => value,
        'name': (value) => value,
        'ward': (value) => getWardLabel(value),
        'street': (value) => getStreetLabel(value),
        'type': (value) => getRequestTypeLabel(value) ?? "Nill",
        'address': (value) => value,
        'details': (value) => value,
        'image': (value) => value,
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();

        setErrorMsg({});
        seterrString();
        setImage();
        setisEdit();



    }


    const [requestId, setRequestId] = useState();
    const [name, setName] = useState();
    const [wardnum, setwardnum] = useState();
    const [address, setAddress] = useState();
    const [details, setDetails] = useState();
    const [id, setId] = useState();
    const [open, setOpen] = useState(false)
    // const [wardlist, setWardlist] = useState();
    const [request, setRequest] = useState();


    const [isAddRequest, setIsAddRequest] = useState(false);

    useEffect(() => {
        fetchrequests()
    }, [])




    const fetchrequests = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'request/', Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            Config?.toastalert("Something Went Wrong", "error")
            console.error('Error fetching data:', error)
        }
    }




    const getInstanceData = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}request/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setInstanceData(response?.data)
                    setIsOpen(true);
                }
            })
            .catch(function (error) {
                console.log(error)
                Config?.toastalert("Something Went Wrong", "error")
            })
    }

    //Handleopen

    const handleOpenEvent = () => {
        getInstanceData()
        setOpen(true)
    }


    //add new
    // Check form field validation
    const checkValidation = () => {

        if (!instanceData?.name || !instanceData?.phone_number || !instanceData?.ward || !instanceData?.address || !instanceData?.type || !instanceData?.details) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        data.append('name', instanceData?.name);
        data.append('phone_number', instanceData?.phone_number);
        data.append('ward', instanceData?.ward);
        data.append('address', instanceData?.address);
        data.append('details', instanceData?.details);
        data.append('street', instanceData?.street);
        if(image) {
        data.append('image', image);

        }
        data.append('type', instanceData?.type);

        try {
            const response = await axios.post(`${Config.BASE_URL}request/`, data, Config.config);
            console.log(response.data); // Handle success response
            Config?.toastalert("Submitted Successfully", "success")
            // Clear form fields
            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
        } catch (error) {
            if (error?.response?.status === 400) {
                console.log(error);
                setErrorMsg(error?.response?.data)
                Config?.toastalert("Submission Failed", "warn")
            }

            else {
                Config?.toastalert("Something Went Wrong", "error")
            }
        }
    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
          return
        }

        const data = new FormData()
        // data.append('date', name)
        data.append('name', instanceData?.name);
        data.append('ward', instanceData?.ward);
        data.append('address', instanceData?.address);
        data.append('details', instanceData?.details);
        data.append('street', instanceData?.street);
        if(image) {
            data.append('image',image);
    
            }
        data.append('type', instanceData?.type);

        axios
            .patch(`${Config.BASE_URL}request/${id}/`, data, Config.config)
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
                    // setIsOpen(false)
                    handleClose()

                    
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

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}request/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                   
                    Config?.toastalert("Deleted Successfully", "info")
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                }
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
                handleClose();
            })
    }

    // md gang


    // handle new instance
    const handleChange = (e) => {
        const { name, value } = e.target;
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
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }

    }


    return (



        <>

            <ToastContainer />

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
                            //     requestTypeList={requestTypeList}
                            //     modalHeader={modalHeader}

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

                            child={<RequestForm
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
                                // handleMainChange={handleMainChange}

                                wardlist={wardlist}
                                streetList={streetList}
                                requestTypeList={requestTypeList}
                                image={image}
                                setImage={setImage}


                            />}
                        />
                        )
                    }


                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>

                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setisAdd(true)}>
                           Create {modalHeader}
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
         


        </>
    )


}

export default Requests;






const RequestForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, streetList, image, setImage, requestTypeList


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
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"name"}

                    />
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Contact Number"
                        placeholder="Name"
                        name="phone_number"
                        value={instanceData?.phone_number}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"phone_number"}
                        type={"Number"}

                    />
                    {errString && (
                        <span className="req-text">{errString}</span>
                    )}
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={wardlist}
                        handleChange={handleChange}
                        selected={instanceData?.ward}
                        showname={"name"}
                        name={"ward"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"ward"}
                        label="Select Ward"
                    />



                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={streetList}
                        handleChange={handleChange}
                        selected={instanceData?.street}
                        showname={"name"}
                        name={"street"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"street"}
                        label="Select Street"
                    />

                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={requestTypeList}
                        handleChange={handleChange}
                        selected={instanceData?.type}
                        showname={"type"}
                        name={"type"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"type"}
                        label="Select Request Type"
                    />
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
                        label="Address"
                        placeholder="Address"
                        name="address"
                        value={instanceData?.address}
                        required={true}
                        handleChange={handleChange}   //for main element change
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"address"}
                        multiline={true}
                        rows={2}

                    />

                </Grid>
{/* 
                <Grid item xs={12} md={6} sm={6}>

                </Grid> */}


                <Grid item xs={12} md={12} sm={12}>

                    <TextInput
                        label="Details"
                        placeholder="details"
                        name="details"
                        value={instanceData?.details}
                        required={true}
                        handleChange={handleChange}   //for main element change
                        disabled={!isedit && !isAdd}
                        error={error}
                        // errorMsg={errorMsg}
                        errorField={"details"}
                        multiline={true}
                        rows={4}

                    />

                </Grid>



            </Grid>

        </>

    )
}




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

    const [instanceData, setTankCleaningFormData] = useState({
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


function CustomizedDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd,modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
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
        setisDelete(false);
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
                    <h6>{modalHeader} Details

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
                                    <label style={{ color: 'grey' }}> Name : <span className="form-required" >*</span></label>
                                    <input type="text" className="form-control" name="name" required value={instanceData?.name} onChange={handleChange}

                                        disabled={!isedit && !isAdd}
                                    />
                                    {(error && !instanceData?.name) && (
                                        <span className="req-text">This field is required</span>
                                    )}


                                </div>
                            </div>


                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}> Phone : <span className="form-required">*</span></label>
                                    <input type="text" className="form-control" name="phone_number" required value={instanceData?.phone_number} onChange={handleChange}
                                        disabled={!isedit && !isAdd}
                                    />
                                    {(error && !instanceData?.phone_number) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>


                        </div>



                        <div className="row">


                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>Request Type <span className="form-required">*</span></label>

                                    <SelectDropdown
                                        list={requestTypeList}
                                        onchange={handleChange}
                                        selected={instanceData?.type}
                                        showname={"type"}
                                        name={"type"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                    {/* {(!instanceData?.type && error) && (
                                        <span className="req-text">This field is required</span>
                                    )} */}



                                </div>
                            </div>


                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>Ward No : <span className="form-required">*</span></label>

                                    <SelectDropdown
                                        list={wardlist}
                                        onchange={handleChange}
                                        selected={instanceData?.ward}
                                        showname={"name"}
                                        name={"ward"}
                                        disabled={!isedit && !isAdd}
                                        error={error}

                                    />



                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>Address : <span className="form-required">*</span></label>
                                    <textarea className="form-control" name="address" required value={instanceData?.address} onChange={handleChange} cols="30" rows="2"
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {(error && !instanceData?.address) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>Details :</label>
                                    <textarea className="form-control" name="details" required value={instanceData?.details} onChange={handleChange} cols="30" rows="2"
                                        disabled={!isedit && !isAdd}
                                    ></textarea>

                                    {(error && !instanceData?.details) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label style={{ color: 'grey' }}>Image : <span className="form-required">*</span></label>
                                <input type="file" className="form-control" name="image" id="fileInput" required accept="image/*" onChange={handleChange}

                                    disabled={!isedit && !isAdd}
                                />
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

