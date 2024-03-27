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
import PaginationController from "../utils/Pagination"

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



function Complaint(props) {

    const modalHeader = "Complaint";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const streetList = useSelector((state) => state?.street?.value);
    const complaintTypeList = useSelector((state) => state?.complainttype?.value);

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

    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);



    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();

    const handlePageChange = (event, value) => {
        setPage(value)
    }



    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }

    const getStreetLabel = (id) => {
        const label = streetList?.find((e) => e?.id === id)?.name
        return label ?? "Nill"
    }


    const getComplaintTypeLabel = (id) => {
        const label = complaintTypeList?.find((e) => e?.id === id)?.type
        return label
    }

    // META DATA
    const headersToShow = ["Complaint ID", "Date", "Name", "Ward", "Street", "Type", "Address", "Details", "Status", "Image"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'complaint_id': (value) => value,
        'date': (value) => value,
        'name': (value) => value,
        'ward': (value) => getWardLabel(value),
        'street': (value) => getStreetLabel(value),
        'type': (value) => getComplaintTypeLabel(value) ?? "Nill",
        'address': (value) => value,
        'details': (value) => value,
        'current_status': (value) => value,
        'image': (value) => value ?? "No Image",
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();
        setisEdit(false);
        setErrorMsg();
        seterrString();
        setImage();



    }

    useEffect(() => {
        fetchrequests()
    }, [page])




    const fetchrequests = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + `get-complaints?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            // setListInstanceData(data)
            setListInstanceData(data?.results ? data?.results : data)
            if (!total) {
                setTotal(Math.ceil(data?.count / data?.results?.length))
            }
            setCount(data?.count)

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}complaintsedit/${id}`, Config.config)
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

        if (!instanceData?.name || !instanceData?.phone_number || !instanceData?.ward ||
            !instanceData?.address || !instanceData?.type || !instanceData?.details || !instanceData?.street) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }

    console.log(instanceData)
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        data.append('name', instanceData?.name);
        data.append('phone_number', instanceData?.phone_number);
        data.append('ward', instanceData?.ward);
        data.append('street', instanceData?.street);
        data.append('address', instanceData?.address);
        data.append('details', instanceData?.details);
        data.append('type', instanceData?.type);

        if (image) {
            data.append('image', image);
        }

        try {
            const response = await axios.post(`${Config.BASE_URL}complaints`, data, Config.config);
            console.log(response.data); // Handle success response

            // Clear form fields
            Config?.toastalert("Submitted Successfully", "success")
            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })
            // setListInstanceData([response?.data, ...listInstanceData.slice(0, -1)])
            // setCount(count + 1)

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
        if (image) {
            data.append('image', image);
        }
        data.append('type', instanceData?.type);
        data.append('street', instanceData?.street);

        axios
            .put(`${Config.BASE_URL}complaintsedit/${id}/`, data, Config.config)
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


        axios.delete(`${Config.BASE_URL}complaintsdelete/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    Config?.toastalert("Deleted Successfully", "info")

                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    setCount(count - 1)
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
            // setInstanceData((prevstate) => {
            //     return {
            //         ...prevstate, [name]: value
            //     }

            // })
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



    const handleDateChange = (e) => {
        const date = Config?.DateFormater(e)
        setInstanceData((prevstate) => {
            return {
                ...prevstate, start_date: date
            }

        })

    };




    return (



        <>

            <ToastContainer />




            {hide && (
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
                            //     requestTypeList={complaintTypeList}
                            //     modalHeader ={modalHeader}

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
                                    // handleMainChange={handleMainChange}

                                    wardlist={wardlist}
                                    streetList={streetList}
                                    complaintTypeList={complaintTypeList}
                                    image={image}
                                    setImage={setImage}


                                />}
                            />



                        )
                    }

                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6">{modalHeader}s Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
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

                    <Grid item xs={12}>

                        <PaginationController
                            page={page}
                            setPage={setPage}
                            handlePageChange={handlePageChange}
                            count={count}
                            data={tableData}
                            total={total}

                        />
                    </Grid>


                </>
            )}








        </>
    )


}

export default Complaint;






const Child = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, streetList, image, setImage, complaintTypeList


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
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
                        list={complaintTypeList}
                        handleChange={handleChange}
                        selected={instanceData?.type}
                        showname={"type"}
                        name={"type"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"type"}
                        label="Select Complaint Type"
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

                <Grid item xs={12} md={6} sm={6}>

                </Grid>


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







function CustomizedDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
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
                    <h6>{modalHeader + "s"} Details

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

