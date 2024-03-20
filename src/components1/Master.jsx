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
import AlertDialog from "./Alert";
import React from "react";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectDropdown from "./Dropdown"
import { useDispatch } from "react-redux";
import { setWard } from "../features/WardSlice"
import { setStreet } from "../features/StreetSlice";
import {Typography,Container,Grid,Paper} from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function Content(props) {

    switch (props?.path) {
        case "districts":
            return <District />
        case "cities":
            return <City />
        case "panchayath":
            return <Panchayat />
        case "ward":
            return <Ward />
        case "house":
            return < House />
        // case "shops":
        //     return <Shop/>
        case "streets":
            return <Street />
        default:
            return <Ward />
    }

}




function Masters(props) {

    return (
        <>

            <Content
                path={props?.path}
            />
        </>

    )
}


export default Masters;


// -------------------------------------------------------------------------------------------------------------------------------

function District() {




    const modalHeader = "District";

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


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + 'meeting', Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
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
        try {
            const response = await axios.post(`${Config.BASE_URL}meeting/`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Submission failed. Please try again.');
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

        axios
            .put(`${Config.BASE_URL}momedit/${id}/`, data, Config.config)
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

                    handleClose()


                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}momdelete/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                }
            })
            .catch(function (error) {
                console.log(error)
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
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <MinutesOfMeetingDialogs
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
                                requestTypeList={complaintTypeList}
                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    {/* <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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
                    </div> */}


                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
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

                </>
            )}



        </>
    )


}



function DistrictDialogs(props) {

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


function City() {




    const modalHeader = "City";

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


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
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
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Submission failed. Please try again.');
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

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                }
            })
            .catch(function (error) {
                console.log(error)
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
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <SchemeDialogs
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
                                requestTypeList={complaintTypeList}
                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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



        </>
    )


}



function CityDialogs(props) {

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

function Panchayat() {




    const modalHeader = "Panchayath";

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


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.ward_no || !instanceData?.name) {
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
        data.append('name', instanceData?.name)
        data.append('ward_no', instanceData?.ward_no)

        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Submission failed. Please try again.');
        }
    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('name', instanceData?.name)
        data.append('ward_no', instanceData?.ward_no)

        axios
            .put(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

                    handleClose()


                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                }
            })
            .catch(function (error) {
                console.log(error)
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
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <EventsDialogs
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
                                requestTypeList={complaintTypeList}
                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    {/* <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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
                    </div> */}


                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
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
                </>
            )}



        </>
    )


}



function PanchayatDialogs(props) {

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


function Ward() {


    const dispatch = useDispatch()

    const modalHeader = "Ward";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const panchayatList = useSelector((state) => state?.panchayat?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

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


    const getUrl = "get-ward";
    const getListUrl = "get-ward";
    const postUrl = "get-ward";
    const updateUrl = "get-ward";
    const deleteUrl = "get-ward";



    // META DATA
    const headersToShow = ["Ward Name", "Houses", "Streets"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'name': (value) => value,
        'house_count': (value) => value,
        'street_count': (value) => value,
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data);
            // dispatch(setWard(data));

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    // redux
    const updateListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            dispatch(setWard(data));

        } catch (error) {
            console.error('Error fetching data:', error)
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.name || !instanceData?.ward_no) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    console.log(instanceData, "fdj")
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        data.append('name', instanceData?.name)
        data.append('ward_no', instanceData?.ward_no)
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
            updateListData();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error(error?.response?.data?.msg);
        }


    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('name', instanceData?.name)
        data.append('ward_no', instanceData?.ward_no)

        axios
            .patch(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

                    handleClose()


                }
            })
            .catch(function (error) {
                toast.error(error?.response?.data?.msg);
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                    updateListData();
                }
            })
            .catch(function (error) {
                console.log(error)
                handleClose();
            })
    }




    // handle new instance

    const handleChange = (e) => {
        console.log("trigger")
        const { name, value } = e.target;
        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <WardDialogs
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
                                panchayatList={panchayatList}
                                districtList={districtList}

                                // requestTypeList={complaintTypeList}
                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    {/* <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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
                    </div> */}




                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
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
                </>
            )}



        </>
    )


}



function WardDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList
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

                            {/* for zonal officers */}

                            {/* <div class="col-lg-6 col-sm-12 col-12">

                                <div class="form-group">
                                    <label class="form-label">Select District : <span class="form-required">*</span></label>
                                    <SelectDropdown
                                        list={districtList}
                                        onchange={handleChange}
                                        selected={instanceData?.panchayath_info.district}
                                        showname={"name"}
                                        name={"type"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Select Panchayth : <span class="form-required">*</span></label>

                                    <SelectDropdown
                                        list={panchayatList}
                                        onchange={handleChange}
                                        selected={instanceData?.panchayat}
                                        showname={"name"}
                                        name={"type"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                </div>
                            </div> */}



                            {/* <div class="col-lg-6 col-sm-12 col-12"> */}
                            <div class="form-group">
                                <label class="form-label">Ward Name : <span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="name"

                                    onChange={handleChange}
                                    defaultValue={instanceData?.name || ""}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.name) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>
                            {/* </div> */}

                            {/* <div class="col-lg-6 col-sm-12 col-12"> */}
                            <div class="form-group">
                                <label class="form-label">Ward Number : <span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="ward_no"
                                    defaultValue={instanceData?.ward_no || ""}
                                    onChange={handleChange}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.ward_no) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>
                            {/* </div> */}

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


function Street() {

    const modalHeader = "Street";

    const dispatch = useDispatch()

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const panchayatList = useSelector((state) => state?.panchayat?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

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


    const getUrl = "street";
    const getListUrl = "street";
    const postUrl = "street/";
    const updateUrl = "street";
    const deleteUrl = "street";



    // META DATA
    const headersToShow = ["Street Name", "Street No", "Ward Name"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'name': (value) => value,
        'street_no': (value) => value,
        'ward': (value) => getWardLabel(value),
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }



    const updateListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            dispatch(setStreet(data));

        } catch (error) {
            console.error('Error fetching data:', error)
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.street_no || !instanceData?.ward || !instanceData?.name) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    console.log(instanceData, "fdj")
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        data.append('name', instanceData?.name)
        data.append('street_no', instanceData?.street_no)
        data.append('ward', instanceData?.ward)
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
            updateListData();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Submission failed. Please try again.');
        }
    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('name', instanceData?.name)
        data.append('street_no', instanceData?.street_no)
        data.append('ward', instanceData?.ward)

        axios
            .patch(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

                    handleClose()


                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                    updateListData();

                }
            })
            .catch(function (error) {
                console.log(error)
                handleClose();
            })
    }




    // handle new instance

    const handleChange = (e) => {
        console.log("trigger")
        const { name, value } = e.target;
        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <StreetDialogs
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
                                panchayatList={panchayatList}
                                districtList={districtList}

                                // requestTypeList={complaintTypeList}
                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    {/* <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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
                    </div> */}




                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
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
                </>
            )}



        </>
    )


}



function StreetDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList
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

                            {/* for zonal officers */}

                            {/* <div class="col-lg-6 col-sm-12 col-12">

                                <div class="form-group">
                                    <label class="form-label">Select District : <span class="form-required">*</span></label>
                                    <SelectDropdown
                                        list={districtList}
                                        onchange={handleChange}
                                        selected={instanceData?.panchayath_info.district}
                                        showname={"name"}
                                        name={"type"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Select Panchayth : <span class="form-required">*</span></label>

                                    <SelectDropdown
                                        list={panchayatList}
                                        onchange={handleChange}
                                        selected={instanceData?.panchayat}
                                        showname={"name"}
                                        name={"type"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    />
                                </div>
                            </div> */}

                            <div class="form-group">
                                <label class="form-label">Ward : <span class="form-required">*</span></label>

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

                            {/* <div class="col-lg-6 col-sm-12 col-12"> */}
                            <div class="form-group">
                                <label class="form-label">Name : <span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="name"

                                    onChange={handleChange}
                                    defaultValue={instanceData?.name || ""}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.name) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>
                            {/* </div> */}

                            {/* <div class="col-lg-6 col-sm-12 col-12"> */}
                            <div class="form-group">
                                <label class="form-label">Number : <span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="street_no"
                                    defaultValue={instanceData?.street_no || ""}
                                    onChange={handleChange}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.street_no) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>
                            {/* </div> */}

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




function House() {

    const modalHeader = "Building";

    const dispatch = useDispatch()

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const panchayatList = useSelector((state) => state?.panchayat?.value);
    const districtList = useSelector((state) => state?.district?.value);
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

    const [buildingType, setBuildingType] = useState([]);


    const getWardLabel = (id) => {
        const label = wardlist?.find((e) => e?.id === id)?.name
        return label
    }

    const getBuildingLabel = (id) => {
        const label = buildingType?.find((e) => e?.id === id)?.name
        return label
    }


    const getUrl = "buildingregister";
    const getListUrl = "buildingregister";
    const postUrl = "buildingregister";
    const updateUrl = "buildingregister";
    const deleteUrl = "buildingregister";



    // META DATA
    const headersToShow = ["Ward No", "Type", "Name", "Contact No", "Door No", "Address", "QR code"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'ward': (value) => getWardLabel(value),
        'building_type': (value) => getBuildingLabel(value),
        'name': (value) => value,
        'phone_num': (value) => value,
        'door_no': (value) => value,
        'line1': (value) => value,
        'qr_code': (value) => value,
    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData();
        setError();


    }


    useEffect(() => {

        fetchListData();
        fetchBuildingType();
    }, [])





    const fetchBuildingType = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'building-type',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setBuildingType(data)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)


        } catch (error) {
            console.error('Error fetching data:', error)
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData)
        if (!instanceData?.ward || !instanceData?.street || !instanceData?.building_type || !instanceData?.name || !instanceData?.phone_num || !instanceData?.door_no || !instanceData?.line1) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    console.log(instanceData, "fdj")
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        data.append("ward", instanceData?.ward)
        data.append("building_type", instanceData?.building_type)
        data.append("name", instanceData?.name)
        data.append("phone_num", instanceData?.phone_num)
        data.append("door_no", instanceData?.door_no)
        data.append("line1", instanceData?.line1)


        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}`, data, Config.config);
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
            fetchListData();
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Submission failed. Please try again.');
        }
    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append("ward", instanceData?.ward)
        data.append("building_type", instanceData?.building_type)
        data.append("name", instanceData?.name)
        data.append("phone_num", instanceData?.phone_num)
        data.append("door_no", instanceData?.door_no)
        data.append("line1", instanceData?.line1)

        axios
            .patch(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
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

                    handleClose()


                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();
                    fetchListData();

                }
            })
            .catch(function (error) {
                console.log(error)
                handleClose();
            })
    }




    // handle new instance

    const handleChange = (e) => {
        console.log("trigger")
        const { name, value } = e.target;
        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            // setImage(value)
            setInstanceData((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })
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

            {hide && (
                <>

                    {
                        (isOpen || isAdd) && (

                            <HouseDialogs
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
                                panchayatList={panchayatList}
                                districtList={districtList}
                                streetList={streetList}
                                buildingType={buildingType}

                                modalHeader={modalHeader}

                            // setImage={setImage}
                            // image={image}


                            />
                        )
                    }
                    {/* <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={" Create"}
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
                    </div> */}




                    <Grid item  xs={12} sm={6}>
                        <Typography variant="h6">{modalHeader+"s"} Details</Typography>
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
                </>
            )}



        </>
    )


}



function HouseDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList, streetList,buildingType
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
                fullWidth
                maxWidth={"lg"}

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

                            {/* for zonal officers */}

                            {/* <div class="form-group">
                                <label class="form-label">Select District : <span class="form-required">*</span></label>
                                <SelectDropdown
                                    list={districtList}
                                    onchange={handleChange}
                                    // selected={instanceData?.panchayath_info.district}
                                    showname={"name"}
                                    name={"type"}
                                    disabled={!isedit && !isAdd}
                                    error={error}
                                />
                            </div>



                            <div class="form-group">
                                <label class="form-label">Select Panchayth : <span class="form-required">*</span></label>

                                <SelectDropdown
                                    list={panchayatList}
                                    onchange={handleChange}
                                    // selected={instanceData?.panchayat}
                                    showname={"name"}
                                    name={"type"}
                                    disabled={!isedit && !isAdd}
                                    error={error}
                                />
                            </div> */}
{/* ---------------------------------------------------------------------------------- */}

                            <div class="form-group">
                                <label class="form-label">Ward <span class="form-required">*</span></label>

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

                            <div class="form-group">
                                <label class="form-label">Select Street: <span class="form-required">*</span></label>

                                <SelectDropdown
                                    list={streetList}
                                    onchange={handleChange}
                                    selected={instanceData?.street}
                                    showname={"name"}
                                    name={"street"}
                                    disabled={!isedit && !isAdd}
                                    error={error}
                                />
                            </div>


                            <div class="form-group">
                                <label class="form-label">Select Building Type : <span class="form-required">*</span></label>

                                <SelectDropdown
                                    list={buildingType}
                                    onchange={handleChange}
                                    selected={instanceData?.building_type}
                                    showname={"name"}
                                    name={"building_type"}
                                    disabled={!isedit && !isAdd}
                                    error={error}
                                />
                            </div>

                   
                            <div class="form-group">
                                <label class="form-label">Name<span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="name"

                                    onChange={handleChange}
                                    defaultValue={instanceData?.name || ""}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.name) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>
                          

                           
                            <div class="form-group">
                                <label class="form-label">Contact No<span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="phone_num"
                                    defaultValue={instanceData?.phone_num || ""}
                                    onChange={handleChange}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.phone_num) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>


                            <div class="form-group">
                                <label class="form-label">Door No<span class="form-required">*</span></label>
                                <input type="text" class="form-control" name="door_no"
                                    defaultValue={instanceData?.door_no || ""}
                                    onChange={handleChange}
                                    disabled={!isedit && !isAdd}
                                    required />

                                {(error && !instanceData?.door_no) && (
                                    <span className="req-text">{Config?.errString}</span>
                                )}
                            </div>


                     
                                <div class="form-group">
                                    <label class="form-label">
                                        Address :
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="1"
                                        name="line1"
                                        onChange={handleChange}
                                        defaultValue={instanceData?.line1 || ''}
                                        disabled={!isedit && !isAdd}
                                    ></textarea>
                                    {error && !instanceData?.line1 && (
                                        <span className="req-text">
                                            This field is required
                                        </span>
                                    )}
                                </div>
          




                            {/* </div> */}

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