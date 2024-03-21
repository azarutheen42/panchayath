import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Config from "../Config";
import axios from "axios";
import * as React from 'react';
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

import AddIcon from '@mui/icons-material/Add';
import { Typography, Container, Grid, Paper } from '@mui/material';
import SelectDropdown from "./Dropdown"
import SelectDropDown from "../utils/SelectDropDown"

import FormModal from "../utils/FormModal";





const style = {

}


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


function Employee(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const modalHeader = "Permenant Employee"


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [loader, setLoader] = useState();

    // list all employees
    const [permEmployee, setPermEmployee] = useState();
    // const [tempEmployee, setTempEmployee] = useState()
    const [roles, setRoles] = useState();

    // const panchayathList = useSelector((state) => state?.panchayath?.value);

    const [employee, setEmployee] = useState();

    const [viewEmployee, setViewEmployee] = useState();

    const [isOpen, setIsOpen] = useState();
    const [isedit, setisEdit] = useState();
    const [isAdd, setisAdd] = useState();
    const [error, setError] = useState(false);
    const [image, setImage] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);



    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();

    const handleClose = () => {
        setImage();
        // setIsView();
        setError();
        setIsOpen();
        setisEdit();
        setEmployee();
        setViewEmployee();
        setisAdd();
        setErrorMsg({});
        seterrString();


    }



    useEffect(() => {

        getPermemployee()
        getRoles()
        // gettempemployee()

    }, [])


    // META DATA
    const headersToShow = ["Image", "Name", "Employee Id", "Position", "Contact No", "Joined"]
    const tableData = permEmployee
    const fieldsToShow = []
    const fields = {
        'image': (value) => value,
        'name': (value) => value,
        'emp_id': (value) => value,
        'role': (role) => getRoleLabel(role),
        'phone_number': (value) => value,
        'start_date': (value) => value,
    }



    // get rolw AND lABEL
    const getRoles = () => {
        axios.get(`${Config.BASE_URL}roles/`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setRoles(response?.data?.filter((e) => e.type === 1));

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


    const getRoleLabel = (id) => {
        const label = roles?.find((e) => e?.id === id)?.name
        return label
    }



    //    GET ALL EMPLOYEES

    const getPermemployee = () => {
        axios.get(`${Config.BASE_URL}permanentemployees/`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setPermEmployee(response?.data)
                    setLazyLoading(false);

                }

            })
            .catch(function (error) {
                console.log(error);

            });


    }


    // Check form field validation
    const checkValidation = () => {

        console.log(employee)


        if (!employee?.name || !employee?.phone_number || !employee?.start_date || !employee?.role) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {

            if (employee?.phone_number.length != 10) {
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


    // ADD NEW EMPLOYEES
    const addEmployee = () => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", employee?.name)
        data.append("role", employee?.role)
        data.append("phone_number", employee?.phone_number)
        data.append("start_date", employee?.start_date)
        data.append("is_permenant", true)
        // data.append("ward", true)
        // data.append("panchayat", employee?.panchayat)

        if (image) {
            data.append("image", image)
        }

        axios.post(`${Config.BASE_URL}permanentemployees/`,
            data,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setPermEmployee((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    Config?.toastalert("Submitted Successfully", "success")
                    setEmployee();
                    handleClose();

                }

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
            });

    }



    const handleChange = (e) => {
        const { value, name } = e.target

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
            setEmployee((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }

    }


    const handleDateChange = (e) => {
        const date = Config?.DateFormater(e)
        setEmployee((prevstate) => {
            return {
                ...prevstate, start_date: date
            }

        })

    };

    console.log(employee)




    // GET SINGLE EMPLOYEE
    const getEmployee = (id, edit, load_state) => {

        axios.get(`${Config.BASE_URL}permanentemployees/${id}/`,
            Config?.config

        )
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    setEmployee(response?.data)
                    // setViewEmployee(response?.data)
                    setisEdit(edit)
                    setIsOpen(true)
                    // setLoader(false)

                    // $('#myModal').modal('show')
                    // $('.modal-backdrop').show();

                }

            })
            .catch(function (error) {
                console.log(error);
                // setLoader(false)

            });

        return

    }



    // update employees

    const updateEmployee = (id) => {


        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", employee?.name)
        data.append("role", employee?.role)
        data.append("phone_number", employee?.phone_number)
        data.append("start_date", employee?.start_date)
        // data.append("panchayat", employee?.panchayat)

        if (image) {
            data.append("image", image)
        }


        axios.patch(`${Config.BASE_URL}permanentemployees/${id}/`, data,
            Config?.config

        )
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    Config?.toastalert("Updated Successfully", "success")
                    setPermEmployee(prevArray => {
                        const index = prevArray.findIndex(obj => obj.id === id);
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ];
                        }
                        return prevArray;
                    });
                    // setIsOpen(false)
                    handleClose();

                    // $('#myModal').modal('show')
                    // $('.modal-backdrop').show();

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

            });

    }



    // delete employees

    const deleteEmployee = (id, load_state) => {

        axios.delete(`${Config.BASE_URL}permanentemployees/${id}/`,
            Config?.config

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setPermEmployee(permEmployee?.filter((e) => e.id !== id))
                    Config?.toastalert("Deleted Successfully", "info")
                    handleClose();
                    // setLoader()


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
            });

    }



    return (


        <>

            {
                (isOpen || isAdd) && (
                    <>



                        {/* <CustomizedDialogs
                        lazyLoading={lazyLoading}
                        setIsOpen={setIsOpen}
                        isAdd={isAdd}
                        error={error}

                        getRoleLabel={getRoleLabel}
                        roles={roles}

                        setListData={setPermEmployee}
                        instanceData={employee}
                        setInstanceData={setEmployee}
                        handleClose={handleClose}

                        // functions
                        addInstance={addEmployee}
                        updateInstance={updateEmployee}
                        deleteInstance={deleteEmployee}
                        handleChange={handleChange}

                    // setImage={setImage}
                    // image={image}


                    /> */}

                        <FormModal
                            modalHeader={modalHeader}
                            lazyLoading={lazyLoading}
                            setIsOpen={setIsOpen}
                            isAdd={isAdd}
                            isedit={isedit}
                            setisEdit={setisEdit}
                            error={error}
                            errorMsg={errorMsg}

                            // getRoleLabel={getRoleLabel}
                            // roles={roles}

                            // setListData={setPermEmployee}
                            instanceData={employee}
                            // setInstanceData={setEmployee}
                            handleClose={handleClose}

                            // functions
                            addInstance={addEmployee}
                            updateInstance={updateEmployee}
                            deleteInstance={deleteEmployee}
                            handleChange={handleChange}

                            child={<Child
                                lazyLoading={lazyLoading}
                                setIsOpen={setIsOpen}
                                isAdd={isAdd}
                                isedit={isedit}
                                error={error}
                                errorMsg={errorMsg}
                                errString={errString}

                                getRoleLabel={getRoleLabel}
                                roles={roles}

                                setListData={setPermEmployee}
                                instanceData={employee}
                                setInstanceData={setEmployee}
                                handleClose={handleClose}
                                handleChange={handleChange}
                                handleDateChange={handleDateChange}

                                image={image}
                                setImage={setImage}

                            // functions
                            // addInstance={addEmployee}
                            // updateInstance={updateEmployee}
                            // deleteInstance={deleteEmployee}
                            // handleChange={handleChange}

                            />}


                        />



                    </>
                )
            }





            {props?.path === "permenant" && (


                <>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Permanent Employee Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setisAdd(true)}>
                            Add Employee
                        </Button>
                    </Grid>




                    <Grid item xs={12}>
                        <CustomTable
                            headers={headersToShow}
                            data={tableData}
                            fieldsToShow={fieldsToShow}
                            fields={fields}
                            getInstanceData={getEmployee}
                            loader={loader}
                            setLoader={setLoader}
                        />
                    </Grid>

                </>


            )}

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
        deleteInstance, updateInstance, handleChange, addInstance, error
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



            <Dialog
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

                    sx={style}
                >


                    {/* <Typography gutterBottom>

                    </Typography> */}

                    {/* <div class="modal-body">
                        <div class="card"> */}
                    <div class="card-body">

                        <div class="row">
                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label
                                        class="form-label"
                                    >Name : <span
                                        class="form-required"
                                    >*</span></label>
                                    <input type="text" class="form-control" name="category_name"
                                        onChange={(e) => handleChange(e, "name")}
                                        defaultValue={instanceData?.name || ""}
                                        disabled={!isedit && !isAdd}
                                        required />

                                    {(error && !instanceData?.name) && (
                                        <span className="req-text">This field is required</span>
                                    )}

                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Role : <span class="form-required">*</span></label>
                                    <select name="" id="" class="form-control"
                                        value={instanceData?.role}
                                        // defaultValue={instanceData?.role }
                                        disabled={!isedit && !isAdd}
                                        onChange={(e) => handleChange(e, "role")}>

                                        <option disabled selected value >-----------</option>

                                        {roles?.map((e, index) => (
                                            <option value={e?.id}>{e.name}</option>
                                        )
                                        )}
                                    </select>

                                    {(error && !instanceData?.role) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                    <input type="Number" class="form-control" name="category_name" maxLength="3"
                                        onChange={(e) => handleChange(e, "phone_number")}
                                        defaultValue={instanceData?.phone_number || ""}
                                        disabled={!isedit && !isAdd}
                                        required />

                                    {(error && !instanceData?.phone_number) && (
                                        <span className="req-text">This field is required</span>
                                    )}
                                </div>
                            </div>


                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Image :
                                        <span class="form-required">*</span></label>
                                    <input type="file" class="form-control"
                                        defaultValue={image || ""}
                                        disabled={!isedit && !isAdd}
                                        onChange={(e) => handleChange(e, "image")}

                                    />
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                    <input type="Date" class="form-control" name="category_name"
                                        onChange={(e) => handleChange(e, "start_date")}
                                        defaultValue={instanceData?.start_date || ""}
                                        disabled={!isedit && !isAdd}
                                        required />

                                    {(error && !instanceData?.start_date) && (
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
            </Dialog>
        </React.Fragment>
    );
}







export default Employee;


import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";


const Child = (props) => {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader, isedit, handleDateChange, image, setImage, errorMsg, errString,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList, streetList, buildingType, child,
        // setError, setImage, image 
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


                    <SelectDropDown
                        list={roles}
                        handleChange={handleChange}
                        selected={instanceData?.role}
                        showname={"name"}
                        name={"role"}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"role"}
                        label="Select Role"
                    />


                </Grid>
                <Grid item xs={12} md={6} sm={6}>


                    <TextInput
                        label="Phone Number"
                        placeholder="Name"
                        name="phone_number"
                        value={instanceData?.phone_number}
                        required={true}
                        handleChange={handleChange}
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

                    <BasicDatePicker
                        label="Join Date"
                        placeholder="Join Date"
                        name="start_date"
                        value={instanceData?.start_date}
                        required={true}
                        handleChange={handleChange}
                        handleDateChange={handleDateChange}
                        disabled={!isedit && !isAdd}
                        error={error}
                        errorMsg={errorMsg}
                        errorField={"start_date"}

                    />
                </Grid>

            </Grid>




        </>

    )
}



