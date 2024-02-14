import { useEffect, useState } from "react"
import axios from "axios"
import Config from "../Config"
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 600,
    width: 600,

};

const errStr = "This Field is Required"

function Panchayat() {


    // const panchayathList = useSelector((state) => state?.panchayath?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

   
    const [panchayathList,setPanchayathList]=useState();
    const [addPanchayat, setAddPanchayath] = useState();

    const [view, setIsView] = useState(false);
    const [isedit, setIsEdit] = useState(false);
    const [add, setIsAdd] = useState(false);
    const [error, setError] = useState(false)


    const handleClose = () => {
        setIsView(false);
        setIsAdd(false)
        setAddPanchayath()
        setIsEdit(false);

    }


    useEffect(()=>{
        getPanchayaths()
    },[])



    // handle add values
    const handleChange = (e, name) => {
        const { value } = e.target
        setAddPanchayath((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })

    }



    const getPanchayaths = () => {
        axios.get(`${Config.BASE_URL}get-panchayath`,
          Config?.config
        )
          .then(function (response) {
            if (response.status === 200) {
                setPanchayathList(response.data)
    
            }
    
          })
          .catch(function (error) {
            console.log(error);
    
          });
    
    
      }

    // get single district
    const getPanchayath = (id, edit) => {
        setAddPanchayath(panchayathList?.find((e) => e?.id === id));
        setIsView(true);
        setIsEdit(edit);

    }


    // 
    const checkValidation = () => {

        if (!addPanchayat?.district || !addPanchayat?.city || !addPanchayat?.name) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true

        }

    }


    const createPanchayath = (() => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("district", addPanchayat?.district)
        data.append("city", addPanchayat?.city)
        data.append("name", addPanchayat?.name)

        axios.post(`${Config.BASE_URL}get-panchayath`,
        data,Config?.config
      )
        .then(function (response) {
  
          if (response.status === 201) {          
            setPanchayathList((prevstate) => {
                return [...prevstate, response?.data]
            })
            handleClose()
  
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
            
  
          }
        });



    })



    // edit city name
    const updatePanchayath = (id) => {


        const check = checkValidation()

        if (!check) {
            return
        }


        const data = new FormData()

        data.append("district", addPanchayat?.district)
        data.append("city", addPanchayat?.city)
        data.append("name", addPanchayat?.name)

        axios.put(`${Config.BASE_URL}get-panchayath/${id}/`,
        data,Config?.config
      )
        .then(function (response) {
  
          if (response.status === 200) {          
            setPanchayathList(prevArray => {
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
           
            handleClose()
  
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
            // Config.logout()
  
          }
        });

    }



    // delete district
    const deletePanchayath = (id) => {

        axios.delete(`${Config.BASE_URL}get-panchayath/${id}/`,
        Config?.config
      )
        .then(function (response) {
  
          if (response.status === 204) {          
            setPanchayathList(panchayathList?.filter((e) => e.id !== id))
            handleClose()
  
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
          
  
          }
        });

    }






    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Panchayath Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add Panchayath
                    </button>


                    {(view || add || isedit) && (
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
                                        <h3 style={{ marginLeft: 20 }}>Panchayath Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select District : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    onChange={(e) => handleChange(e, "district")}

                                                                    // defaultValue={addPanchayat?.district || ""}
                                                                    value={addPanchayat?.district}
                                                                    disabled={!isedit && !add}

                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {districtList?.map((e, index) => (
                                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                                    ))}

                                                                </select>
                                                                {(error && !addPanchayat?.district) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select City : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    onChange={(e) => handleChange(e, "city")}
                                                                    disabled={!isedit && !add}
                                                                    // defaultValue={addPanchayat?.city || ""}
                                                                    value={addPanchayat?.city}
                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {cityList?.map((e, index) => (
                                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                                    ))}

                                                                </select>
                                                                {(error && !addPanchayat?.city) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Panchayath Name : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name"
                                                                    onChange={(e) => handleChange(e, "name")}
                                                                    defaultValue={addPanchayat?.name || ""}
                                                                    disabled={!isedit && !add}
                                                                    required />

                                                                {(error && !addPanchayat?.name) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Total Wards : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name"
                                                                    onChange={(e) => handleChange(e, "ward")}
                                                                    disabled={!isedit && !add}
                                                                    required />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {isedit && (
                                                <button type="submit" class="btn btn-success" onClick={() => updatePanchayath(addPanchayat?.id)}>Save</button>

                                            )}
                                            {add && (
                                                <button type="submit" class="btn btn-success" onClick={createPanchayath}>Save</button>

                                            )}

                                            <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
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
                                    <th>S.No</th>
                                    <th>District Name</th>
                                    <th>City Name</th>
                                    <th>Panchyath Name</th>
                                    <th>Total Wards</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {panchayathList?.map((e, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e?.city_name}</td>
                                        <td>{e?.district_name}</td>
                                        <td>{e?.name}</td>
                                        <td>200</td>

                                        <td>
                                            <button class="btn btn-success" onClick={() => getPanchayath(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getPanchayath(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deletePanchayath(e?.id)}>
                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                            </button>
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


    )
}


function District() {
  
    const [addDistrict, setAddDistrict] = useState();
    const [districtList,setDistrictList] =useState();
    const [view, setIsView] = useState(false);
    const [edit, setIsEdit] = useState(false);
    const [add, setIsAdd] = useState(false);
    const [error, setError] = useState(false);



    useEffect(()=>{
        getAllDistricts();
    },[])


    const handleClose = () => {
        setIsView(false);
        setIsAdd(false)
        setAddDistrict()
        setIsEdit(false);

    }

    // handle add values
    const handleChange = (e, name) => {
        const { value } = e.target
        setAddDistrict((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })

    }

    // 
    const checkValidation = () => {

        if (!addDistrict?.name) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true

        }

    }


    // get single district
    const getdistrict = (id, edit) => {
        setAddDistrict(districtList?.find((e) => e?.id === id));
        setIsView(true);
        setIsEdit(edit);

    }


    const getAllDistricts = () => {
        axios.get(`${Config.BASE_URL}districts`,
          Config?.config
        )
          .then(function (response) {
            if (response.status === 200) {
              setDistrictList(response?.data)
    
            }
    
          })
          .catch(function (error) {
            console.log(error);
    
          });
    
    
      }
    

    // create new district
    const createDistrict = () => {


        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", addDistrict?.name)

        axios.post(`${Config.BASE_URL}districts/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    setDistrictList((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    handleClose()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }


    // edit city name
    const updateDistrict = (id) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", addDistrict?.name)

        axios.put(`${Config.BASE_URL}districts/${id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {

                    setDistrictList(prevArray => {
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
                    handleClose()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    // delete district
    const deleteDistrict = (id) => {
        axios.delete(`${Config.BASE_URL}districts/${id}/`,

        )
            .then(function (response) {
                if (response.status === 204) {
                     setDistrictList(districtList?.filter((e) => e.id !== id))

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>District Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add district
                    </button>


                    {(view || add) && (
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


                                        <h3 style={{ marginLeft: 20 }}>Add district</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">District Name: <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required
                                                                    defaultValue={addDistrict?.name || ""}
                                                                    onChange={(e) => handleChange(e, "name")}
                                                                    disabled={!edit && !add}
                                                                />
                                                                {(error && !addDistrict?.name) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">

                                            {edit && (
                                                <button type="submit" class="btn btn-success" onClick={() => updateDistrict(addDistrict?.id)}>Save</button>
                                            )}

                                            {add && (
                                                <button type="submit" class="btn btn-success" onClick={createDistrict}>Save</button>
                                            )}

                                            <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
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
                                    <th>S.No</th>
                                    <th>District</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districtList?.map((e, index) => (

                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e?.name}</td>

                                        <td>
                                            <button class="btn btn-success" onClick={() => getdistrict(e?.id, true)} >
                                                <span class="glyphicon glyphicon-pencil" ></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getdistrict(e?.id, false)} >
                                                <span class="glyphicon glyphicon-eye-open"   ></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteDistrict(e?.id)}>
                                                <span class="glyphicon glyphicon-trash"  ></span> Delete
                                            </button>
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

    )
}



function City() {

    const district = useSelector((state) => state?.district?.value);
    // const cityList = useSelector((state) => state?.city?.value);

    const [cityList,setCityList]=useState();
    const [addCity, setAddCity] = useState();
    // modal state
    const [view, setIsView] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(false)

    const handleClose = () => {
        setIsView(false);
        setIsAdd(false)
        setIsEdit(false);
        setAddCity()
        setError(false)

    }


    useEffect(()=>{

        getCities()

    },[])


    const getCities = () => {
        axios.get(`${Config.BASE_URL}get-cities`,
          Config?.config
        )
          .then(function (response) {
            if (response.status === 200) {
    
                setCityList(response?.data)
    
            }
    
          })
          .catch(function (error) {
            console.log(error);
    
          });
    
    
      }



    // handle add values
    const handleChange = (e, name) => {
        const { value } = e.target
        setAddCity((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })

    }
    const getCity = (id, edit) => {
        setAddCity(cityList?.find((e) => e?.id === id));
        setIsView(true);
        setIsEdit(edit);

    }




    const checkValidation = () => {

        if (!addCity?.district || !addCity?.name) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true

        }

    }


    // create cities
    const addCities = () => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("name", addCity?.name)
        data.append("district", addCity?.district)


        axios.post(`${Config.BASE_URL}cities/`,
            data
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                    setCityList((prevstate) => {
                        return [...prevstate, response?.data]
                    })
                    handleClose()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    // update cities

    const updateCities = (id) => {


        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append("name", addCity?.name)
        data.append("district", addCity?.district)

        axios.put(`${Config.BASE_URL}cities/${id}/`,
            data
        )
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setCityList(prevArray => {
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
                    handleClose()

                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }


    // delete City
    const deleteCity = (id) => {
        axios.delete(`${Config.BASE_URL}cities/${id}/`,

        )
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response);
                    setCityList(cityList?.filter((e) => e.id !== id))
                }

            })
            .catch(function (error) {
                console.log(error);

            });

    }



    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>City Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user" ></span> Add City
                    </button>


                    {(view || isAdd || isEdit) && (
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


                                        <h3 style={{ marginLeft: 20 }}>City Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select District : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    value={addCity?.district}
                                                                    // defaultValue={addCity?.district || ""}
                                                                    onChange={(e) => handleChange(e, "district")}
                                                                    disabled={!isEdit && !isAdd}

                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {district?.map((e, index) => (
                                                                        <option value={e?.id}>{e?.name}</option>
                                                                    )
                                                                    )}
                                                                </select>


                                                                {(error && !addCity?.district) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}


                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">City Name : <span class="form-required">*</span></label>
                                                                <input class="form-control" placeholder="city name" required
                                                                    defaultValue={addCity?.name || ""}
                                                                    onChange={(e) => handleChange(e, "name")}
                                                                    disabled={!isEdit && !isAdd}
                                                                />

                                                                {(error && !addCity?.name) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {isAdd && (
                                                <button type="submit" class="btn btn-success" onClick={addCities}>Save</button>
                                            )}

                                            {isEdit && (
                                                <button type="submit" class="btn btn-success" onClick={() => updateCities(addCity?.id)}>Save</button>
                                            )}

                                            <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
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
                                    <th>S.No</th>
                                    <th>District</th>
                                    <th>City Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cityList?.map((e, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e?.district_name}</td>
                                        <td>{e?.name}</td>

                                        <td>
                                            <button class="btn btn-success" onClick={() => getCity(e?.id, true)}  >
                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getCity(e?.id, false)}  >
                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteCity(e?.id, true)} >
                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                            </button>
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

    )
}




function Ward() {

    // const WardList = useSelector((state) => state?.ward?.value);
    const panchayathList = useSelector((state) => state?.panchayath?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

    const [WardList,setWardList] =useState();
    const [addWard, setAddWard] = useState();
    const [error, setError] = useState();

    const [view, setIsView] = useState(false);
    const [isedit, setIsEdit] = useState(false);
    const [add, setIsAdd] = useState(false);


    const handleClose = () => {
        setIsView(false);
        setIsAdd(false)
        setAddWard()
        setIsEdit(false);
        setError(false)

    }

    useEffect(()=>{
        getAllWards()
    
    },[])

    // handle add values
    const handleChange = (e, name) => {
        const { value } = e.target
        setAddWard((prevstate) => {
            return {
                ...prevstate, [name]: value
            }

        })

    }

    // get single district
    const getWard = (id, edit) => {
        setAddWard(WardList?.find((e) => e?.id === id));
        setIsView(true);
        setIsEdit(edit);

    }

    const getAllWards = () => {

    
        axios.get(`${Config.BASE_URL}get-ward`,
          Config?.config
        )
          .then(function (response) {
            if (response.status === 200) {
             setWardList(response?.data)
    
            }
    
          })
          .catch(function (error) {
            console.log(error);
    
          });
    
    
      }





    const checkValidation = () => {

        if (!addWard?.panchayat || !addWard?.ward_no) {
            console.log("please fill required fields")
            setError(true)
            return false

        }
        else {
            setError(false)
            return true

        }

    }



    const createWard = (() => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("district", addWard?.district)
        data.append("city", addWard?.city)
        data.append("panchayat", addWard?.panchayat)
        data.append("ward_no", addWard?.ward_no)
        data.append("name", addWard?.name)


        axios.post(`${Config.BASE_URL}get-ward`,
        data,Config?.config
      )
        .then(function (response) {
  
          if (response.status === 201) {          
            setWardList((prevstate) => {
                return [...prevstate, response?.data]
            })
            handleClose()
  
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
          
  
          }
        });

    })



    // edit city name
    const updateWard = (id) => {

        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append("district", addWard?.district)
        data.append("city", addWard?.city)
        data.append("panchayat", addWard?.panchayat)
        data.append("ward_no", addWard?.ward_no)
        data.append("name", addWard?.name)

        axios.put(`${Config.BASE_URL}get-ward/${id}/`,
        data,Config?.config
      )
        .then(function (response) {
  
          if (response.status === 200) {          
            setWardList(prevArray => {
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

            handleClose()
  
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
          
  
          }
        });

    }



    // delete district
    const deleteWard = (id) => {
        axios.delete(`${Config.BASE_URL}get-ward/${id}/`,
        data,Config?.config
      )
        .then(function (response) {
  
          if (response.status === 201) {          
            setWardList(WardList?.filter((e) => e.id !== id))
            handleClose()
          }
  
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log(error);
          }
        });

    }







    return (
        <div class="content">
            <div class="page-header">
                <div class="page-title">
                    <h4>Ward Details</h4>
                </div>
                <div class="page-btn">
                    <button class="btn btn-primary" onClick={() => setIsAdd(true)}>
                        <span class="glyphicon glyphicon-user"></span> Add Ward
                    </button>


                    {(view || add || isedit) && (
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
                                        <h3 style={{ marginLeft: 20 }}>Ward Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select District : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    onChange={(e) => handleChange(e, "district")}
                                                                    value={addWard?.panchayath_info?.district}
                                                                    // defaultValue={addWard?.panchayath_info?.district || ""}
                                                                    disabled={!add}

                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {districtList?.map((e, index) => (
                                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                                    ))}

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select City : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    onChange={(e) => handleChange(e, "city")}
                                                                    disabled={!add}
                                                                    // defaultValue={addWard?.panchayath_info?.city || ""}
                                                                    value={addWard?.panchayath_info?.city}
                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {cityList?.map((e, index) => (
                                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                                    ))}

                                                                </select>
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Select Panchayath : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="report-dropdown"
                                                                    onChange={(e) => handleChange(e, "panchayat")}
                                                                    disabled={!isedit && !add}
                                                                    value={addWard?.panchayat}
                                                                // defaultValue={addWard?.panchayat || ""}
                                                                >
                                                                    <option disabled selected value >-----------</option>
                                                                    {panchayathList?.map((e, index) => (
                                                                        <option value={e?.id} key={index}>{e?.name}</option>
                                                                    ))}

                                                                </select>
                                                                {(error && !addWard?.panchayat) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}
                                                            </div>
                                                        </div>


                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward Name : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name"
                                                                    onChange={(e) => handleChange(e, "name")}
                                                                    defaultValue={addWard?.name || ""}
                                                                    disabled={!isedit && !add}
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward Number : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="ward_no"
                                                                    defaultValue={addWard?.ward_no || ""}
                                                                    onChange={(e) => handleChange(e, "ward_no")}
                                                                    disabled={!isedit && !add}
                                                                    required />

                                                                {(error && !addWard?.ward_no) && (
                                                                    <span className="req-text">{errStr}</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {isedit && (
                                                <button type="submit" class="btn btn-success" onClick={() => updateWard(addWard?.id)}>Save</button>

                                            )}
                                            {add && (
                                                <button type="submit" class="btn btn-success" onClick={createWard}>Save</button>

                                            )}

                                            <button type="button" class="btn btn-danger" onClick={handleClose}>Close</button>
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
                                    <th>S.No</th>
                                    <th>District Name</th>
                                    <th>City Name</th>
                                    <th>Panchyath Name</th>
                                    <th>Ward No</th>
                                    <th>Total Houses</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {WardList?.map((e, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e?.panchayath_info?.district_name}</td>
                                        <td>{e?.panchayath_info?.city_name}</td>
                                        <td>{e?.panchayath_info?.name}</td>
                                        <td>{e?.ward_no}</td>
                                        <td>200</td>

                                        <td>
                                            <button class="btn btn-success" onClick={() => getWard(e?.id, true)}>
                                                <span class="glyphicon glyphicon-pencil"></span> Edit
                                            </button>
                                            <button class="btn btn-info" onClick={() => getWard(e?.id, false)}>
                                                <span class="glyphicon glyphicon-eye-open"></span> View
                                            </button>
                                            <button class="btn btn-danger" onClick={() => deleteWard(e?.id)}>
                                                <span class="glyphicon glyphicon-trash"></span> Delete
                                            </button>
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


    )
}


// house 

function House() {


    return (

        <>





        </>
    )
}


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
        default:
            return <OverallColletor />
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
