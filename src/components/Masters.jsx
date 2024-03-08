import { useEffect, useState, useContext } from "react"
import axios from "axios"
import Config from "../Config"
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UserContext                                             from "../Context"




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
            data,
            Config?.config
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
            data,
            Config?.config
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
        Config?.config

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
            data,
            Config?.config
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
            data,
            Config?.config
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
        Config?.config

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
    // const panchayathList = useSelector((state) => state?.panchayath?.value);
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
        data,
        Config?.config
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
        data,
        Config?.config
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
        data,
        Config?.config
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


                                                        {/* <div class="col-lg-6 col-sm-12 col-12">
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
                                                        </div> */}


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

// 


function House() {

    ///Post New House Method
    const [hward, setHWard] = useState();
    const [hbuilding, setHBuilding] = useState();
    const [hname, setHName] = useState();
    const [hphone, setHPhone] = useState();
    const [hdoor, setHDoor] = useState();
    const [haddress, setHAddress] = useState();

    const [isedit, setisEdit] = useState()
    const [isAdd, setisAdd] = useState()
    const [id, setId] = useState()
    const [error, setError] = useState()
    const [open, setOpen] = useState(false)


    const handleSubmitNewHouse = async (e) => {
        e.preventDefault();
        // console.log(date,time,schme_name,period,announced_by,schme_details);
        const data = new FormData()
        data.append("ward", hward)
        data.append("building_type", hbuilding)
        data.append("name", hname)
        data.append("phone_num", hphone)
        data.append("door_no", hdoor)
        data.append("line1", haddress)
        axios.post(`${Config.BASE_URL}buildingregister`,
            data,
            Config.config,
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    ///Get Scheme Method

    const [houseList, setHouseList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [buildingList, setBuildingList] = useState([]);


    useEffect(() => {
        fetchHouse()
        fetchWards()
        fetchBuildingType()
    }, [])

    const fetchHouse = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'buildingregister',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setHouseList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    const fetchWards = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'get-ward',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setWardList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }



    const fetchBuildingType = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'building-type',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setBuildingList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const getHouse = (id, edit) => {
        // setOpen(true)
        axios
          .get(`${Config.BASE_URL}buildingregister/${id}`, Config.config)
          .then(function (response) {
            if (response.status === 200) {
              // console.log(response);
              // setupdatemeetings(response?.data)
              setHWard(response.data.ward)
              setHBuilding(response.data.building_type)
              setHName(response.data.name)
              // settime(response.data.time)
              setHPhone(response.data.phone_num)
              setHDoor(response.data.door_no)
              setHAddress(response.data.line1)
              // setScheme_Details(response.data.details)
              setId(response.data.id)
    
              // setViewEmployee(response?.data)
              setisEdit(edit)
              setOpen(true)
    
              // $('#myModal').modal('show')
              // $('.modal-backdrop').show();
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const handleOpen = (id) => {
        getHouse(id)
        setOpen(true)
      }

      const handleClose = () => {
        setOpen(false)
        setisEdit()
      }
    
     
      //UPDATE ANNOUNCEMENT
      const updateHouse = (id) => {
        // const check = checkSchemeValidation()
    
        // if (!check) {
        //   return
        // }
    
        const data = new FormData()
        data.append('ward', hward)
        data.append('building_type', hbuilding)
        data.append('name', hname)
        data.append('phone_num', hphone)
        data.append('door_no', hdoor)
        data.append('line1', haddress)
    
        axios
          .put(`${Config.BASE_URL}buildingregister/${id}/`, data, Config.config)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
    
              setHouseList((prevArray) => {
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
              // setIsOpen(false)
              handleClose()
    
              // $('#myModal').modal('show')
              // $('.modal-backdrop').show();
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    

    ///Delete House Method


    const deleteHouse = (id) => {
        console.log('deleting')
        axios
            .delete(`${Config.BASE_URL}buildingregister/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setHouseList(houseList?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }



    const user = useContext(UserContext);
    console.log(user)
    console.log(user?.employee_info?.panchayat, "panchayat")

    const title = "House"
    return (

        <>

            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4>{title}  Details</h4>
                    </div>
                    <div class="page-btn">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            <span class="glyphicon glyphicon-user"></span> Add new {title}
                        </button>
                        {open && (
                            <Modal
                                // keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <div class="modal-content">
                                        <h3 style={{ marginLeft: 20 }}>Announcement</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div className="card-body">
                                                    <div class="row">

                                                        <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                                <label style={{ color: 'grey' }}>Ward No :</label>
                                                                <select
                                                                    name="ward"
                                                                    id=""
                                                                    className="custom-dropdown"
                                                                    onChange={(e) => setHWard(e?.target?.value)}
                                                                    defaultValue={hward ||''}

                                                                >
                                                                    {wardList?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Building Type : <span class="form-required">*</span></label>
                                                                <select name="building_type" id="" className="custom-dropdown"      defaultValue={hbuilding ||''} onChange={(e) => setHBuilding(e?.target?.value)}>
                                                                    {buildingList?.map((e) => (
                                                                        <option value={e?.id}>{e?.id}</option>
                                                                    ))}

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Name : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="name"      defaultValue={hname ||''} onChange={(e) => setHName(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="phone_num"      defaultValue={hphone ||''} onChange={(e) => setHPhone(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Door No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="door_no"      defaultValue={hdoor ||''} onChange={(e) => setHDoor(e.target.value)} required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-6 col-6">
                                                            <div class="form-group">
                                                                <label class="form-label">Address :</label>
                                                                <textarea cols="30" rows="2" name="line1" onChange={(e) => setHAddress(e.target.value)} defaultValue={haddress || ''}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            {isedit && (
                                                <button
                                                    type="submit"
                                                    class="btn btn-success"
                                                    onClick={() => updateHouse(id)}
                                               
                                                  
                                                >
                                                    Save
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                class="btn btn-danger"
                                                data-dismiss="modal"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}

                        <div id="myModal" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg modal-dialog-centered">

                                <div class="modal-content">


                                    <h3 style={{ marginLeft: 20 }}>New {title} Details</h3>
                                    <div class="modal-body">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">

                                                    <div className="col-lg-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label style={{ color: 'grey' }}>Ward No :</label>
                                                            <select
                                                                name="ward"
                                                                id=""
                                                                className="custom-dropdown"
                                                                onChange={(e) => setHWard(e?.target?.value)}

                                                            >
                                                                {wardList?.map((e) => (
                                                                    <option value={e?.id}>{e?.ward_no}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Building Type : <span class="form-required">*</span></label>
                                                            <select name="building_type" id="" className="custom-dropdown" onChange={(e) => setHBuilding(e?.target?.value)}>
                                                                {buildingList?.map((e) => (
                                                                    <option value={e?.id}>{e?.id}</option>
                                                                ))}

                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Name : <span class="form-required">*</span></label>
                                                            <input type="text" class="form-control" name="name" onChange={(e) => setHName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                            <input type="text" class="form-control" name="phone_num" onChange={(e) => setHPhone(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Door No : <span class="form-required">*</span></label>
                                                            <input type="text" class="form-control" name="door_no" onChange={(e) => setHDoor(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-sm-6 col-6">
                                                        <div class="form-group">
                                                            <label class="form-label">Address :</label>
                                                            <textarea cols="30" rows="2" name="line1" onChange={(e) => setHAddress(e.target.value)}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-success" onClick={handleSubmitNewHouse}>Register</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>

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
                                        <th>Ward No</th>
                                        <th>Building Type</th>
                                        <th>Name</th>
                                        <th>Contact No</th>
                                        <th>Door No</th>
                                        <th>Address</th>
                                        <th>QR code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {houseList?.map(user => (

                                        <tr key={user.id}>

                                            <td></td>
                                            <td>{user.ward}</td>
                                            <td>{user.building_type}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone_num}</td>
                                            <td>{user.door_no}</td>
                                            <td>{user.line1}</td>
                                            <td><img src={Config.MEDIA_URL + user.qr_code} className="emp-thumb" /></td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => getHouse(user?.id, true)}> 
                                                    <span className="glyphicon glyphicon-pencil"></span> Edit
                                                </button>
                                                <button className="btn btn-info" onClick={() => getHouse(user?.id, false)} >
                                                    <span className="glyphicon glyphicon-eye-open"></span> View
                                                </button>
                                                <button className="btn btn-danger"    onClick={() => deleteHouse(user?.id)} >
                                                    <span className="glyphicon glyphicon-trash"></span> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        {/* <br> */}
                    </div>
                </div>
            </div>



        </>
    )
}

function Shop() {

    const title="Shops"
    return (

        <>

            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4>{title}  Details</h4>
                    </div>
                    <div class="page-btn">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            <span class="glyphicon glyphicon-user"></span> Add new {title}
                        </button>
                        <div id="myModal" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                               
                                <div class="modal-content">

                           
                                        <h3 style={{marginLeft:20}}>New {title} Details</h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">

                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Ward No : <span class="form-required">*</span></label>
                                                                <select name="" id="" className="custom-dropdown">
                                                                    <option value="">01</option>
                                                                    <option value="">02</option>
                                                                    <option value="">03</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Shop Name : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required /> 
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Shop No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Contact No : <span class="form-required">*</span></label>
                                                                <input type="text" class="form-control" name="category_name" required />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-12 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label class="form-label">Address :</label>
                                                                <textarea cols="30" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-success">Register</button>
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>
                                  
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
                                        <th>Ward No</th>
                                        <th>Name</th>
                                        <th>Building No</th>
                                        <th>Contact No</th>
                                        <th>Address</th>
                                        <th>QR code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>05</td>
                                        <td>jeeva</td>
                                        <td>25</td>
                                        <td>123456789</td>
                                        <td>Tenkasi</td>
                                        <td>Qr code</td>
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
                        {/* <br> */}
                    </div>
                </div>
            </div>



        </>
    )
}



function Street() {

    ///Post New House Method
    const [hward, setHWard] = useState();
    const [addstreet, setAddstreet] = useState();
    const [addstreetName, setaddstreetName] = useState();
    const [view, setIsView] = useState(false);
     const [isedit, setisEdit] = useState()
     const [isAdd, setisAdd] = useState()
    const [add, setIsAdd] = useState(false);
    const [error, setError] = useState(false);
    const [id, setId] = useState()
  

  const [open, setOpen] = useState(false)

    // const handleClose = () => {
    //     setOpen(false)
    //     setisEdit()
    //   }
    
    //   const handleOpen = () => {
    //     getmeeting()
    //     setOpen(true)
    //   }


    const fetchStreetData = async () => {
        try {
          const response = await fetch(
            Config.BASE_URL + 'street/',
            Config?.config,
          )
          const data = await response.json()
          console.log(data)
          setstreetList(data)
        } catch (error) {
          console.log('Announcement Data Fetching Error', error)
        }
      }

      const getStreet = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}street/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setAddstreet(response.data.street_no)
                    setaddstreetName(response.data.name)
                    setHWard(response.data.ward)
                    setId(response.data.id)
                    setisEdit(edit)
                    setOpen(true)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleOpen = (id) => {
            getStreet(id)
            setOpen(true)
          }
    
          const handleClose = () => {
            setOpen(false)
            setisEdit()
          }
   

    const handleSubmitNewStreet = async (e) => {
        e.preventDefault();
   
        const data = new FormData()
        data.append("ward", hward)
        data.append("street_no", addstreet)
        data.append("name", addstreetName)
   
        axios.post(`${Config.BASE_URL}street/`,
            data,
            Config.config,
        )
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);

                }

            })
            .catch(function (error) {
                console.log(error);

            });
    }
    

    ///Get Scheme Method

    const [streetList, setstreetList] = useState([]);
    const [wardList, setWardList] = useState([]);
    // const [buildingList, setBuildingList] = useState([]);


    useEffect(() => {
        // fetchHouse()
        fetchWards()
        fetchStreetData()
        // fetchBuildingType()
    }, [])

    const deleteStreet = (id) => {
        console.log('deleting')
    
        axios
          .delete(`${Config.BASE_URL}street/${id}`, Config.config)
          .then(function (response) {
            if (response.status === 204) {
              console.log(response)
              setstreetList(streetList?.filter((e) => e.id !== id))
            }
          })
    
          .catch(function (error) {
            console.log(error)
          })
      }

    const fetchWards = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'get-ward',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setWardList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

     
      //UPDATE ANNOUNCEMENT
      const updateStreet = (id) => {
        // const check = checkSchemeValidation()
    
        // if (!check) {
        //   return
        // }
    
        const data = new FormData()
        data.append("ward", hward)
        data.append("street_no", addstreet)
        data.append("name", addstreetName)
    
        axios
          .put(`${Config.BASE_URL}street/${id}/`, data, Config.config)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
    
              setstreetList((prevArray) => {
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
              // setIsOpen(false)
              handleClose()
    
              // $('#myModal').modal('show')
              // $('.modal-backdrop').show();
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    

    // ///Delete House Method


    // const deleteHouse = (id) => {
    //     console.log('deleting')
    //     axios
    //         .delete(`${Config.BASE_URL}buildingregister/${id}`, Config.config)
    //         .then(function (response) {
    //             if (response.status === 204) {
    //                 console.log(response)
    //                 setHouseList(houseList?.filter((e) => e.id !== id))
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }



    // const user = useContext(UserContext);
    // console.log(user)
    // console.log(user?.employee_info?.panchayat, "panchayat")

    const title = "Street"
    return (

        <>

            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>{title}  Details</h4>
                    </div>
                    <div className="page-btn">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            <span className="glyphicon glyphicon-user"></span> Add new {title}
                        </button>
                        {open && (
                            <Modal
                                // keepMounted
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="modal-content">
                                        <h3 style={{ marginLeft: 20 }}>Announcement</h3>
                                        <div className="modal-body">
                                            <div className="card">
                                            <div className="card-body">
                                                <div className="row">

                                                    <div className="col-lg-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label style={{ color: 'grey' }}>Ward No :</label>
                                                            <select
                                                                name="ward"
                                                                id=""
                                                                className="custom-dropdown"
                                                                onChange={(e) => setHWard(e?.target?.value)} defaultValue={hward||''}

                                                            >
                                                                {wardList?.map((e) => (
                                                                    <option value={e?.id}>{e?.ward_no}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                  
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Street No : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="name" onChange={(e) => setAddstreet(e?.target?.value)} defaultValue={addstreet||''}  required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Street Name : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="street_name"  onChange={(e) => setaddstreetName(e?.target?.value)} defaultValue={addstreetName||''} required />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {isedit && (
                                                <button
                                                    type="submit"
                                                    className="btn btn-success"
                                                    onClick={() => updateStreet(id)}
                                               
                                                  
                                                >
                                                    Save
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                data-dismiss="modal"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}

                        <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog modal-lg modal-dialog-centered">

                                <div className="modal-content">


                                    <h3 style={{ marginLeft: 20 }}>New {title} Details</h3>
                                    <div className="modal-body">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">

                                                    <div className="col-lg-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label style={{ color: 'grey' }}>Ward No :</label>
                                                            <select
                                                                name="ward"
                                                                id=""
                                                                className="custom-dropdown"
                                                                onChange={(e) => setHWard(e?.target?.value)}

                                                            >
                                                                {wardList?.map((e) => (
                                                                    <option value={e?.id}>{e?.ward_no}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                  
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Street No : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="name" onChange={(e) => setAddstreet(e?.target?.value)}  required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Street Name : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="street_name"  onChange={(e) => setaddstreetName(e?.target?.value)} required />
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Door No : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="door_no"  required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-6 col-6">
                                                        <div className="form-group">
                                                            <label className="form-label">Address :</label>
                                                            <textarea cols="30" rows="2" name="line1" ></textarea>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" className="btn btn-success" onClick={handleSubmitNewStreet} >Register</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>

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
                                        <th>Ward No</th>
                                        <th>Street No</th>
                                        <th>Street Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                      {streetList?.map((streetdetails, e) => (
                      <tr key={streetdetails.id}>
                        <td>{e + 1}</td>
                        <td>{streetdetails.ward}</td>
                        <td>{streetdetails.street_no}</td>
                        <td>{streetdetails.name}</td>
                       

                        <td>
                          {/* <button class="btn btn-success">
                            <span class="glyphicon glyphicon-pencil"></span>{' '}
                            Edit
                          </button> */}
                          <button
                            className="btn btn-success" onClick={() =>
                                getStreet(streetdetails?.id, true)}
                           
                          >
                            <span className="glyphicon glyphicon-pencil"></span>{' '}
                            Edit
                          </button>
                          <button className="btn btn-info"  onClick={() =>
                                getStreet(streetdetails?.id, false)}>
                            <span className="glyphicon glyphicon-eye-open"></span>{' '}
                            View
                          </button>
                          <button
                            className="btn btn-danger"  onClick={() => deleteStreet(streetdetails?.id)}
                           
                          >
                            <span className="glyphicon glyphicon-trash"></span>{' '}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                            </table>
                        </div>
                        {/* <br> */}
                    </div>
                </div>
            </div>



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
        case "house":
            return < House/>
        case "shops":
            return <Shop/>
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





// function House() {

    //     const title="House"
    //     return (
    
    //         <>
    
    //             <div class="content">
    //                 <div class="page-header">
    //                     <div class="page-title">
    //                         <h4>{title}  Details</h4>
    //                     </div>
    //                     <div class="page-btn">
    //                         <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    //                             <span class="glyphicon glyphicon-user"></span> Add new {title}
    //                         </button>
    //                         <div id="myModal" class="modal fade" role="dialog">
    //                             <div class="modal-dialog modal-lg modal-dialog-centered">
                                   
    //                                 <div class="modal-content">
    
                               
    //                                         <h3 style={{marginLeft:20}}>New {title} Details</h3>
    //                                         <div class="modal-body">
    //                                             <div class="card">
    //                                                 <div class="card-body">
    //                                                     <div class="row">
    
    //                                                         <div class="col-lg-6 col-sm-12 col-12">
    //                                                             <div class="form-group">
    //                                                                 <label class="form-label">Ward No : <span class="form-required">*</span></label>
    //                                                                 <select name="" id="" className="custom-dropdown">
    //                                                                     <option value="">01</option>
    //                                                                     <option value="">02</option>
    //                                                                     <option value="">03</option>
    //                                                                 </select>
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="col-lg-6 col-sm-12 col-12">
    //                                                             <div class="form-group">
    //                                                                 <label class="form-label">Shop Name : <span class="form-required">*</span></label>
    //                                                                 <input type="text" class="form-control" name="category_name" required /> 
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="col-lg-6 col-sm-12 col-12">
    //                                                             <div class="form-group">
    //                                                                 <label class="form-label">Shop No : <span class="form-required">*</span></label>
    //                                                                 <input type="text" class="form-control" name="category_name" required />
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="col-lg-6 col-sm-12 col-12">
    //                                                             <div class="form-group">
    //                                                                 <label class="form-label">Contact No : <span class="form-required">*</span></label>
    //                                                                 <input type="text" class="form-control" name="category_name" required />
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="col-lg-12 col-sm-12 col-12">
    //                                                             <div class="form-group">
    //                                                                 <label class="form-label">Address :</label>
    //                                                                 <textarea cols="30" rows="2"></textarea>
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="modal-footer">
    //                                             <button type="submit" class="btn btn-success">Register</button>
    //                                             <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    //                                         </div>
                                      
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="card">
    //                     <div class="card-body">
    
    //                         <div class="table-responsive">
    //                             <table class="table table-bordered">
    //                                 <thead>
    //                                     <tr class="table-info">
    //                                         <th>S.No</th>
    //                                         <th>Ward No</th>
    //                                         <th>Name</th>
    //                                         <th>Building No</th>
    //                                         <th>Contact No</th>
    //                                         <th>Address</th>
    //                                         <th>QR code</th>
    //                                         <th>Action</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     <tr>
    //                                         <td>1.</td>
    //                                         <td>05</td>
    //                                         <td>jeeva</td>
    //                                         <td>25</td>
    //                                         <td>123456789</td>
    //                                         <td>Tenkasi</td>
    //                                         <td>Qr code</td>
    //                                         <td>
    //                                             <button class="btn btn-success">
    //                                                 <span class="glyphicon glyphicon-pencil"></span> Edit
    //                                             </button>
    //                                             <button class="btn btn-info">
    //                                                 <span class="glyphicon glyphicon-eye-open"></span> View
    //                                             </button>
    //                                             <button class="btn btn-danger">
    //                                                 <span class="glyphicon glyphicon-trash"></span> Delete
    //                                             </button>
    //                                         </td>
    //                                     </tr>
    
    //                                 </tbody>
    //                             </table>
    //                         </div>
    //                         {/* <br> */}
    //                     </div>
    //                 </div>
    //             </div>
    
    
    
    //         </>
    //     )
    // }