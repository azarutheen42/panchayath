import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Config from "../Config";
import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ButtonWithLoader from "./Button"



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

};



function Employee(props) {


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


    const getRoles = () => {
        axios.get(`${Config.BASE_URL}roles/`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setRoles(response?.data?.filter((e) => e.type === 'ADMIN'))

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


console.log(roles,'hrets')

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



    const deleteEmployee = (id, load_state) => {

        setLoader(load_state)

        axios.get(`${Config.BASE_URL}permanentemployees/${id}/`,
            Config?.config

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    // setPermEmployee(permEmployee?.filter((e) => e.id !== id))
                    // setLoader()


                }

            })
            .catch(function (error) {
                console.log(error);
                setLoader()

            });

    }



    const getEmployee = async(id, edit, load_state) => {
        setLoader(load_state)

        axios.get(`${Config.BASE_URL}permanentemployees/${id}/`,
            Config?.config

        )
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    setEmployee(response?.data)
                    // setViewEmployee(response?.data)
                    setisEdit(edit)
                    // setIsOpen(true)
                    // setLoader(false)

                    // $('#myModal').modal('show')
                    // $('.modal-backdrop').show();

                }

            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)

            });

    }


    const getRoleLabel = (id) => {
        const label = roles?.find((e) => e.id === id)?.name
        return label
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


    return (


        <>

            {/* {
                isOpen && (
                    <ViewModal
                        setIsOpen={setIsOpen}
                        viewEmployee={viewEmployee}
                        getRoleLabel={getRoleLabel}
                        edit={isedit}
                        setViewEmployee={setViewEmployee}
                        setPermEmployee={setPermEmployee}
                        roles={roles}
                        handleClose={handleClose}
                        setImage={setImage}
                        error={setError}
                        image={image}
                    />
                )
            } */}


            {props?.path === "permenant" && (

                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Permanent Employee Details</h4>
                        </div>
                        <div class="page-btn">

                            <button class="btn btn-primary" onClick={() => setisAdd(true)}>
                                <span class="glyphicon glyphicon-user"></span> Add Employee
                            </button>


                            {(isOpen || isAdd) && (

                                <>



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

                                            <div class="modal-content">
                                                <h3
                                                    style={{ marginLeft: 20 }}
                                                >Permanent Employee Details</h3>
                                                <div class="modal-body">
                                                    <div class="card">
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
                                                                            defaultValue={employee?.name || ""}
                                                                            disabled={!isedit && !isAdd}
                                                                            required />

                                                                        {(error && !employee?.name) && (
                                                                            <span className="req-text">This field is required</span>
                                                                        )}

                                                                    </div>
                                                                </div>



                                                                {/* <div class="col-lg-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label class="form-label">Select Ward : <span class="form-required">*</span></label>
                                                                        <select name="" id="" className="report-dropdown"
                                                                            onChange={(e) => handleChange(e, "panchayat")}
                                                                            disabled={!isedit && !isAdd}
                                                                            value={employee?.panchayat}
                                                                      
                                                                        >
                                                                            <option disabled selected value >-----------</option>
                                                                            {panchayathList?.map((e, index) => (
                                                                                <option value={e?.id} key={index}>{e?.name}</option>
                                                                            ))}

                                                                        </select>
                                                                        {(error && !employee?.panchayat) && (
                                                                            <span className="req-text">{errStr}</span>
                                                                        )}
                                                                    </div>  
                                                                </div> */}



                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label class="form-label">Role : <span class="form-required">*</span></label>
                                                                        <select name="" id="" class="form-control"
                                                                            value={employee?.role}
                                                                            // defaultValue={employee?.role }
                                                                            disabled={!isedit && !isAdd}
                                                                            onChange={(e) => handleChange(e, "role")}>

                                                                            <option disabled selected value >-----------</option>

                                                                            {roles?.map((e, index) => (
                                                                                <option value={e?.id}>{e.name}</option>
                                                                            )
                                                                            )}
                                                                        </select>

                                                                        {(error && !employee?.role) && (
                                                                            <span className="req-text">This field is required</span>
                                                                        )}
                                                                        {/* <input type="text" class="form-control" name="category_name" required /> */}
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                                        <input type="Number" class="form-control" name="category_name" maxLength="3"
                                                                            onChange={(e) => handleChange(e, "phone_number")}
                                                                            defaultValue={employee?.phone_number || ""}
                                                                            disabled={!isedit && !isAdd}
                                                                            required />

                                                                        {(error && !employee?.phone_number) && (
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
                                                                            defaultValue={employee?.start_date || ""}
                                                                            disabled={!isedit && !isAdd}
                                                                            required />

                                                                        {(error && !employee?.start_date) && (
                                                                            <span className="req-text">This field is required</span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="modal-footer">
                                                    {isedit && (
                                                        <button type="submit" class="btn btn-success" onClick={() => updateEmployee(employee?.id)} >Save</button>
                                                    )}
                                                    {isAdd && (
                                                        <button type="submit" class="btn btn-success" onClick={addEmployee}>Save</button>
                                                    )}

                                                    <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
                                                </div>

                                            </div>




                                        </Box>
                                    </Modal>



                                </>
                            )}

                            {/* 
                                </div>
                            </div> */}



                            {/* view employee details */}

                        </div>
                    </div>
                    <div class="card">
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
                                                {/* <td>{emp?.role?.emp_role}</td> */}
                                                <td>{emp?.phone_number}</td>
                                                <td>{emp?.start_date}</td>
                                                <td>
                                                    {/* <button class="btn btn-success" onClick={() => getEmployee(emp?.id, true,"edit")} >
                                                        {(loader ==="edit" && emp?.id ===employee?.id) ? Config.loader :<span class="glyphicon glyphicon-pencil"></span>} Edit
                                                    </button> */}


                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => getEmployee(emp?.id, true, "edit")}
                                                        class_name="btn btn-success"
                                                        text="Edit1"
                                                        span_class="glyphicon glyphicon-pencil"
                                                    />

                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => getEmployee(emp?.id, true, "edit")}
                                                        class_name="btn btn-info"
                                                        text="View"
                                                        span_class="glyphicon glyphicon-pencil"
                                                    />



                                                    <ButtonWithLoader
                                                        itemId={emp?.id}
                                                        onClick={() => deleteEmployee(emp?.id, "delete")}
                                                        class_name="btn btn-danger"
                                                        text="Delete"
                                                        span_class="glyphicon glyphicon-pencil"
                                                    />


                                                    {/* <button class="btn btn-info"
                                                        // data-toggle="modal" data-target="#viewModal"
                                                        onClick={() => getEmployee(emp?.id, false, "view")}
                                                    >
                                                        {(loader === "view" && emp?.id === employee?.id) ? Config.loader : <span class="glyphicon glyphicon-pencil"></span>} View
                                                    </button>

                                                    <button class="btn btn-danger" onClick={() => deleteEmployee(emp?.id, "delete")}>
                                                        {(loader === "delete") ? Config.loader : <span class="glyphicon glyphicon-pencil"></span>} Delete
                                                    </button> */}
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



export default Employee;




function ViewModal(props) {

    const { setIsOpen, viewEmployee, getRoleLabel, edit, setViewEmployee, setPermEmployee, roles, handleClose, setError, setImage, image } = props



    const updateEmployee = (id) => {


        const data = new FormData()

        data.append("name", viewEmployee?.name)
        data.append("role", viewEmployee?.role)
        data.append("phone_number", viewEmployee?.phone_number)
        data.append("start_date", viewEmployee?.start_date)

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



    // const handleClose = () => setIsOpen(false);

    console.log(viewEmployee, image)

    const handleChange = (e, name) => {

        if (name === "image") {
            let value = e.target.files[0]

            const check = Config?.fileType(value.name)

            if (!check) {
                console.log("not supported")
                return
            }

            setImage(value)
        }

        else {

            const { value } = e.target

            setViewEmployee((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }


    }

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
                        >Permanent Employee Details</h3>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label
                                                    class="form-label"
                                                >Name :

                                                </label>
                                                <input type="text" class="form-control" name="category_name" onChange={(e) => handleChange(e, "name")}
                                                    defaultValue={viewEmployee?.name || ""} disabled={!edit}

                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label class="form-label">Role : <span class="form-required">*</span></label>

                                                <select name="" id="" class="form-control" disabled={!edit} onChange={(e) => handleChange(e, "role")}>
                                                    <option value="">{getRoleLabel(viewEmployee?.role)}</option>
                                                    <option value="" >-----------</option>
                                                    {roles?.map((e, index) => (
                                                        <option value={e?.id}>{e.name}</option>
                                                    )
                                                    )}

                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                <input type="Number" class="form-control" name="category_name"
                                                    onChange={(e) => handleChange(e, "phone_number")} defaultValue={viewEmployee?.phone_number || ""} disabled={!edit}
                                                    required />
                                            </div>
                                        </div>


                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label class="form-label">Image :
                                                    <span class="form-required">*</span></label>
                                                <input type="file" class="form-control"

                                                    onChange={(e) => handleChange(e, "image")}
                                                    disabled={!edit}

                                                    name="category_name" />
                                            </div>
                                        </div>


                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                <input type="Date" class="form-control" name="category_name"
                                                    onChange={(e) => handleChange(e, "start_date")} value={viewEmployee?.start_date} disabled={!edit}
                                                    required />
                                            </div>
                                        </div>

                                    </div>
                                </div>
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


