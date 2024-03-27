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

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectDropdown from "./Dropdown"
import Grid from '@mui/material/Grid';


import SelectDropDown from "../utils/SelectDropDown"
import FormModal from "../utils/FormModal";
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";
import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';
import MultipleSelect from "./MultiDropdown";

import AddIcon from '@mui/icons-material/Add';
import TimePicker from "../utils/TimePicker";
import PaginationController from "../utils/Pagination"



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function Activity(props) {


    useEffect(() => {

    }, [])

    function Content() {

        switch (props.path) {
            case "minutes-of-meeting":
                return <MinutesOfMeeting />
            case "scheme":
                return <Scheme />
            case "events":
                return <Events />
            case "staff-notice":
                return <StaffNoticeBoard />
            case "announcements":
                return <Announcement />

            default:
                return <MinutesOfMeeting />

        }


    }


    return (
        <>
            <Content />
            <ToastContainer />
        </>
    )

}



// -------------------------------------------------------------------------------------------------------------------------------

function MinutesOfMeeting() {

    const modalHeader = "Minutes Of Meeting";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }



    const getComplaintTypeLabel = (id) => {
        const label = complaintTypeList?.find((e) => e?.id === id)?.type
        return label
    }


    const [getUrl, setGetUrl] = useState();
    const [getListUrl, setGetListUrl] = useState();
    const [postUrl, setPostUrl] = useState();
    const [updateUrl, setUpdateUrl] = useState();
    const [deleteUrl, setDeleteUrl] = useState();


    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();


    const handlePageChange = (event, value) => {
        setPage(value)
    }



    // META DATA
    const headersToShow = ["Date", "Time", "subject", "Place", "Held by", "Details"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'date': (value) => value,
        'time': (value) => value,
        'subject': (value) => value,
        'place': (value) => value,
        'held_by': (value) => value,
        'details': (value) => value,


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


    useEffect(() => {
        fetchListData();
    }, [page])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + `minutes-of-meeting?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            if (response.status === 200) {
                // setListInstanceData(data)
                setListInstanceData(data?.results ? data?.results : data)
                if (!total) {
                    setTotal(Math.ceil(data?.count / data?.results?.length))
                }
                setCount(data?.count)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}momedit/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setInstanceData(response?.data)
                    setIsOpen(true);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {
        console.log(instanceData)
        if (!instanceData?.date || !instanceData?.time || !instanceData?.subject || !instanceData?.place || !instanceData?.held_by || !instanceData?.details) {
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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('subject', instanceData?.subject)
        data.append('place', instanceData?.place)
        data.append('held_by', instanceData?.held_by)
        data.append('details', instanceData?.details)
        if (image) {
            data.append('image', image)
        }

        try {
            const response = await axios.post(`${Config.BASE_URL}meeting/`, data, Config.config);
            console.log(response.data);

            Config?.toastalert("Submitted Successfully", "success")

            // setListInstanceData((prevstate) => {
            //     return [...prevstate, response?.data]
            // })
            // setListInstanceData([response?.data, ...listInstanceData.slice(0, -1)])
            // setCount(count + 1)

            fetchListData()

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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('subject', instanceData?.subject)
        data.append('place', instanceData?.place)
        data.append('held_by', instanceData?.held_by)
        data.append('details', instanceData?.details)
        if (image) {
            data.append('image', image)
        }

        axios
            .put(`${Config.BASE_URL}momedit/${id}/`, data, Config.config)
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
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}momdelete/${id}`, Config.config)
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



            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            // <MinutesOfMeetingDialogs
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

                                child={<MinutesOfMeetingForm
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
                                    image={image}
                                    setImage={setImage}


                                />}
                            />
                        )
                    }


                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setisAdd(true)}>
                            Create
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




const MinutesOfMeetingForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, image, setImage


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
                    <Grid >

                    </Grid>
                    <TextInput

                        label="Subject"
                        placeholder="Subject"
                        name={"subject"}
                        value={instanceData?.subject}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"subject"}

                    />
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Place"
                        placeholder="Place"
                        name="place"
                        value={instanceData?.place}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"place"}


                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Held By"
                        placeholder="Held By"
                        name="held_by"
                        value={instanceData?.held_by}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"held_by"}


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
                    <BasicDatePicker
                        label="Date"
                        placeholder="Date"
                        name="date"
                        value={instanceData?.date}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"date"}

                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <TimePicker

                        label="Time"
                        placeholder="Time"
                        name="time"
                        value={instanceData?.time}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"time"}
                    />

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





function MinutesOfMeetingDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
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
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Date : <span className="form-required">*</span>
                                    </label>
                                    <input type="date" className="form-control" name="date" onChange={handleChange}
                                        defaultValue={instanceData?.date || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.date && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Time : <span className="form-required">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="time"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.time || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.time && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Subject :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="subject"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.subject}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.subject && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Place : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="place"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.place}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.place && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Held By :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="held_by"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.held_by || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.held_by && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Meeting Details :
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="details"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.details || ''}
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {error && !instanceData?.details && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
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





// -------------------------------------------------------------------------------------------------------------------------------


function Scheme() {


    const modalHeader = "Scheme";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }



    const [getUrl, setGetUrl] = useState("get-scheme");
    const [getListUrl, setGetListUrl] = useState("scheme");
    const [postUrl, setPostUrl] = useState("scheme");
    const [updateUrl, setUpdateUrl] = useState("update-scheme");
    const [deleteUrl, setDeleteUrl] = useState("scheme-remove");


    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();


    const handlePageChange = (event, value) => {
        setPage(value)
    }




    // META DATA
    const headersToShow = ["Date", "Scheme Name", "Scheme period", "Announced by", "Details"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'date': (value) => value,
        'scheme_name': (value) => value,
        'Period': (value) => value,
        // 'place': (value) => value,
        'Announced_by': (value) => value,
        'details': (value) => value,


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


    useEffect(() => {


        fetchListData();
    }, [page])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + `get-scheme?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            if (response.status === 200) {
                // setListInstanceData(data)
                setListInstanceData(data?.results ? data?.results : data)
                if (!total) {
                    setTotal(Math.ceil(data?.count / data?.results?.length))
                }
                setCount(data?.count)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}${getUrl}/${id}/`, Config.config)
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




    //add new
    // Check form field validation
    const checkValidation = () => {

        if (!instanceData?.date || !instanceData?.scheme_name || !instanceData?.Period || !instanceData?.Announced_by || !instanceData?.details) {
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
        data.append('date', instanceData?.date)
        // data.append('time', instanceData?.schemetime)
        data.append('scheme_name', instanceData?.scheme_name)
        data.append('Period', instanceData?.Period)
        data.append('Announced_by', instanceData?.Announced_by)
        data.append('details', instanceData?.details)

        if (image) {
            data.append('file', image)
        }
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            Config?.toastalert("Submitted Successfully", "success")
            // setListInstanceData((prevstate) => {
            //     return [...prevstate, response?.data]
            // })
            // setListInstanceData([response?.data, ...listInstanceData.slice(0, -1)])
            // setCount(count + 1)
            fetchListData()

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
        data.append('date', instanceData?.date)
        // data.append('time', instanceData?.schemetime)
        data.append('scheme_name', instanceData?.scheme_name)
        data.append('Period', instanceData?.Period)
        data.append('Announced_by', instanceData?.Announced_by)
        data.append('details', instanceData?.details)
        if (image) {
            data.append('file', image)
        }

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
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


            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            // <SchemeDialogs
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

                                child={<SchemeForm
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
                                    image={image}
                                    setImage={setImage}


                                />}
                            />
                        )
                    }


                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
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



const SchemeForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, image, setImage


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
                    <Grid >

                    </Grid>
                    <TextInput

                        label="Scheme Name"
                        placeholder="Scheme Name"
                        name={"scheme_name"}
                        value={instanceData?.scheme_name}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"scheme_name"}

                    />
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Period"
                        placeholder="Period"
                        name="Period"
                        value={instanceData?.Period}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"Period"}
                        type={"Number"}


                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Announced by"
                        placeholder="Announced by"
                        name="Announced_by"
                        value={instanceData?.Announced_by}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"Announced_by"}


                    />

                </Grid>


                <Grid item xs={12} md={6} sm={6}>

                    <FileUploadComponent
                        filelabel="Image"
                        name="image"
                        value={instanceData?.file}
                        required={false}
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
                    <BasicDatePicker
                        label="Date"
                        placeholder="Date"
                        name="date"
                        value={instanceData?.date}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"date"}

                    />

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


function SchemeDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
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

                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Date : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        onChange={handleChange}
                                        name="date"
                                        defaultValue={instanceData?.date || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.date && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Scheme Name :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        onChange={handleChange}
                                        name="scheme_name"
                                        defaultValue={instanceData?.scheme_name || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.scheme_name && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Period :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        onChange={handleChange}
                                        name="Period"
                                        defaultValue={instanceData?.period}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.Period && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Announced By :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        onChange={handleChange}
                                        name="Announced_by"
                                        defaultValue={instanceData?.Announced_by}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.Announced_by && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Scheme Details :
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="details"
                                        defaultValue={instanceData?.details}
                                        disabled={!isedit && !isAdd}
                                        onChange={handleChange}
                                    ></textarea>

                                    {(!instanceData?.details && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}
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






// --------------------------------------------------------------------------------------------------------------------------------------

function Events() {

    const modalHeader = "Event";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }



    const getUrl = "event-register-get";
    const getListUrl = "eventregister";
    const postUrl = "eventregister";
    const updateUrl = "event-register-get";
    const deleteUrl = "eventregister";




    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();


    const handlePageChange = (event, value) => {
        setPage(value)
    }



    // META DATA
    const headersToShow = ["Date", "Time", "Event Name", "Place", "Details"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'date': (value) => value,
        'time': (value) => value,
        'event_name': (value) => value,
        // 'place': (value) => value,
        'Place': (value) => value,
        'details': (value) => value,


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


    useEffect(() => {


        fetchListData();
    }, [page])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + `get-events?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            if (response.status === 200) {
                // setListInstanceData(data)
                setListInstanceData(data?.results ? data?.results : data)
                if (!total) {
                    setTotal(Math.ceil(data?.count / data?.results?.length))
                }
                setCount(data?.count)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}${getUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setInstanceData(response?.data)
                    setIsOpen(true);
                }
            })
            .catch(function (error) {
                Config?.toastalert("Something Went Wrong", "error")
                console.log(error)
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.date || !instanceData?.time || !instanceData?.event_name || !instanceData?.Place || !instanceData?.details) {
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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('event_name', instanceData?.event_name)
        data.append('Place', instanceData?.Place)
        data.append('details', instanceData?.details)

        if (image) {
            data.append('image', image)
        }
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            Config?.toastalert("Submitted Successfully", "success")

            // setListInstanceData((prevstate) => {
            //     return [...prevstate, response?.data]
            // })
            // setListInstanceData([response?.data, ...listInstanceData.slice(0, -1)])
            // setCount(count + 1)
            fetchListData()

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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('event_name', instanceData?.event_name)
        data.append('Place', instanceData?.Place)
        data.append('details', instanceData?.details)
        if (image) {
            data.append('image', image)
        }

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    Config?.toastalert("Deleted Successfully", "info")
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id));
                    setCount(count + 1);
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



            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            // <EventsDialogs
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

                                child={<EventForm
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
                                    image={image}
                                    setImage={setImage}


                                />}
                            />
                        )
                    }



                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
                        <IconButton color="primary" aria-label="add">
                            <AddButton
                                onClick={() => setisAdd(true)}
                                text={" Create"}
                            />
                        </IconButton>
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





const EventForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, image, setImage


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
                    <Grid >

                    </Grid>
                    <TextInput

                        label="Event Name"
                        placeholder="Event Name"
                        name={"event_name"}
                        value={instanceData?.event_name}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"event_name"}

                    />
                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <TextInput
                        label="Place"
                        placeholder="Place"
                        name="Place"
                        value={instanceData?.Place}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"Place"}



                    />

                </Grid>



                <Grid item xs={12} md={6} sm={6}>

                    <FileUploadComponent
                        filelabel="Image"
                        name="image"
                        value={instanceData?.image}
                        required={false}
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
                    <BasicDatePicker
                        label="Date"
                        placeholder="Date"
                        name="date"
                        value={instanceData?.date}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"date"}

                    />

                </Grid>


                <Grid item xs={12} md={6} sm={6}>

                    <TimePicker

                        label="Time"
                        placeholder="Time"
                        name="time"
                        value={instanceData?.time}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"time"}
                    />

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



function EventsDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
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

                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Date : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        name="date"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.date || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.date && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Time : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        class="form-control"
                                        name="time"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.time || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.time && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Event Name :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="event_name"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.event_name || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.event_name && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Place : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Place"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.Place || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.Place && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label"> Details :</label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="details"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.details || ''}
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {(!instanceData?.details && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

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


// -------------------------------------------------------------------------------------------------------------------------------


function StaffNoticeBoard() {




    const modalHeader = "Staff Notice";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }


    const getUrl = "staffnotice";
    const getListUrl = "staffnotice";
    const postUrl = "staffnotice";
    const updateUrl = "staffnotice";
    const deleteUrl = "staffnotice";


    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();


    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // META DATA
    const headersToShow = ["Date", "Subject", "Details"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'date': (value) => value,
        'subject': (value) => value,
        'details': (value) => value,


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


    useEffect(() => {


        fetchListData();
    }, [page])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + `get-staffnotice?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            // setListInstanceData(data)
            if (response.status === 200) {
                setListInstanceData(data?.results ? data?.results : data)
                if (!total) {
                    setTotal(Math.ceil(data?.count / data?.results?.length))
                }
                setCount(data?.count)
            }


        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}${getUrl}/${id}/`, Config.config)
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




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.date || !instanceData?.subject || !instanceData?.details) {
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
        data.append('date', instanceData?.date)
        data.append('subject', instanceData?.subject)

        data.append('details', instanceData?.details)
        if (image) {
            data.append('file', image)
        }
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            Config?.toastalert("Submitted Successfully", "success")
            // setListInstanceData((prevstate) => {
            //     return [...prevstate, response?.data]
            // })
            fetchListData()
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
        data.append('date', instanceData?.date)
        data.append('subject', instanceData?.subject)

        data.append('details', instanceData?.details)
        if (image) {
            data.append('file', image)
        }

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {

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
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
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




    return (



        <>



            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            // <StaffNoticeBoardDialogs
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

                                child={<StaffNoticeForm
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
                                    image={image}
                                    setImage={setImage}


                                />}
                            />
                        )
                    }



                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
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

const StaffNoticeForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, image, setImage


    } = props


    return (

        <>

            <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} md={6} sm={6}>
                    <Grid >

                    </Grid>
                    <TextInput

                        label="Subject"
                        placeholder="Subject"
                        name={"subject"}
                        value={instanceData?.subject}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"subject"}

                    />
                </Grid>


                {/* 
                <Grid item xs={12} md={6} sm={6}>

                    <FileUploadComponent
                        filelabel="Image"
                        name="image"
                        value={instanceData?.file}
                        required={false}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        image={image}
                        setImage={setImage}
                        errorMsg={errorMsg}
                        errorField={"image"}

                    />

                </Grid> */}

                <Grid item xs={12} md={6} sm={6}>
                    <BasicDatePicker
                        label="Date"
                        placeholder="Date"
                        name="date"
                        value={instanceData?.date}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"date"}

                    />

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

function StaffNoticeBoardDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
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

                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Date : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        name="date"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.date || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.date && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Event Name :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="subject"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.subject || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {(!instanceData?.subject && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            {/* <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Place : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Place"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.Place || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                     {(!instanceData?.Place && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div> */}

                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label"> Details :</label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="details"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.details || ''}
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {(!instanceData?.details && error) && (
                                        <span className="req-text">This field is required</span>
                                    )}

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





// -------------------------------------------------------------------------------------------------------------------------------




function Announcement() {


    const modalHeader = "Announcement";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
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


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }


    function getWardNames(ids, objects) {
        return ids
            .map(id => objects.find(obj => obj.id === id))
            .filter(obj => obj)
            .map(obj => obj.name)
            .join(', ');
    }



    const getUrl = "get-announcement";
    const getListUrl = "announcement";
    const postUrl = "announcement";
    const updateUrl = "get-announcement";
    const deleteUrl = "get-announcement";



    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);


    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [total, setTotal] = useState();


    const handlePageChange = (event, value) => {
        setPage(value)
    }



    // META DATA
    const headersToShow = ["Date", "Time", "Name", "Place", "Details", "Ward"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'date': (value) => value,
        'time': (value) => value,
        'name': (value) => value,
        // 'place': (value) => value,
        'place': (value) => value,
        'details': (value) => value,
        "ward": (value) => getWardNames(value, wardlist)

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


    useEffect(() => {


        fetchListData();
    }, [page])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + `get-announcement?page=${page}`, Config?.config)
            const data = await response.json()
            console.log(data)
            // setListInstanceData(data)
            if (response.status === 200) {
                setListInstanceData(data?.results ? data?.results : data)
                if (!total) {
                    setTotal(Math.ceil(data?.count / data?.results?.length))
                }
                setCount(data?.count)
            }

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
        }
    }




    const getInstanceData = (id, edit) => {
        axios
            .get(`${Config.BASE_URL}${getUrl}/${id}/`, Config.config)
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




    //add new
    // Check form field validation
    const checkValidation = () => {
        console.log(instanceData)

        if (!instanceData?.date || !instanceData?.time || !instanceData?.name || !instanceData?.place || !instanceData?.details) {
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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('name', instanceData?.name)
        data.append('place', instanceData?.place)
        if (image) {
            data.append('file', image)
        }
        const wardlist = instanceData?.ward
        if (wardlist?.length > 0) {
            wardlist.map((e) => (
                data.append('ward', e)
            ))
        }

        data.append('details', instanceData?.details)
        if (image) {
            data.append("file", image)
        }
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            Config?.toastalert("Submitted Successfully", "success")

            // setListInstanceData((prevstate) => {
            //     return [...prevstate, response?.data]
            // })
            // setListInstanceData([response?.data, ...listInstanceData.slice(0, -1)])
            // setCount(count + 1)
            fetchListData()

            handleClose();
        } catch (error) {
            console.error('Error occurred:', error);
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
        data.append('date', instanceData?.date)
        data.append('time', instanceData?.time)
        data.append('name', instanceData?.name)
        data.append('place', instanceData?.place)
        // data.append('ward', instanceData?.ward)
        data.append('details', instanceData?.details)
        if (image) {
            data.append('file', image)
        }

        const wardlist = instanceData?.ward
        if (wardlist?.length > 0) {
            wardlist.map((e) => (
                data.append('ward', e)
            ))
        }
        if (image) {
            data.append("file", image)
        }

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
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




    // handle new instance
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "file") {
            const check = Config?.DocfileType(e.target.files[0].name)

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




    return (



        <>



            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            // <AnnouncmentDialogs
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

                                child={<AnnouncementForm
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
                                    image={image}
                                    setImage={setImage}


                                />}
                            />



                        )
                    }


                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
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




const AnnouncementForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        wardlist, image, setImage


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
                        label="Place"
                        placeholder="Place"
                        name="place"
                        value={instanceData?.place}
                        required={true}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"place"}
                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>
                    <MultipleSelect
                        data={wardlist}
                        onchange={handleChange}
                        value={instanceData?.ward}
                        showname={"name"}
                        name={"ward"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"ward"}
                        label={"Select Wards"}

                    />
                    {(error && !instanceData?.ward?.length) && (
                        <span className="req-text">This field is required</span>
                    )}
                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <FileUploadComponent
                        filelabel="File"
                        name="file"
                        value={instanceData?.file}
                        required={false}
                        handleChange={handleChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        image={image}
                        setImage={setImage}
                        errorMsg={errorMsg}
                        errorField={"file"}

                    />

                </Grid>


                <Grid item xs={12} md={6} sm={6}>
                    <BasicDatePicker
                        label="Date"
                        placeholder="Date"
                        name="date"
                        value={instanceData?.date}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"date"}

                    />

                </Grid>

                <Grid item xs={12} md={6} sm={6}>

                    <TimePicker

                        label="Time"
                        placeholder="Time"
                        name="time"
                        value={instanceData?.time}
                        required={true}
                        handleChange={handleChange}
                        // handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"time"}
                    />

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

function AnnouncmentDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, requestTypeList
        // setError, setImage, image 
    } = props


    const [isedit, setIsedit] = useState(false);
    const [isdelete, setisDelete] = useState(false);
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
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Date : <span className="form-required">*</span>
                                    </label>
                                    <input type="date" className="form-control" name="date" onChange={handleChange}
                                        defaultValue={instanceData?.date || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.date && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Time : <span className="form-required">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="time"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.time || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.time && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label style={{ color: 'grey' }}>Ward <span className="form-required">*</span></label>

                                    <SelectDropdown
                                        list={wardlist}
                                        onchange={handleChange}
                                        selected={instanceData?.ward}
                                        showname={"name"}
                                        name={"ward"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                    {/* {(!instanceData?.type && error) && (
                                        <span className="req-text">This field is required</span>
                                    )} */}



                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Name :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.name}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.name && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Place : <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="place"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.place}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.place && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>


                            {/* <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Held By :{' '}
                                        <span class="form-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="held_by"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.held_by || ''}
                                        disabled={!isedit && !isAdd}
                                        required
                                    />
                                    {error && !instanceData?.held_by && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div> */}
                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">
                                        Details :
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="details"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.details || ''}
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {error && !instanceData?.details && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label style={{ color: 'grey' }}>Image : <span className="form-required">*</span></label>
                                        <input type="file" className="form-control" id="fileInput" onChange={handleChange} required multiple accept="image/*" />
                                    </div>
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
