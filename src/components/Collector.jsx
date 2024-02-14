import { useEffect, useState } from "react"
import Config from "../Config";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    // height: 600,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};



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

    const { path } = props;

    const component = {
        "house": <HouseCollector
            type="house"
        />,

        "street": <StreetCollector
            type="street"
        />,

        "shop":
            <ShopCollector
                type="shop"
            />,

        "overall-weighing":
            <OverallCollector
                type="overall"
            />

    }

    return component[path]

}



function HouseCollector(props) {


    const { type } = props

    const roles = useSelector((state) => state?.collector?.value);
    const wards = useSelector((state) => state?.ward?.value);

    const [housecollector, setHouseCollector] = useState([]);

    const [collector, setCollector] = useState();
    const [viewCollector, setViewCollector] = useState();

    const [ward, setWard] = useState();
    const [role, setRole] = useState();
    const [isView, setIsView] = useState();
    const [isAdd, setIsAdd] = useState();
    const [edit, setIsEdit] = useState();
    const [image, setImage] = useState();

    const [error, setError] = useState();



    const handleClose = () => setIsView(false);

    const handleAddClose = () => {
        setCollector()
        setIsAdd(false)
        setError(false)
        setImage()
        setIsView()


    }


    useEffect(() => {
        setRole(roles?.find((e) => e?.name === type))
    })


    // fetch all data
    useEffect(() => {

        getHouseCollectors()
    }, [])


    const getHouseCollectors = () => {

        axios.get(`${Config.BASE_URL}house-collector/`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setHouseCollector(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    // console.log(role, roles)




    // handle add values
    const handleChange = (e, name) => {

        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            setImage(value)
            // setCollector((prevstate) => {
            //     return {
            //         ...prevstate, [name]: value
            //     }

            // })
        }
        else {

            const { value } = e.target
            setCollector((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }



    }


    // handle edit values
    const handleEditChange = (e, name) => {
        console.log("trigger")


        if (name === "image") {
            let value = e.target.files[0]

            const check = Config?.fileType(value.name)

            if (!check) {
                console.log("not supported")
                return
            }
            setImage(value)
            // setViewCollector((prevstate) => ({
            //     ...prevstate,
            //     employee_info: {
            //         ...prevstate.employee_info,
            //         [name]: value
            //     }

            // }))
        }
        else {
            const { value } = e.target
            setViewCollector((prevstate) => ({
                ...prevstate,
                employee_info: {
                    ...prevstate.employee_info,
                    [name]: value
                }

            }))
        }

    }


    const checkValidation = () => {

        if (!collector?.name || !collector?.phone_number || !collector?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    // handle add employees

    const addContractEmployee = () => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", collector?.name)
        // data.append("ward_no", ward)
        data.append("phone_number", collector?.phone_number)
        data.append("start_date", collector?.start_date)
        data.append("role", role?.id)
       data.append("is_collector", true) 
       

        if (image) {
            data.append("image", image)
        }



        axios.post(`${Config.BASE_URL}contr-employees/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    addHouse(response?.data?.id)
                    setCollector()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    // add housecollector
    const addHouse = (id) => {

        const data = new FormData()

        data.append("employee", id)
        data.append("ward_no", ward)

        axios.post(`${Config.BASE_URL}house-collector/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setHouseCollector((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    setIsAdd(false)
                    // $('#myModal').hide();
                    // $('.modal-backdrop').hide();
                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    // delete housecollector
    const deleteHouseCollector = (id) => {
        console.log("deleting")

        axios.delete(`${Config.BASE_URL}house-collector/${id}/`

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setHouseCollector(housecollector?.filter((e) => e.id !== id))

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    const validate = () => {

        if (!viewCollector?.employee_info?.name || !viewCollector?.employee_info?.phone_number || !viewCollector?.employee_info?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }


    // update employee details
    const updateEmployee = (id, edit) => {

        const check = validate()

        if (!check) {
            return
        }

        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("name", viewCollector?.employee_info?.name)
        data.append("ward_no", ward)
        data.append("phone_number", viewCollector?.employee_info?.phone_number)
        data.append("start_date", viewCollector?.employee_info?.start_date)
        data.append("role", role?.id)
        if (image) {
            data.append("image", image)
        }



        // axios.put(`${Config.BASE_URL}contr-employees/${viewCollector?.employee_info?.id}/`,
        axios.patch(`${Config.BASE_URL}contr-employees/${viewCollector?.employee_info?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    updateWard()


                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


    // update ward
    const updateWard = (id, edit) => {
        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("ward_no", ward)
        data.append("employee", viewCollector?.employee)
        axios.patch(`${Config.BASE_URL}house-collector/${viewCollector?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setHouseCollector(prevArray => {
                        const index = prevArray.findIndex(obj => obj?.id === viewCollector?.id);
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ];
                        }
                        return prevArray;
                    });


                    setIsView(false)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }



    // get single collector
    const getHouseCollector = (id, edit) => {
        console.log("getting")

        axios.get(`${Config.BASE_URL}house-collector/${id}/`

        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response?.data);
                    setViewCollector(response?.data)
                    setWard(response?.data?.ward_no)
                    setIsView(true);
                    setIsEdit(edit)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    console.log(ward)
    // console.log(viewCollector, collector)


    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>House Collector Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add House collector
                    </button>


                    {/* modal content */}

                    {isAdd && (

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

                                        <h3 style={{ marginLeft: 20 }}>House collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">House collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "name")} defaultValue={collector?.name}
                                                                    name="name" />
                                                                {(error && !collector?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="WARD" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e?.target?.value)}
                                                                // defaultValue={ward || ""}
                                                                >

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>
                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control" onChange={(e) => handleChange(e, "phone_number")} defaultValue={collector?.phone_number || ""}
                                                                    name="phone_number" />
                                                                {(error && !collector?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    defaultValue={collector?.image || ""}
                                                                    onChange={(e) => handleChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "description")}
                                                                    name="description" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={collector?.start_date || ""}
                                                                    onChange={(e) => handleChange(e, "start_date")}
                                                                    required />

                                                                {(error && !collector?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success" onClick={addContractEmployee}>Save</button>
                                            <button type="button" class="btn btn-danger"
                                                onClick={handleAddClose}
                                            // data-dismiss="modal"
                                            >Close</button>
                                        </div>

                                    </div>

                                </Box>
                            </Modal>

                        </>
                    )}





                    {isView && (

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
                                        <h3 style={{ marginLeft: 20 }}>House collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">House collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "name")} defaultValue={viewCollector?.employee_info?.name || ""}
                                                                    disabled={!edit}

                                                                    name="category_name" />

                                                                {(error && !viewCollector?.employee_info?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e?.target?.value)}
                                                                    disabled={!edit}
                                                                    // defaultValue={viewCollector?.ward?.id || ""}
                                                                    value={viewCollector?.ward?.id}

                                                                >
                                                                    {/* <option value={viewCollector?.ward?.id}>{viewCollector?.ward?.ward_no}</option> */}

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>


                                                                {(error && !viewCollector?.ward?.id) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "phone_number")} defaultValue={viewCollector?.employee_info?.phone_number || ""}
                                                                    disabled={!edit}
                                                                    name="category_code" />

                                                                {(error && !viewCollector?.employee_info?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "image")}
                                                                    name="category_name" />
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleEditChange(e, "description")}
                                                                    disabled={!edit}
                                                                    name="category_desc" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="category_name" defaultValue={viewCollector?.employee_info?.start_date || ""}
                                                                    disabled={!edit}
                                                                    onChange={(e) => handleEditChange(e, "start_date")}
                                                                    required />

                                                                {(error && !viewCollector?.employee_info?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {edit && (
                                                <button type="submit" class="btn btn-success" onClick={updateEmployee}>Save</button>
                                            )}
                                            <button type="button" class="btn btn-danger" onClick={handleClose}
                                                data-dismiss="modal">Close</button>
                                        </div>

                                    </div>




                                </Box>
                            </Modal>


                        </>
                    )}


                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-info">
                                    <th  >S.No</th>
                                    <th>Image</th>
                                    <th  >Name</th>
                                    <th  >Contact No</th>
                                    <th  >Ward No</th>
                                    <th  >Description</th>
                                    <th  >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {housecollector?.map((e, index) =>

                                (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={e?.employee_info?.image ?
                                            // Config.BASE_URL + 
                                            e?.employee_info?.image
                                            : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>
                                        {/* <td><img src={e?.employee_info?.image} className="emp-thumb" /></td> */}
                                        <td>{e?.employee_info?.name}</td>
                                        <td>{e?.employee_info?.phone_number}</td>
                                        <td>{e?.ward?.ward_no}</td>
                                        <td>House Collector</td>
                                        <td>
                                            <button class="btn btn-success" onClick={() => getHouseCollector(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil" ></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getHouseCollector(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open" ></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteHouseCollector(e?.id)}>
                                                <span class="glyphicon glyphicon-trash" ></span> Delete
                                            </button>
                                        </td>
                                    </tr>)

                                )}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

function ShopCollector(props) {


    const { type } = props

    const title = "Shop"
    const url = "shop-collector"

    const roles = useSelector((state) => state?.collector?.value);
    const wards = useSelector((state) => state?.ward?.value);

    const [collectorList, setCollectorList] = useState();

    const [collector, setCollector] = useState();
    const [viewCollector, setViewCollector] = useState();
    const [image, setImage] = useState();

    const [ward, setWard] = useState();
    const [role, setRole] = useState();
    const [isView, setIsView] = useState();
    const [isAdd, setIsAdd] = useState();
    const [edit, setIsEdit] = useState();

    const [error, setError] = useState();

    const handleClose = () => setIsView(false);

    const handleAddClose = () => {
        setCollector()
        setIsAdd(false)
        setError(false)
        setImage()
        setIsView()


    }


    useEffect(() => {
        setRole(roles?.find((e) => e?.name === type))
    })


    // fetch all data
    useEffect(() => {

        getAllCollectors()
    }, [])


    const getAllCollectors = () => {

        axios.get(`${Config.BASE_URL + url}`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    console.log(role, roles)


    // handle add values
    const handleChange = (e, name) => {

        if (name === "image") {
            const check = Config?.fileType(e.target.files[0].name)

            if (!check) {
                console.log("not supported")
                return
            }
            console.log(e.target.files[0].name)
            let value = e.target.files[0]
            // setCollector((prevstate) => {
            //     return {
            //         ...prevstate, [name]: setImage
            //     }

            // })
            setImage(value)
        }
        else {

            const { value } = e.target
            setCollector((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }



    }





    // check validation
    const checkValidation = () => {

        if (!collector?.name || !collector?.phone_number || !collector?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true

        }

    }


    // handle add contract employees

    const addContractEmployee = () => {


        const check = checkValidation()

        if (!check) {
            return
        }
        const data = new FormData()

        data.append("name", collector?.name)
        // data.append("ward_no", ward)
        data.append("phone_number", collector?.phone_number)
        data.append("start_date", collector?.start_date)
        data.append("role", role?.id)
        data.append("is_collector", true) 
        if (image) {
            data.append("image", image)
        }

        axios.post(`${Config.BASE_URL + emp_url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    createCollector(response?.data?.id)
                    setCollector()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    // add collector
    const createCollector = (id) => {

        const data = new FormData()

        data.append("employee", id)
        data.append("ward_no", ward)

        axios.post(`${Config.BASE_URL + url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setCollectorList((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    setIsAdd(false)
                    // $('#myModal').hide();
                    // $('.modal-backdrop').hide();
                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    // delete collectorList
    const deleteCollector = (id) => {
        console.log("deleting")

        axios.delete(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setCollectorList(collectorList?.filter((e) => e.id !== id))

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }





    // handle edit values
    const handleEditChange = (e, name) => {
        console.log("trigger")


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
            setViewCollector((prevstate) => ({
                ...prevstate,
                employee_info: {
                    ...prevstate.employee_info,
                    [name]: value
                }

            }))
        }

    }



    // update employee details
    const updateEmployee = (id, edit) => {


        if (!viewCollector?.employee_info?.name || !viewCollector?.employee_info?.phone_number || !viewCollector?.employee_info?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return
        }
        setError(false)


        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("name", viewCollector?.employee_info?.name)
        data.append("ward_no", ward)
        data.append("phone_number", viewCollector?.employee_info?.phone_number)
        data.append("start_date", viewCollector?.employee_info?.start_date)
        data.append("role", role?.id)

        if (image) {
            data.append("image", image)
        }

        axios.patch(`${Config.BASE_URL + emp_url}/${viewCollector?.employee_info?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    updateWard()


                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }


    // update ward
    const updateWard = (id, edit) => {
        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("ward_no", ward)
        data.append("employee", viewCollector?.employee)
        axios.patch(`${Config.BASE_URL + url}/${viewCollector?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(prevArray => {
                        const index = prevArray.findIndex(obj => obj?.id === viewCollector?.id);
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ];
                        }
                        return prevArray;
                    });


                    setIsView(false)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }



    // get single collector
    const getCollector = (id, edit) => {
        console.log("getting")

        axios.get(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response?.data);
                    setViewCollector(response?.data)
                    setWard(response?.data?.ward_no)
                    setIsView(true);
                    setIsEdit(edit)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    console.log(viewCollector, collector)


    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>{title}  Collector Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add {title}  collector
                    </button>


                    {/* modal content */}

                    {isAdd && (

                        <>

                            <Modal

                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box
                                    sx={style}
                                >

                                    <div class="modal-content">

                                        <h3 style={{ marginLeft: 20 }}>{title}  Collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "name")} defaultValue={collector?.name}
                                                                    name="name" />
                                                                {(error && !collector?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}

                                                                >

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>
                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control" onChange={(e) => handleChange(e, "phone_number")} defaultValue={collector?.phone_number || ""}
                                                                    name="phone_number" />
                                                                {(error && !collector?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    defaultValue={collector?.image || ""}
                                                                    onChange={(e) => handleChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "description")}
                                                                    name="description" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={collector?.start_date || ""}
                                                                    onChange={(e) => handleChange(e, "start_date")}
                                                                    required />

                                                                {(error && !collector?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success" onClick={addContractEmployee}>Save</button>
                                            <button type="button" class="btn btn-danger"
                                                onClick={handleAddClose}

                                            >Close</button>
                                        </div>

                                    </div>

                                </Box>
                            </Modal>

                        </>
                    )}





                    {isView && (

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
                                        <h3 style={{ marginLeft: 20 }}>{title}  collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "name")} defaultValue={viewCollector?.employee_info?.name || ""}
                                                                    disabled={!edit}
                                                                    name="name" />

                                                                {(error && !viewCollector?.employee_info?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}
                                                                    disabled={!edit}
                                                                    value={viewCollector?.ward?.id}

                                                                >
                                                                    {/* <option value={viewCollector?.ward?.id}>{viewCollector?.ward?.ward_no}</option> */}

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>


                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}


                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "phone_number")} defaultValue={viewCollector?.employee_info?.phone_number || ""}
                                                                    disabled={!edit}
                                                                    name="phone_number" />
                                                            </div>

                                                            {(error && !viewCollector?.employee_info?.phone_number) && (
                                                                <span className="req-text">This field is required</span>
                                                            )}
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"

                                                                    onChange={(e) => handleEditChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleEditChange(e, "description")}
                                                                    disabled={!edit}
                                                                    name="description" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={viewCollector?.employee_info?.start_date || ""}
                                                                    disabled={!edit}
                                                                    onChange={(e) => handleEditChange(e, "start_date")}
                                                                    required />

                                                                {(error && !viewCollector?.employee_info?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {edit && (
                                                <button type="submit" class="btn btn-success" onClick={updateEmployee}>Save</button>
                                            )}
                                            <button type="button" class="btn btn-danger" onClick={handleClose}
                                                data-dismiss="modal">Close</button>
                                        </div>

                                    </div>




                                </Box>
                            </Modal>


                        </>
                    )}


                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-info">
                                    <th  >S.No</th>
                                    <th>Image</th>
                                    <th  >Name</th>
                                    <th  >Contact No</th>
                                    <th  >Ward No</th>
                                    <th  >Description</th>
                                    <th  >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {collectorList?.map((e, index) =>

                                (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={e?.employee_info?.image ?
                                            // Config.BASE_URL +
                                            e?.employee_info?.image : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>
                                        {/* <td><img src={e?.employee_info?.image} className="emp-thumb" /></td> */}
                                        <td>{e?.employee_info?.name}</td>
                                        <td>{e?.employee_info?.phone_number}</td>
                                        <td>{e?.ward?.ward_no}</td>
                                        <td>{title}  Collector</td>
                                        <td>
                                            <button class="btn btn-success" onClick={() => getCollector(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil" ></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getCollector(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open" ></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteCollector(e?.id)}>
                                                <span class="glyphicon glyphicon-trash" ></span> Delete
                                            </button>
                                        </td>
                                    </tr>)

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}
// --------------------------------------------------------------------------------

function StreetCollector(props) {


    const { type } = props

    const title = "Street"
    const url = "street-collector"

    const roles = useSelector((state) => state?.collector?.value);
    const wards = useSelector((state) => state?.ward?.value);

    const [collectorList, setCollectorList] = useState();

    const [collector, setCollector] = useState();
    const [viewCollector, setViewCollector] = useState();
    const [image, setImage] = useState();


    const [ward, setWard] = useState();
    const [role, setRole] = useState();
    const [isView, setIsView] = useState();
    const [isAdd, setIsAdd] = useState();
    const [edit, setIsEdit] = useState();

    const [error, setError] = useState();

    const handleClose = () => setIsView(false);

    const handleAddClose = () => {
        setCollector()
        setIsAdd(false)
        setError(false)
        setImage()
        setIsView()


    }


    useEffect(() => {
        setRole(roles?.find((e) => e?.name === type))
    })


    // fetch all data
    useEffect(() => {

        getAllCollectors()
    }, [])


    const getAllCollectors = () => {

        axios.get(`${Config.BASE_URL + url}`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    // handle add values
    const handleChange = (e, name) => {

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
            setCollector((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }



    }


    // check validation

    const checkValidation = () => {

        if (!collector?.name || !collector?.phone_number || !collector?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true
        }

    }



    // handle add contract employees

    const addContractEmployee = () => {

        const check = checkValidation()

        if (!check) {
            return
        }


        const data = new FormData()

        data.append("name", collector?.name)
        // data.append("ward_no", ward)
        data.append("phone_number", collector?.phone_number)
        data.append("start_date", collector?.start_date)
        data.append("role", role?.id)
        data.append("is_collector", true) 

        if (image) {
            data.append("image", image)
        }
        axios.post(`${Config.BASE_URL + emp_url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    createCollector(response?.data?.id)
                    setCollector()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }





    // handle edit employee
    // const handleEditChange = (e, name) => {
    //     console.log("trigger")
    //     const { value } = e.target

    //     if (name === "tractor_no") {
    //         setViewCollector((prevstate) => {
    //             return { ...prevstate, [name]: value }
    //         })

    //         return
    //     }

    //     setViewCollector((prevstate) => ({
    //         ...prevstate,
    //         employee_info: {
    //             ...prevstate.employee_info,
    //             [name]: value
    //         }

    //     }))

    // }


    // handle edit employee details
    const handleEditChange = (e, name) => {
        console.log("trigger")


        if (name === "image") {
            let value = e.target.files[0]

            const check = Config?.fileType(value.name)

            if (!check) {
                console.log("not supported")
                return
            }

            setImage(value)
        }

        else if (name === "tractor_no") {
            setViewCollector((prevstate) => {
                return { ...prevstate, [name]: value }
            })

            return
        }

        else {
            const { value } = e.target
            setViewCollector((prevstate) => ({
                ...prevstate,
                employee_info: {
                    ...prevstate.employee_info,
                    [name]: value
                }

            }))
        }

    }


    // update employee details
    const updateEmployee = (id, edit) => {


        if (!viewCollector?.employee_info?.name || !viewCollector?.employee_info?.phone_number || !viewCollector?.employee_info?.start_date || !ward) {
            console.log("please fill required fields")
            setError(true)
            return


        }
        setError(false)

        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("name", viewCollector?.employee_info?.name)
        data.append("ward_no", ward)
        data.append("phone_number", viewCollector?.employee_info?.phone_number)
        data.append("start_date", viewCollector?.employee_info?.start_date)
        data.append("role", role?.id)
        if (image) {
            data.append("image", image)
        }
        axios.patch(`${Config.BASE_URL + emp_url}/${viewCollector?.employee_info?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    updateCollector()


                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }






    // add collector
    const createCollector = (id) => {

        const data = new FormData()

        data.append("employee", id)
        data.append("ward_no", ward)
        data.append("tractor_no", collector?.tractor_no)

        axios.post(`${Config.BASE_URL + url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setCollectorList((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    setIsAdd(false)
                    // $('#myModal').hide();
                    // $('.modal-backdrop').hide();
                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    // delete collectorList
    const deleteCollector = (id) => {
        console.log("deleting")

        axios.delete(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setCollectorList(collectorList?.filter((e) => e.id !== id))

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    // update collector
    const updateCollector = (id, edit) => {
        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("ward_no", ward)
        data.append("employee", viewCollector?.employee)
        data.append("tractor_no", viewCollector?.tractor_no)
        axios.patch(`${Config.BASE_URL + url}/${viewCollector?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(prevArray => {
                        const index = prevArray.findIndex(obj => obj?.id === viewCollector?.id);
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ];
                        }
                        return prevArray;
                    });


                    setIsView(false)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }



    // get single collector
    const getCollector = (id, edit) => {
        console.log("getting")

        axios.get(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response?.data);
                    setViewCollector(response?.data)
                    setWard(response?.data?.ward_no)
                    setIsView(true);
                    setIsEdit(edit)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    console.log(viewCollector, collector)


    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>{title}  Collector Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add {title}  collector
                    </button>


                    {/* modal content */}

                    {isAdd && (

                        <>

                            <Modal

                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box
                                    sx={style}
                                >

                                    <div class="modal-content">

                                        <h3 style={{ marginLeft: 20 }}>{title}  Collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "name")} defaultValue={collector?.name}
                                                                    name="name" />
                                                                {(error && !collector?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}

                                                                >

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>
                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control" onChange={(e) => handleChange(e, "phone_number")} defaultValue={collector?.phone_number || ""}
                                                                    name="phone_number" />
                                                                {(error && !collector?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    defaultValue={collector?.image || ""}
                                                                    onChange={(e) => handleChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Tractor No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="tractor_no" onChange={(e) => handleChange(e, "tractor_no")} />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "description")}
                                                                    name="description" />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={collector?.start_date || ""}
                                                                    onChange={(e) => handleChange(e, "start_date")}
                                                                    required />

                                                                {(error && !collector?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success" onClick={addContractEmployee}>Save</button>
                                            <button type="button" class="btn btn-danger"
                                                onClick={handleAddClose}

                                            >Close</button>
                                        </div>

                                    </div>

                                </Box>
                            </Modal>

                        </>
                    )}





                    {isView && (

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
                                        <h3 style={{ marginLeft: 20 }}>{title}  collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "name")} defaultValue={viewCollector?.employee_info?.name || ""}
                                                                    disabled={!edit}
                                                                    name="name" />

                                                                {(error && !viewCollector?.employee_info?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}
                                                                    disabled={!edit}
                                                                    value={viewCollector?.ward?.id}


                                                                >
                                                                    {/* <option value={viewCollector?.ward?.id}>{viewCollector?.ward?.ward_no}</option> */}

                                                                    <option disabled selected value >-----------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>

                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}


                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "phone_number")} defaultValue={viewCollector?.employee_info?.phone_number || ""}
                                                                    disabled={!edit}
                                                                    name="phone_number" />


                                                                {(error && !viewCollector?.employee_info?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    // defaultValue={viewCollector?.employee_info?.image || ""}
                                                                    onChange={(e) => handleEditChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Tractor No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="tractor_no"
                                                                    defaultValue={viewCollector?.tractor_no || ""}
                                                                    onChange={(e) => handleEditChange(e, "tractor_no")} />
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleEditChange(e, "description")}
                                                                    disabled={!edit}
                                                                    name="description" />
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={viewCollector?.employee_info?.start_date || ""}
                                                                    disabled={!edit}
                                                                    onChange={(e) => handleEditChange(e, "start_date")}
                                                                    required />

                                                                {(error && !viewCollector?.employee_info?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {edit && (
                                                <button type="submit" class="btn btn-success" onClick={updateEmployee}>Save</button>
                                            )}
                                            <button type="button" class="btn btn-danger" onClick={handleClose}
                                                data-dismiss="modal">Close</button>
                                        </div>

                                    </div>




                                </Box>
                            </Modal>


                        </>
                    )}


                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-info">
                                    <th  >S.No</th>
                                    <th>Image</th>
                                    <th  >Name</th>
                                    <th  >Contact No</th>
                                    <th  >Ward No</th>
                                    <th>Tractor No</th>
                                    <th  >Description</th>
                                    <th  >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {collectorList?.map((e, index) =>

                                (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={e?.employee_info?.image ?
                                            // Config.BASE_URL + 
                                            e?.employee_info?.image : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>
                                        {/* <td><img src={e?.employee_info?.image} className="emp-thumb" /></td> */}

                                        <td>{e?.employee_info?.name}</td>
                                        <td>{e?.employee_info?.phone_number}</td>
                                        <td>
                                            {e?.ward?.map((e, index) => (
                                                <span>{e?.ward_no}</span>

                                            ))}
                                        </td>
                                        <td>{e?.tractor_no}</td>

                                        <td>{title} Collector</td>
                                        <td>
                                            <button class="btn btn-success" onClick={() => getCollector(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil" ></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getCollector(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open" ></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteCollector(e?.id)}>
                                                <span class="glyphicon glyphicon-trash" ></span> Delete
                                            </button>
                                        </td>
                                    </tr>)

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}


function OverallCollector(props) {


    const { type } = props

    const title = "Overall"
    const url = "overall-collector"

    const roles = useSelector((state) => state?.collector?.value);
    const wards = useSelector((state) => state?.ward?.value);

    const [collectorList, setCollectorList] = useState();

    const [collector, setCollector] = useState();
    const [viewCollector, setViewCollector] = useState();
    const [image, setImage] = useState();

    const [ward, setWard] = useState();
    const [role, setRole] = useState();
    const [isView, setIsView] = useState();
    const [isAdd, setIsAdd] = useState();
    const [edit, setIsEdit] = useState();

    const [error, setError] = useState();

    const handleClose = () => setIsView(false);

    const handleAddClose = () => {
        setCollector()
        setIsAdd(false)
        setError(false)
        setImage()
        setIsView()


    }


    useEffect(() => {
        setRole(roles?.find((e) => e?.name === type))
    })


    // fetch all data
    useEffect(() => {

        getAllCollectors()
    }, [])


    const getAllCollectors = () => {

        axios.get(`${Config.BASE_URL + url}`,
            Config?.config
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(response?.data)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    // handle add values
    const handleChange = (e, name) => {

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
            setCollector((prevstate) => {
                return {
                    ...prevstate, [name]: value
                }

            })

        }



    }



    // handle edit values
    // const handleEditChange = (e, name) => {
    //     console.log("trigger")
    //     const { value } = e.target

    //     if (name === "tractor_no") {
    //         setViewCollector((prevstate) => {
    //             return { ...prevstate, [name]: value }
    //         })

    //         return
    //     }

    //     setViewCollector((prevstate) => ({
    //         ...prevstate,
    //         employee_info: {
    //             ...prevstate.employee_info,
    //             [name]: value
    //         }

    //     }))

    // }


    const handleEditChange = (e, name) => {
        console.log("trigger")


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
            setViewCollector((prevstate) => ({
                ...prevstate,
                employee_info: {
                    ...prevstate.employee_info,
                    [name]: value
                }

            }))
        }

    }

    // check validation
    const checkValidation = () => {

        if (!collector?.name || !collector?.phone_number || !collector?.start_date) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            // addContractEmployee()
            return true
        }

    }


    // handle add contract employees

    const addContractEmployee = () => {

        const check = checkValidation()

        if (!check) {
            return
        }
        const data = new FormData()

        data.append("name", collector?.name)
        // data.append("ward_no", ward)
        data.append("phone_number", collector?.phone_number)
        data.append("start_date", collector?.start_date)
        data.append("role", role?.id)
        data.append("is_collector", true) 

        if (image) {
            data.append("image", image)
        }


        axios.post(`${Config.BASE_URL + emp_url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    createCollector(response?.data?.id)
                    setCollector()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }


    // update employee details
    const updateEmployee = (id, edit) => {

        if (!viewCollector?.employee_info?.name || !viewCollector?.employee_info?.phone_number || !viewCollector?.employee_info?.start_date) {
            console.log("please fill required fields")
            setError(true)
            return


        }

        setError(false)

        console.log(viewCollector, "enter")
        const data = new FormData()

        data.append("name", viewCollector?.employee_info?.name)
        // data.append("ward_no", ward)
        data.append("phone_number", viewCollector?.employee_info?.phone_number)
        data.append("start_date", viewCollector?.employee_info?.start_date)
        data.append("role", role?.id)

        if (image) {
            data.append("image", image)
        }

        axios.patch(`${Config.BASE_URL + emp_url}/${viewCollector?.employee_info?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    updateCollector()


                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }






    // add collector
    const createCollector = (id) => {

        const data = new FormData()

        data.append("employee", id)
        // data.append("ward_no", ward)
        // data.append("tractor_no", collector?.tractor_no)

        axios.post(`${Config.BASE_URL + url}/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setCollectorList((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    setIsAdd(false)
                    // $('#myModal').hide();
                    // $('.modal-backdrop').hide();
                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }

    // delete collectorList
    const deleteCollector = (id) => {
        console.log("deleting")

        axios.delete(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setCollectorList(collectorList?.filter((e) => e.id !== id))

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    // update collector
    const updateCollector = (id, edit) => {
        console.log(viewCollector, "enter")
        const data = new FormData()

        // data.append("ward_no", ward)
        data.append("employee", viewCollector?.employee)
        // data.append("tractor_no", viewCollector?.tractor_no)
        axios.patch(`${Config.BASE_URL + url}/${viewCollector?.id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCollectorList(prevArray => {
                        const index = prevArray.findIndex(obj => obj?.id === viewCollector?.id);
                        if (index !== -1) {
                            return [
                                ...prevArray.slice(0, index),
                                { ...prevArray[index], ...response.data },
                                ...prevArray.slice(index + 1),
                            ];
                        }
                        return prevArray;
                    });


                    setIsView(false)

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }



    // get single collector
    const getCollector = (id, edit) => {
        console.log("getting")

        axios.get(`${Config.BASE_URL + url}/${id}/`

        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response?.data);
                    setViewCollector(response?.data)
                    setIsView(true);
                    setIsEdit(edit)

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }




    console.log(viewCollector, collector)


    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>{title}  Collector Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add {title}  collector
                    </button>


                    {/* modal content */}

                    {isAdd && (

                        <>

                            <Modal

                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box
                                    sx={style}
                                >

                                    <div class="modal-content">

                                        <h3 style={{ marginLeft: 20 }}>{title}  Collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "name")} defaultValue={collector?.name}
                                                                    name="name" />
                                                                {(error && !collector?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}

                                                                >
                                                                    <option >-------------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>
                                                                {(error && !ward) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div> */}
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control" onChange={(e) => handleChange(e, "phone_number")} defaultValue={collector?.phone_number || ""}
                                                                    name="phone_number" />
                                                                {(error && !collector?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Tractor No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="tractor_no" onChange={(e) => handleChange(e, "tractor_no")} />
                                                            </div>
                                                        </div> */}
                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleChange(e, "description")}
                                                                    name="description" />
                                                            </div>
                                                        </div> */}

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"
                                                                    defaultValue={collector?.image || ""}
                                                                    onChange={(e) => handleChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>



                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={collector?.start_date || ""}
                                                                    onChange={(e) => handleChange(e, "start_date")}
                                                                    required />

                                                                {(error && !collector?.start_date) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success" onClick={addContractEmployee}>Save</button>
                                            <button type="button" class="btn btn-danger"
                                                onClick={handleAddClose}

                                            >Close</button>
                                        </div>

                                    </div>

                                </Box>
                            </Modal>

                        </>
                    )}





                    {isView && (

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
                                        <h3 style={{ marginLeft: 20 }}>{title}  collector Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">{title}  collector Name :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "name")} defaultValue={viewCollector?.employee_info?.name || ""}
                                                                    disabled={!edit}
                                                                    name="name" />

                                                                {(error && !viewCollector?.employee_info?.name) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}

                                                            </div>
                                                        </div>



                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span
                                                                    class="form-required">*</span></label>
                                                                <select name="ward" id=""
                                                                    className="custom-dropdown" onChange={(e) => setWard(e.target.value)}
                                                                    disabled={!edit}


                                                                >
                                                                    <option value={viewCollector?.ward?.id}>{viewCollector?.ward?.ward_no}</option>
                                                                    <option disabled>-------------</option>
                                                                    {wards?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}


                                                                </select>

                                                            </div>
                                                        </div> */}


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span
                                                                    class="form-required">*</span></label>
                                                                <input type="number" class="form-control"
                                                                    onChange={(e) => handleEditChange(e, "phone_number")} defaultValue={viewCollector?.employee_info?.phone_number || ""}
                                                                    disabled={!edit}
                                                                    name="phone_number" />

                                                                {(error && !viewCollector?.employee_info?.phone_number) && (
                                                                    <span className="req-text">This field is required</span>
                                                                )}


                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Image :
                                                                    <span class="form-required">*</span></label>
                                                                <input type="file" class="form-control"

                                                                    onChange={(e) => handleEditChange(e, "image")}

                                                                    name="category_name" />
                                                            </div>
                                                        </div>

                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Tractor No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="tractor_no"
                                                                    defaultValue={viewCollector?.tractor_no || ""}
                                                                    onChange={(e) => handleEditChange(e, "tractor_no")} />
                                                            </div>
                                                        </div> */}
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Description :</label>
                                                                <input type="text" class="form-control" onChange={(e) => handleEditChange(e, "description")}
                                                                    disabled={!edit}
                                                                    name="description" />
                                                            </div>
                                                        </div>
                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Period of Time : <span class="form-required">*</span></label>
                                                                <input type="Date" class="form-control" name="start_date" defaultValue={viewCollector?.employee_info?.start_date || ""}
                                                                    disabled={!edit}
                                                                    onChange={(e) => handleEditChange(e, "start_date")}
                                                                    required />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {edit && (
                                                <button type="submit" class="btn btn-success" onClick={updateEmployee}>Save</button>
                                            )}
                                            <button type="button" class="btn btn-danger" onClick={handleClose}
                                                data-dismiss="modal">Close</button>
                                        </div>

                                    </div>




                                </Box>
                            </Modal>


                        </>
                    )}


                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="table-info">
                                    <th  >S.No</th>
                                    <th>Image</th>
                                    {/* <th  >Ward No</th> */}
                                    <th  >Name</th>
                                    {/* <th>Tractor No</th> */}
                                    <th  >Contact No</th>
                                    {/* <th  >Description</th> */}
                                    <th  >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {collectorList?.map((e, index) =>

                                (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={e?.employee_info?.image ?
                                            //  Config.BASE_URL +
                                            e?.employee_info?.image : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>
                                        {/* <td><img src={e?.employee_info?.image} className="emp-thumb" /></td> */}
                                        {/* <td>    
                                            {e?.ward?.map((e, index) => (
                                                <span>{e?.ward_no}</span>

                                            ))}
                                        </td> */}
                                        <td>{e?.employee_info?.name}</td>
                                        {/* <td>{e?.tractor_no}</td> */}
                                        <td>{e?.employee_info?.phone_number}</td>
                                        {/* <td>{title} Collector</td> */}
                                        <td>
                                            <button class="btn btn-success" onClick={() => getCollector(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil" ></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getCollector(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open" ></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteCollector(e?.id)}>
                                                <span class="glyphicon glyphicon-trash" ></span> Delete
                                            </button>
                                        </td>
                                    </tr>)

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}