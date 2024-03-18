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
import { useDispatch } from "react-redux";
import { setWard } from "../features/WardSlice"
import { setStreet } from "../features/StreetSlice";
import MultipleSelect from "./MultiDropdown";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const emp_url = "contr-employees"




function Collectors(props) {


    return (
        <>
            <Coll
                path={props?.path}
            />
        </>
    )
}


export default Collectors




function Coll(props) {


    const collector = useSelector((state) => state?.collector?.value)?.filter((e) => e?.code === "C1");

    console.log(collector, "collector")

    const { path } = props;

    const wardlist = useSelector((state) => state?.ward?.value);

    const getWardLabel = (data) => {
        const listData = data ? data : []
        const label = listData?.map((no) => (wardlist?.find((e) => e?.id === no)?.name)).join(',')
        return label
    }

    const component = {
        "house": <HouseCollector
            type="house"
            modalHeader="House Collector"
            headersToShow={["Image", "Name", "Contact No", "Ward No"]}
            fields={{
                'employee.image': (value) => value,
                'employee.name': (value) => value,
                'employee.phone_number': (value) => value,
                'ward': (value) => getWardLabel(value),
            }}
            role={collector[0]}

        />,
        "street": <HouseCollector
            type="house"
            modalHeader="street"
            headersToShow={["Image", "Name", "Contact No", "Ward No", "Tractor No"]}
            fields={{
                'employee.image': (value) => value,
                'employee.name': (value) => value,
                'employee.phone_number': (value) => value,
                'ward': (value) => getWardLabel(value),
                "tractor_no": (value) => value
            }}
            role={collector[1]}

        />,
        "shop": <HouseCollector
            type="house"
            modalHeader="shop"
            headersToShow={["Image", "Name", "Contact No", "Ward No"]}
            fields={{
                'employee.image': (value) => value,
                'employee.name': (value) => value,
                'employee.phone_number': (value) => value,
                'ward': (value) => getWardLabel(value),
            }}
            role={collector[0]}

        />,
        "overall-weighing": <HouseCollector

            type="overall"
            modalHeader="Overall Collector"
            headersToShow={["Image", "Name", "Contact No",]}
            fields={{
                'employee.image': (value) => value,
                'employee.name': (value) => value,
                'employee.phone_number': (value) => value,
                // 'ward': (value) => getWardLabel(value),
            }}
            role={collector[0]}

        />,


        // "street": <StreetCollector
        //     type="street"
        // />,

        // "shop":
        //     <ShopCollector
        //         type="shop"
        //     />,

        // "overall-weighing":
        //     <OverallCollector
        //         type="overall"
        //     />

    }

    return component[path]

}




// -------------------------------------------------------------------------------------------------------------------------------


function HouseCollector(props) {

    const { modalHeader, headersToShow, fields, role } = props

    const dispatch = useDispatch()

    // const modalHeader = "House Collector";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const panchayatList = useSelector((state) => state?.panchayat?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

    // meta StATE
    const [listInstanceData, setListInstanceData] = useState([])
    const [instanceData, setInstanceData] = useState(
        {

            "employee": {
                "image": "",
                "name": "",
                "phone_number": "",
            },
            "ward": [

            ]
        }

    )

    const [isOpen, setIsOpen] = useState();
    const [isedit, setisEdit] = useState();
    const [isAdd, setisAdd] = useState();
    const [error, setError] = useState(false);
    const [image, setImage] = useState();
    const [loader, setLoader] = useState();

    const [hide, setHide] = useState(true);


    const getWardLabel = (data) => {
        const listData = data ? data : []
        const label = listData?.map((no) => (wardlist?.find((e) => e?.id === no)?.name)).join(',')
        return label
    }


    const getWardLabe = (data) => {
        const wardNames = [];
        const listData = data ? data : []
        listData?.forEach(id => {
            const ward = wardlist.find(item => item.id === id);
            if (ward) {
                wardNames.push(ward.name);
            } else {
                wardNames.push('Not Found');
            }
        });

        return wardNames;
    };


    const getUrl = "collector";
    const getListUrl = "collector";
    const postUrl = "collector/";
    const updateUrl = "collector";
    const deleteUrl = "collector";



    // META DATA
    // const headersToShow = ["Image", "Name", "Contact No", "Ward No"]
    const tableData = listInstanceData
    const fieldsToShow = []
    // const fields = {
    //     'employee.image': (value) => value,
    //     'employee.name': (value) => value,
    //     'employee.phone_number': (value) => value,
    //     'ward': (value) => getWardLabel(value),
    // }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData({
            "employee": {
                "image": "",
                "name": "",
                "phone_number": "",
            },
            "ward": [

            ]

        });
        setError();


    }


    useEffect(() => {
        fetchListData();
    }, [])




    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl + `?employee_role=${role?.id}`, Config?.config)
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

        if (!instanceData?.employee?.name || !instanceData?.ward
            || !instanceData?.employee?.phone_number || !instanceData?.employee?.start_date) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    console.log(instanceData?.collector?.ward, "rolee", role)
    const addNewInstance = async (e) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData();
        // const employeeData=new FormData();

        const employeeData = {
            // image:instanceData?.image,
            start_date: instanceData?.employee?.start_date,
            phone_number: instanceData?.employee?.phone_number,
            name: instanceData?.employee?.name,
            is_collector: true,
            role: role?.id,
        }

        const wardListdata = instanceData?.ward
        // instanceData?.collector?.ward?.map((e)=>(
        data.append("ward", wardListdata)
        // ))
        // data.append("ward", instanceData?.collector?.ward)
        data.append("employee", JSON.stringify(employeeData))
        data.append("description", instanceData?.description)

        if (image) {
            data.append("image", image)
        }

        // data.append("role", role?.id)
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}`,
                data,
                Config.config,

            );
            console.log(response.data);
            toast.success('Successfully submitted!');

            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();
            // updateListData();
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
        const employeeData = {
            // image:instanceData?.image,
            start_date: instanceData?.employee?.start_date,
            phone_number: instanceData?.employee?.phone_number,
            name: instanceData?.employee?.name,
            is_collector: true,
        }

        if (instanceData?.employee?.image) {
            employeeData["image"] = instanceData?.employee?.image
        }

        const wardListdata = instanceData?.ward
        // instanceData?.collector?.ward?.map((e)=>(
        data.append("ward", wardListdata)
        // ))
        if (image) {
            data.append("image", image)
        }

        data.append("employee", JSON.stringify(employeeData))
        data.append("description", instanceData?.description)
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

    console.log("trigger", instanceData)
    const handleChange = (e) => {
        console.log("trigger")
        const { name, value } = e.target;
        console.log(name, "nameeeeeeeee")
        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]

            setImage(value)

            // setInstanceData(prevState => ({
            //     ...prevState,
            //     employee: {
            //         ...prevState.employee,
            //         [name]: value // Replace existing array with a new array containing the updated value
            //     }
            // }));
        }
        else {

            setInstanceData(prevState => ({
                ...prevState,
                employee: {
                    ...prevState.employee,
                    [name]: value // Replace existing array with a new array containing the updated value
                }
            }));

        }

    }

    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setInstanceData((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })


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
                                handleMainChange={handleMainChange}
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



function WardDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList,
        handleMainChange
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
                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">House collector Name :
                                        <span class="form-required">*</span></label>
                                    <input type="text" class="form-control" name="name"
                                        onChange={handleChange} defaultValue={instanceData?.employee?.name || ""}
                                        disabled={!isedit && !isAdd}

                                    />

                                    {(error && !instanceData?.employee?.name) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Ward No : <span
                                        class="form-required">*</span></label>
                                    {/* <SelectDropdown
                                        list={wardlist}
                                        onchange={handleChange}
                                        selected={instanceData?.collector?.ward}
                                        showname={"name"}
                                        name={"ward"}
                                        disabled={!isedit && !isAdd}
                                        error={error}
                                    /> */}

                                    <MultipleSelect
                                        data={wardlist}
                                        onchange={handleMainChange}
                                        value={instanceData?.ward}
                                        showname={"name"}
                                        name={"ward"}
                                        disabled={!isedit && !isAdd}
                                        error={error}

                                    />


                                    {(error && !instanceData?.ward) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>


                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Contact No : <span
                                        class="form-required">*</span></label>
                                    <input type="text" class="form-control" name="phone_number"
                                        onChange={handleChange} defaultValue={instanceData?.employee?.phone_number || ""}
                                        disabled={!isedit && !isAdd}

                                    />

                                    {(error && !instanceData?.employee?.phone_number) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Image :
                                        <span class="form-required">*</span></label>
                                    <input type="file" class="form-control" name="image"
                                        onChange={handleChange}
                                        disabled={!isedit && !isAdd}
                                    />
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Description :</label>
                                    <input type="text" class="form-control"
                                        onChange={handleMainChange} defaultValue={instanceData?.description || ""}
                                        disabled={!isedit && !isAdd}

                                        name="description" />
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                    <input type="Date" class="form-control" name="start_date"
                                        onChange={handleChange} defaultValue={instanceData?.employee?.start_date || ""}
                                        disabled={!isedit && !isAdd}

                                        required />

                                    {(error && !instanceData?.employee?.start_date) && (
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