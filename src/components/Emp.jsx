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
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import CustomTable from "./Table";
import AlertDialog from "./Alert"



const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 600,
    // height: 600,
    // // bgcolor: 'background.paper',
    // // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,

};



function Employee(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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


    const handleClose = () => {
        setImage();
        // setIsView();
        setError();
        setIsOpen();
        setisEdit();
        setEmployee();
        setViewEmployee();
        setisAdd()
    }



    useEffect(() => {

        getPermemployee()
        getRoles()
        // gettempemployee()

    }, [])


    // META DATA
    const headersToShow = ["Image", "Name", "Position", "Contact No", "Joined"]
    const tableData = permEmployee
    const fieldsToShow = []
    const fields = {
        'image': (value) => value,
        'name': (value) => value,
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
                    setRoles(response?.data?.filter((e) => e.type === 1))

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

                }

            })
            .catch(function (error) {
                console.log(error);

            });


    }


    // Check form field validation
    const checkValidation = () => {

        if (!employee?.name || !employee?.phone_number || !employee?.start_date || !employee?.role) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
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

                    $('#myModal').hide();
                    $('.modal-backdrop').hide();
                    setEmployee()
                    handleClose();

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    const handleChange = (e, name) => {
        // const { value } = e.target
        // setEmployee((prevstate) => {
        //     return {
        //         ...prevstate, [name]: value
        //     }

        // })

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
            setEmployee((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }

    }

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
                console.log(error);

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
                    handleClose()
                    // setLoader()


                }

            })
            .catch(function (error) {
                console.log(error);
           

            });

    }



    return (


        <>

            {
                (isOpen || isAdd) && (

                    <CustomizedDialogs
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


                    />
                )
            }





            {props?.path === "permenant" && (

                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Permanent Employee Details</h4>
                        </div>
                        <div class="page-btn">

                            {/* <button class="btn btn-primary" onClick={() => setisAdd(true)}>
                                <span class="glyphicon glyphicon-user"></span> Add Employee
                            </button> */}
                            <AddButton
                                onClick={() => setisAdd(true)}
                                text={"Add Employee"}
                            />

                        </div>
                    </div>



                    {/* <div class="card">
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="table-info">
                                            <th>S.No</th>
                                            <td>Image</td>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Contact No</th>
                                            <th>Period of Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {permEmployee?.map((emp, index) => (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={emp?.image ? Config.MEDIA_URL + emp?.image : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>
                                                <td>{emp?.name}</td>
                                                <td>{getRoleLabel(emp?.role)}</td>
                                                <td>{emp?.role?.emp_role}</td>
                                                <td>{emp?.phone_number}</td>
                                                <td>{emp?.start_date}</td>
                                                <td>
                                                    <button class="btn btn-success" onClick={() => getEmployee(emp?.id, true,"edit")} >
                                                        {(loader ==="edit" && emp?.id ===employee?.id) ? Config.loader :<span class="glyphicon glyphicon-pencil"></span>} Edit
                                                    </button>


                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => getEmployee(emp?.id, true, index)}
                                                        class_name="btn btn-success"
                                                        text="View"
                                                        span_class="glyphicon glyphicon-pencil"
                                                        loader={loader}
                                                        index={index}
                                                    // key = {employee?.id}
                                                    />

                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => getEmployee(emp?.id, true, index)}
                                                        class_name="btn btn-info"
                                                        text="Edit"
                                                        span_class="glyphicon glyphicon-pencil"
                                                        loader={loader}
                                                        index={index}
                                                    />



                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => deleteEmployee(emp?.id, index)}
                                                        class_name="btn btn-danger"
                                                        text="Delete"
                                                        span_class="glyphicon glyphicon-pencil"
                                                        loader={loader}
                                                        index={index}
                                                    />


                                                    <button class="btn btn-info"
                                                        // data-toggle="modal" data-target="#viewModal"
                                                        onClick={() => getEmployee(emp?.id, false, "view")}
                                                    >
                                                        {(loader === "view" && ) ? Config.loader : <span class="glyphicon glyphicon-pencil"></span>} View
                                                    </button>

                                                    <button class="btn btn-danger" onClick={() => deleteEmployee(emp?.id, "delete")}>
                                                        {(loader === "delete") ? Config.loader : <span class="glyphicon glyphicon-pencil"></span>} Delete
                                                    </button>
                                                </td>
                                            </tr>

                                        ))}


                                    </tbody>
                                </table>
                            </div>



                            <br />
                        </div>
                    </div> */}

                    {/* <CustomTable
                        headers={["Image", "Name", "Position", "Contact No", "Joined"]}
                        data={permEmployee}
                        fieldsToShow={[]}
                        fields={{
                            'image': (value) => value,
                            'name': (value) => value,
                            'role': (role) => getRoleLabel(role),
                            'phone_number': (value) => value,
                            'start_date': (value) => value,
                        }}
                        // getInstanceData={() => getEmployee(emp?.id, false, "view")}
                        getInstanceData={getEmployee}
                        loader={loader}
                        setLoader={setLoader}
                    /> */}


                    <CustomTable
                        headers={headersToShow}
                        data={tableData}
                        fieldsToShow={fieldsToShow}
                        fields={fields}
                        // getInstanceData={() => getEmployee(emp?.id, false, "view")}
                        getInstanceData={getEmployee}
                        loader={loader}
                        setLoader={setLoader}
                    />



                </div>







            )}

            {props?.path === "contract" && (



                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Contract Employee Details</h4>
                        </div>
                        <div class="page-btn">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                <span class="glyphicon glyphicon-user"></span> Add Employee
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog modal-lg modal-dialog-centered">

                                    <div class="modal-content">

                                        {/* <form action="" method="post" id=""> */}
                                        <h3
                                            style={{ marginLeft: 20 }}
                                        >Contract Employee Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Name : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Role : <span class="form-required">*</span></label>
                                                                <select name="" id="" class="form-control">
                                                                    <option value="">Engineer</option>
                                                                    <option value="">Supervisor</option>
                                                                    <option value="">Member</option>
                                                                </select>

                                                                <input type="text" class="form-control" name="category_name" required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success">Sign up</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="table-info">
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Contact No</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>jeeva</td>
                                            <td>Worker</td>
                                            <td>123456789</td>

                                            <td>
                                                <button class="btn btn-success">
                                                    <span class="glyphicon glyphicon-pencil"></span> Edit
                                                </button>
                                                <button class="btn btn-info">
                                                    <span class="glyphicon glyphicon-eye-open"></span> View
                                                </button>
                                                <button class="btn btn-danger">
                                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>Siva</td>
                                            <td>Worker</td>
                                            <td>123456789</td>

                                            <td>
                                                <button class="btn btn-success">
                                                    <span class="glyphicon glyphicon-pencil"></span> Edit
                                                </button>
                                                <button class="btn btn-info">
                                                    <span class="glyphicon glyphicon-eye-open"></span> View
                                                </button>
                                                <button class="btn btn-danger">
                                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                                </button>
                                            </td>
                                        </tr>
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
            </BootstrapDialog>
        </React.Fragment>
    );
}







export default Employee;