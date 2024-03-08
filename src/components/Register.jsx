
import { useState ,useEffect }           from "react"
import Config                            from '../Config'
import axios                             from 'axios'
import UserContext                       from "../Context"
import { useContext, createContext }     from 'react';
import { useSelector }                   from "react-redux";
// import { Lines }                     from 'react-preloaders';
import Box                               from '@mui/material/Box'
import Modal                             from '@mui/material/Modal'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }


function UserRegister() {
    const [name, setName] = useState()
    const [ward, setWard] = useState()
    const [wardlist, setWardList] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [file, setFile] = useState()
    const [address, setAddres] = useState()
    const [isedit, setisEdit] = useState();
    const [open, setOpen] = useState(false)
   
    const [door, setDoor] = useState()
    const[id, setId] = useState()
    const[street, setstreet] = useState()
    
    const [password, setPassword] = useState('12345')
    const [panchayat, setpanchayat] = useState('ayikudy')
    const [loading, setLoading] = useState(true);


    // const user1 = useContext(UserContext);
    const user = useSelector((state) => state?.user?.value);
    const handleClose = () => {
        setOpen(false)
        setisEdit()
      }
  

    console.log(user?.employee_info?.panchayat,"userrrrrr")

    const getusers = (id, edit) => {
        // setOpen(true)
        axios
          .get(`${Config.BASE_URL}auth/registered-users/${id}`, Config.config)
          .then(function (response) {
            if (response.status === 200) {
              // console.log(response);
              // setupdatemeetings(response?.data)
            //   setRequestId(response.data.request_id)
              setName(response.data.name)
              setWard(response.data.ward)
              setFile(response.data.file)
              setDoor(response.data.door_no)
              // settime(response.data.time)
              setAddres(response.data.street)
              setPhone(response.data.phone)
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
      const updateRequest = (id) => {
        // const check = checkSchemeValidation()
    
        // if (!check) {
        //   return
        // }
    
        const data = new FormData()
        // data.append('date', name)
        data.append('name', name);
        data.append('phone', phone);
        data.append('ward', ward);
        data.append('email', email);
        data.append('image', file);
        data.append('address', address);
        data.append('door', door);
        data.append('panchayat', panchayat);
        
        data.append('password', password);
        data.append('is_admin',true);
    
        axios
        .put(`${Config.BASE_URL}auth/registered-users/${id}/`, data, Config.config)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
    
              setusersList((prevArray) => {
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

    const [usersList, setusersList] = useState([])
    const fetchuser = async () => {
        try {
          // Make an API call to fetch data from the backend
          const response = await fetch(Config.BASE_URL + 'auth/registered-users/', Config?.config)
          const data = await response.json()
          console.log(data)
          setusersList(data)
        //   setLoading(false);
          // Assuming your data is an array of objects with 'value' and 'label' properties
          // setWardList(data)
        } catch (error) {
        //   setLoading(false);
          console.error('Error fetching data:', error)
        }
      }

      const deleteusers = (id) => {
        console.log('deleting')
    
        axios.delete(`${Config.BASE_URL}auth/registered-users/${id}`, Config.config)
          .then(function (response) {
            if (response.status === 204) {
              console.log(response)
              setusersList(usersList?.filter((e) => e.id !== id))
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    const handleSubmitregister = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', name);
        data.append('phone', phone);
        data.append('ward', ward);
        data.append('email', email);
        data.append('image', file);
        data.append('address', address);
        data.append('door', door);
        data.append('panchayat', panchayat);
        
        data.append('password', password);
        data.append('is_admin',true);

        axios
            .post(`${Config.BASE_URL}auth/registered-users/`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
// ward dropdown
    const fetchwards = async () => {
        try {
          // Make an API call to fetch data from the backend
          const response = await fetch(Config.BASE_URL + 'get-ward', Config?.config)
          const data = await response.json()
          console.log(data)
          // Assuming your data is an array of objects with 'value' and 'label' properties
          setWardList(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      useEffect(() => {
        fetchwards()
        fetchuser()
        
      }, [])

    return (

        <div className="content">
            <div className="page-header">
                <div className="page-title">
                    <h4>User Details</h4>
                </div>
                <div className="page-btn">
                    <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        <span className="glyphicon glyphicon-user"></span> Add User
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
                      <h3 style={{ marginLeft: 20 }}>
                       Request{' '}
                      </h3>
                      <div className="modal-body">
                        <div className="card">
                        <div className="card-body">
                                                <div className="row">

                                                <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                            <label style={{ color: 'grey' }}>
                                                                Ward No :
                                                            </label>
                                                            <select
                                                                name="ward"
                                                                id=""
                                                                className="custom-dropdown"
                                                                onChange={(e) =>
                                                                setWard(e?.target?.value)
                                                                } 
                                                            >
                                                                <option disabled selected value>
                                                                -----------
                                                                </option>
                                                                {wardlist?.map((e) => (
                                                                <option value={e?.id}>{e?.ward_no} </option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                        </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Name : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} defaultValue={name||''} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Contact Number : <span className="form-required">*</span></label>
                                                            <input type="number" className="form-control" name="phone" onChange={(e) => setPhone(e.target.value)} defaultValue={phone||''} required />
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Email : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} defaultValue={email||''} required />
                                                        </div>
                                                    </div> */}
                                                    
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label style={{ color: 'grey' }}> Images :</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="fileInput"
                                                                multiple
                                                                accept="image/*" name="image"
                                                                onChange={(e) => setFile(e.target.files[0])}
                                                            />
                                                            <div id="preview"></div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Door No : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="door" onChange={(e) => setDoor(e.target.value)} defaultValue={door_no||''} required />
                                                        </div>
                                                    </div> */}
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Address : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="Address" onChange={(e) => setAddres(e.target.value)} defaultValue={street||''} required />
                                                            <input type="hidden" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
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
                            className="btn btn-success" onClick={() => updateRequest(id)}
                           
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

                                        
                                    <h3 style={{ marginLeft: 20 }}>User Details</h3>
                                    <div className="modal-body">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">

                                                <div className="col-lg-6 col-sm-6 col-12">
                                                            <div className="form-group">
                                                            <label style={{ color: 'grey' }}>
                                                                Ward No :
                                                            </label>
                                                            <select
                                                                name="ward"
                                                                id=""
                                                                className="custom-dropdown"
                                                                onChange={(e) =>
                                                                setWard(e?.target?.value)
                                                                } 
                                                            >
                                                                <option disabled selected value>
                                                                -----------
                                                                </option>
                                                                {wardlist?.map((e) => (
                                                                <option value={e?.id}>{e?.ward_no} </option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                        </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Name : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Contact Number : <span className="form-required">*</span></label>
                                                            <input type="number" className="form-control" name="phone" onChange={(e) => setPhone(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Email : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label style={{ color: 'grey' }}> Images :</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="fileInput"
                                                                multiple
                                                                accept="image/*" name="image"
                                                                onChange={(e) => setFile(e.target.files[0])}
                                                            />
                                                            <div id="preview"></div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Door No : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="door" onChange={(e) => setDoor(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label">Address : <span className="form-required">*</span></label>
                                                            <input type="text" className="form-control" name="Address" onChange={(e) => setAddres(e.target.value)} required />
                                                            <input type="hidden" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-success" onClick={handleSubmitregister}>Sign up</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="table-info">
                                    <th>S.No</th>
                                    <th>Ward No</th>
                                    <th>Name</th>
                                    <th>Contact No</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {usersList?.map((userlist,e) => (

                                        <tr key={userlist.id}>

                                            <td>{e+1}</td>
                                            <td>{userlist.ward_name}</td>
                                            <td>{userlist.name}</td>
                                            <td>{userlist.phone}</td>
                                            <td>{userlist.street}</td>
                                           
                                           
                                            
                                            <td>
                                                <button className="btn btn-success"  onClick={() => getusers(userlist?.id, true)}> 
                                                    <span className="glyphicon glyphicon-pencil"></span> Edit
                                                </button>
                                                <button className="btn btn-info"  onClick={() => getusers(userlist?.id, false)} >
                                                    <span className="glyphicon glyphicon-eye-open"></span> View
                                                </button>
                                                <button className="btn btn-danger" onClick={() => deleteusers(userlist?.id)} >
                                                    <span className="glyphicon glyphicon-trash"></span> Delete
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


export default UserRegister;

import React                             from 'react';
import ReactDOM                          from 'react-dom/client';


class User extends React.Component {


    constructor(props) {
        super(props);
        this.state = { "name": "name" };
        this.data = { "id": 1, "name": "name" }

    }


    handlechange = (e) => {
        this.setState({ name: e.target.value });
        this.setData({ name: e.target.value });

    }

    render() {

        return (
            <>

                {/* <UserRegister/> */}

                <p>{this.data.name}</p>
                <p>{this.state.name}</p>
                <input type="text" onChange={(e) => this.handlechange(e)} />
                
            </>



        )
    }
}

// export default User;