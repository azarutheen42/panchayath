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



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function Activity(props) {



    return (
        <>
            {/* <MinutesOfMeeting /> */}
            {/* <Scheme /> */}
            {/* <Events/> */}
            <StaffNoticeBoard/>
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

        if (!instanceData?.date || !instanceData?.time || !instanceData?.subject || !instanceData?.place || instanceData?.held_by || instanceData?.details) {
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
        data.append('date', instance?.date)
        data.append('time', instance?.time)
        data.append('subject', instance?.subject)
        data.append('place', instance?.place)
        data.append('held_by', instance?.held_by)
        data.append('details', instance?.details)
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
        data.append('date', instance?.date)
        data.append('time', instance?.time)
        data.append('subject', instance?.subject)
        data.append('place', instance?.place)
        data.append('held_by', instance?.held_by)
        data.append('details', instance?.details)

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

        if (!instanceData?.date || !instanceData?.scheme_name || !instanceData?.Period || !instanceData?.Announced_by || instanceData?.details) {
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="date"
                                        defaultValue={instanceData?.date || ''}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="scheme_name"
                                        defaultValue={instanceData?.scheme_name || ''}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="Period"
                                        defaultValue={instanceData?.period}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="Announced_by"
                                        defaultValue={instanceData?.Announced_by}
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
                                        onChange={(e) => handleChange(e, "name")}
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

        if (!instanceData?.date || !instanceData?.scheme_name || !instanceData?.Period || !instanceData?.Announced_by || instanceData?.details) {
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="date"
                                        defaultValue={instanceData?.date || ''}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="scheme_name"
                                        defaultValue={instanceData?.scheme_name || ''}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="Period"
                                        defaultValue={instanceData?.period}
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
                                        onChange={(e) => handleChange(e, "name")}
                                        name="Announced_by"
                                        defaultValue={instanceData?.Announced_by}
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
                                        onChange={(e) => handleChange(e, "name")}
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

function StaffNoticeBoard(props) {

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



    // META DATA
    const headersToShow = ["Subject","Details",]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'subject': (value) => value,
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

            const response = await fetch(Config.BASE_URL + 'complaints', Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }




    const getInstanceData = (id, edit) => {
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        if (!instanceData?.name || !instanceData?.phone_number || !instanceData?.ward || !instanceData?.address || instanceData?.type || instanceData?.details) {
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
        data.append('image', instanceData?.image);
        data.append('type', instanceData?.type);

        try {
            const response = await axios.post(`${Config.BASE_URL}complaints/`, data, Config.config);
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
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()

        data.append('name', instanceData?.name);
        data.append('ward', instanceData?.ward);
        data.append('address', instanceData?.address);
        data.append('details', instanceData?.details);
        // data.append('image', instanceData?.image);
        data.append('type', instanceData?.type);

        axios
            .put(`${Config.BASE_URL}complaintsedit/${id}/`, data, Config.config)
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

        axios.delete(`${Config.BASE_URL}complaintsdelete/${id}`, Config.config)
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

                            <StaffNoticeDialogs
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
                                    text={"Create " + modalHeader}
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



function StaffNoticeDialogs(props) {

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






// -------------------------------------------------------------------------------------------------------------------------------

function Announcement(props) {

    const modalHeader = "Complaint";

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
    const headersToShow = ["Complaint ID", "Date", "Name", "Ward", "Type", "Address", "Details", "Status", "Image"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {

        'complaint_id': (value) => value,
        'date': (value) => value,
        'name': (value) => value,
        'ward': (value) => getWardLabel(value),
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


    }


    useEffect(() => {


        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + 'complaints', Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data)

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }




    const getInstanceData = (id, edit) => {
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
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        if (!instanceData?.name || !instanceData?.phone_number || !instanceData?.ward || !instanceData?.address || instanceData?.type || instanceData?.details) {
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
        data.append('image', instanceData?.image);
        data.append('type', instanceData?.type);

        try {
            const response = await axios.post(`${Config.BASE_URL}complaints/`, data, Config.config);
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
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()

        data.append('name', instanceData?.name);
        data.append('ward', instanceData?.ward);
        data.append('address', instanceData?.address);
        data.append('details', instanceData?.details);
        // data.append('image', instanceData?.image);
        data.append('type', instanceData?.type);

        axios
            .put(`${Config.BASE_URL}complaintsedit/${id}/`, data, Config.config)
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

        axios.delete(`${Config.BASE_URL}complaintsdelete/${id}`, Config.config)
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
                    <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>{modalHeader}s Details</h4>
                            </div>
                            <div className="page-btn">
                                <AddButton
                                    onClick={() => setisAdd(true)}
                                    text={"Create " + modalHeader}
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

            <MinutesOfMeeting />

        </>
    )


}



function AnnouncementDialogs(props) {

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