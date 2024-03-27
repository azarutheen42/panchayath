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

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Typography, Container, Grid, Paper } from '@mui/material';



import SelectDropDown from "../utils/SelectDropDown"
import FormModal from "../utils/FormModal";
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";
import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';
import MultipleSelect from "./MultiDropdown";
import AddIcon from '@mui/icons-material/Add';
import PaginationController from "../utils/Pagination";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
// function Settings(props) {

//     return (

//         <>

//         {props?.path==="permissions" && (

//         <div class="content">
//             <div class="page-header">
//                 <div class="page-title">
//                     <h4>Government Permission</h4>
//                 </div>
//                 <div class="page-btn">
//                     <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//                         <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add permission
//                     </button>
//                     <div id="myModal" class="modal fade" role="dialog">
//                         <div class="modal-dialog modal-lg modal-dialog-centered">

//                             <div class="modal-content">

//                                 <form action="" method="post"  id="">
//                                     <h3 style={{ marginLeft: 20 }}>Give Permissions</h3>
//                                     <div class="modal-body">
//                                         <div class="card">
//                                             <div class="card-body">
//                                                 <div class="row">
//                                                     <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                         <div class="form-group">
//                                                             <label>Roles : </label>
//                                                             <select name="" id="" 
//                                                             className="report-dropdown"
//                                                             // style="width: 100%;height:35px;border:1px solid #D7DEE6;border-radius:4px;"
//                                                             >
//                                                                 <option value="">Editor</option>
//                                                                 <option value="">Admin</option>
//                                                                 <option value="">viewer</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <hr />
//                                                 <div class="row">
//                                                     <div class="form-check mb-2 mt-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> Dashboard</label>
//                                                     </div>
//                                                     <div class="form-check mb-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> Employees</label>
//                                                     </div>
//                                                     <div class="form-check mb-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> complaint</label>
//                                                     </div>
//                                                     <div class="form-check mb-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> Request</label>
//                                                     </div>
//                                                     <div class="form-check mb-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> Reports</label>
//                                                     </div>
//                                                     <div class="form-check mb-2">
//                                                         <input type="checkbox" class="form-check-input" id="check1" value="" />
//                                                         <label class="form-check-label" for="check1"> Activity</label>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="modal-footer">
//                                         <button type="submit" class="btn btn-success">Save</button>
//                                         <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div class="card">
//                 <div class="card-body">
//                     <div class="row">
//                         <div class="col-md-3 col-lg-3 col-xs-6 col-12">


//                         </div>
//                     </div>
//                     <div class="col-md-3 col-lg-3 col-xs-6 col-12"></div>
//                     <div class="col-md-3 col-lg-4 col-xs-6 col-12"></div>
//                     <div class="col-md-3 col-lg-2 col-xs-6 col-12">

//                     </div>
//                 </div>

//                 <div class="table-responsive">
//                     <table class="table table-bordered">
//                         <thead>
//                             <tr class="table-info">
//                                 <th>S.No</th>
//                                 {/* <th></th> */}
//                                 <th>Menu </th>
//                                 <th>Access </th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>1.</td>
//                                 <td>Ayikudy</td>

//                                 <td><input type="checkbox" /><lable>&nbsp; Admin</lable><br/>
// 										<input type="checkbox" /><lable>&nbsp; EO</lable><br/>
// 										<input type="checkbox"/><lable> &nbsp;Workers</lable>
// 								</td>

//                                 <td>
//                                     <button class="btn btn-success">
//                                         <span class="glyphicon glyphicon-pencil"></span> Edit
//                                     </button>
//                                     <button class="btn btn-info">
//                                         <span class="glyphicon glyphicon-eye-open"></span> View
//                                     </button>
//                                     <button class="btn btn-danger">
//                                         <span class="glyphicon glyphicon-trash"></span> Delete
//                                     </button>
//                                 </td>
//                             </tr>

//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <br />
//         </div>
//   )}

//         {props?.path==="roles" && (      

//         <div class="content">
//                 <div class="page-header">
//                     <div class="page-title">
//                         <h4> Roles Details</h4>
//                     </div>
//                     <div class="page-btn">
//                         <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
// 							<span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Roles
// 						</button>
//                         <div id="myModal" class="modal fade" role="dialog">
//                             <div class="modal-dialog modal-lg modal-dialog-centered">

//                                 <div class="modal-content">

//                                     <form action="" method="post"  id="">
//                                         <h3 style={{ marginLeft: 20 }}>Create Roles</h3>
//                                         <div class="modal-body">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     <div class="row">
//                                                         <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                             <div class="form-group">
//                                                                 <label class="form-label">Roles : <span class="form-required">*</span></label> 
//                                                                 <input type="text" class="form-control" name="category_name" required />
//                                                             </div>
//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="modal-footer">
//                                             <button type="submit" class="btn btn-success">Save</button>
//                                             <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card">
//                     <div class="card-body">                        
//                         <div class="table-responsive">
// 							<table class="table table-bordered">
// 								<thead>
// 									<tr class="table-info">
// 										<th>S.No</th>
// 										<th>Role </th>


// 										<th>Action</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>1</td>
// 										<td>Admin</td>
// 										<td>
// 											<button class="btn btn-success">
// 												<span class="glyphicon glyphicon-pencil"></span> Edit
// 											</button>
// 											<button class="btn btn-info">
// 												<span class="glyphicon glyphicon-eye-open"></span> View
// 											</button>
// 											<button class="btn btn-danger">
// 												<span class="glyphicon glyphicon-trash"></span> Delete
// 											</button>
// 										</td>
// 									</tr>
//                                     <tr>
// 										<td>2</td>
// 										<td>Editor</td>
// 										<td>
// 											<button class="btn btn-success">
// 												<span class="glyphicon glyphicon-pencil"></span> Edit
// 											</button>
// 											<button class="btn btn-info">
// 												<span class="glyphicon glyphicon-eye-open"></span> View
// 											</button>
// 											<button class="btn btn-danger">
// 												<span class="glyphicon glyphicon-trash"></span> Delete
// 											</button>
// 										</td>
// 									</tr>

// 								</tbody>
// 							</table>
// 						</div>
//                         <br/>
//                     </div>
//                 </div>
//             </div>
//   )}

//             {props?.path==="menu" && (

//             <div class="content">
//                 <div class="page-header">
//                     <div class="page-title">
//                         <h4> Menu's Details</h4>
//                     </div>
//                     <div class="page-btn">
//                         <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
// 							<span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Menu's
// 						</button>
//                         <div id="myModal" class="modal fade" role="dialog">
//                             <div class="modal-dialog modal-lg modal-dialog-centered">

//                                 <div class="modal-content">

//                                     <form action="" method="post"  id="">
//                                         <h3 style={{ marginLeft: 20 }}>Create Menu's</h3>
//                                         <div class="modal-body">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     <div class="row">
//                                                         <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                             <div class="form-group">
//                                                                 <label class="form-label">Menu's : <span class="form-required">*</span></label> 
//                                                                 <input type="text" class="form-control" name="category_name" required />
//                                                             </div>
//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="modal-footer">
//                                             <button type="submit" class="btn btn-success">Save</button>
//                                             <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="card">
//                     <div class="card-body">                        
//                         <div class="table-responsive">
// 							<table class="table table-bordered">
// 								<thead>
// 									<tr class="table-info">
// 										<th>S.No</th>
// 										<th>Menu's </th>


// 										<th>Action</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>1.</td>
// 										<td>Admin</td>
// 										<td>
// 											<button class="btn btn-success">
// 												<span class="glyphicon glyphicon-pencil"></span> Edit
// 											</button>
// 											<button class="btn btn-info">
// 												<span class="glyphicon glyphicon-eye-open"></span> View
// 											</button>
// 											<button class="btn btn-danger">
// 												<span class="glyphicon glyphicon-trash"></span> Delete
// 											</button>
// 										</td>
// 									</tr>

// 								</tbody>
// 							</table>
// 						</div>
//                         <br/>
//                     </div>
//                 </div>
//             </div>
//               )}

//         </>

//     )

// }





export default function settings(props) {


    const dispatch = useDispatch()

    const modalHeader = "Permissions";

    const user = useSelector((state) => state?.user?.value);
    const wardlist = useSelector((state) => state?.ward?.value);
    const panchayatList = useSelector((state) => state?.panchayat?.value);
    const districtList = useSelector((state) => state?.district?.value);
    const cityList = useSelector((state) => state?.city?.value);

    // meta StATE
    const [listInstanceData, setListInstanceData] = useState([])
    const [instanceData, setInstanceData] = useState({
        role: '',
        permission: [],
    })

    const [isOpen, setIsOpen] = useState();
    const [isedit, setisEdit] = useState();
    const [isAdd, setisAdd] = useState();
    const [error, setError] = useState(false);
    const [image, setImage] = useState();
    const [loader, setLoader] = useState();

    const [hide, setHide] = useState(true);

    const [roleList, setRoleList] = useState([]);
    const [permissionList, setPermissionList] = useState([]);



    const [errorMsg, setErrorMsg] = useState({});
    const [errString, seterrString] = useState();
    const [lazyLoading, setLazyLoading] = useState(true);

    //     const [page,setPage] =useState(1);
    // const [count,setCount] =useState();
    //  const [total, setTotal] = useState();


    //     const handlePageChange =(event, value)=>{
    //         setPage(value)
    //     }


    const getPermissionName = (data) => {

        const label = data?.map((no) => (permissionList?.find((e) => e?.id === no)?.name)).join(', ')

        // const label = data?.map(permission => permission.name).join(', ');
        return label
    }


    const getRoleLabel = (id) => {
        const label = roleList?.find((e) => e?.id === id)?.name
        return label
    }


    const getUrl = "auth/user-permissions";
    const getListUrl = "auth/user-permissions";
    const postUrl = "auth/user-permissions";
    const updateUrl = "auth/user-permissions";
    const deleteUrl = "auth/user-permissions";



    // META DATA
    const headersToShow = ["Role Name", "Permission"]
    const tableData = listInstanceData
    const fieldsToShow = []
    const fields = {
        'role': (value) => getRoleLabel(value),
        'permission': (value) => getPermissionName(value),

    }


    const handleClose = () => {
        setIsOpen();
        setisAdd();
        setInstanceData(
            {
                role: '',
                permission: [],
            }
        );
        setError();

        setErrorMsg({});
        seterrString();
        setisEdit();


    }


    useEffect(() => {
        fetchListData();

        fetchRoleData();
        fetchPermissionData();



    }, [])



    const fetchRoleData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + "auth/get-roles", Config?.config)
            const data = await response.json()
            console.log(data)
            setRoleList(data);


        } catch (error) {
            console.error('Error fetching data:', error)

        }
    }


    const fetchPermissionData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + "auth/get-permissions", Config?.config)
            const data = await response.json()
            console.log(data)
            setPermissionList(data);
        } catch (error) {
            console.error('Error fetching data:', error)

        }
    }


    const fetchListData = async () => {
        try {

            const response = await fetch(Config.BASE_URL + getListUrl, Config?.config)
            const data = await response.json()
            console.log(data)
            setListInstanceData(data);

        } catch (error) {
            console.error('Error fetching data:', error)
            Config?.toastalert("Something Went Wrong", "error")
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
                Config?.toastalert("Something Went Wrong", "error")
            })
    }




    //add new
    // Check form field validation
    const checkValidation = () => {

        console.log(instanceData, "fdj")

        if (!instanceData?.role || !instanceData?.permission) {
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
        data.append('role', instanceData?.role)
        instanceData?.permission?.map(id => data.append('permission', id));
        try {
            const response = await axios.post(`${Config.BASE_URL}${postUrl}/`, data, Config.config);
            console.log(response.data);
            Config?.toastalert("Submitted Successfully", "success")
            setListInstanceData((prevstate) => {
                return [...prevstate, response?.data]
            })

            handleClose();

        } catch (error) {
            if (error?.response?.status === 400) {
                console.log(error);
                setErrorMsg(error?.response?.data)
                Config?.toastalert("Submission Failed", "warn")
            }

            else {
                Config?.toastalert("Something Went Wrong", "error")
            }
        }


    };



    //UPDATE REQUESTS

    const updateInstance = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()
        data.append('role', instanceData?.role)

        instanceData?.permission?.map(id => data.append('permission', id));

        // data.append('permission',permissionIds)

        axios
            .patch(`${Config.BASE_URL}${updateUrl}/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)
                    Config?.toastalert("Updated Successfully", "success")
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
                if (error?.response?.status === 400) {
                    console.log(error);
                    setErrorMsg(error?.response?.data)
                    Config?.toastalert("Updation Failed", "warn")
                }

                else {
                    Config?.toastalert("Something Went Wrong", "error")
                }
            })
    }

    //DELETE REQUESTS

    const deleteInstance = (id) => {
        console.log('deleting')

        axios.delete(`${Config.BASE_URL}${deleteUrl}/${id}/`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    Config?.toastalert("Deleted Successfully", "info")
                    setListInstanceData(listInstanceData?.filter((e) => e.id !== id))
                    handleClose();

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
                handleClose();
            })
    }






    // handle instance change

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInstanceData({
            ...instanceData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event) => {

        const { value, checked } = event.target;

        // const updatedPermissions = isAdd ? checked :instanceData?.permission?.indexOf(permissionId) !== -1
        if (isAdd) {
            console.log(1)
            const permissionId = parseInt(value, 10);
            // const permissionId = value
            const updatedPermissions = checked
                ? [...instanceData?.permission, permissionId]
                : instanceData?.permission?.filter((permission) => permission !== permissionId);

            setInstanceData({
                ...instanceData,
                permission: updatedPermissions,
            });

        }

        else {
            console.log(2)
            const permissionId = parseInt(value, 10); // Convert value to integer
            const updatedPermissions = instanceData?.permission?.indexOf(permissionId) !== -1
                ? instanceData?.permission?.filter((permission) => permission !== permissionId)
                : [...instanceData?.permission, permissionId];


            setInstanceData({
                ...instanceData,
                permission: updatedPermissions,
            });

        }



    };



    return (<>



        <ToastContainer />


        {
            (isOpen || isAdd) && (

                // <WardDialogs
                //     setIsOpen={setIsOpen}
                //     isAdd={isAdd}
                //     error={error}

                //     setListData={tableData}
                //     instanceData={instanceData}
                //     setInstanceData={setInstanceData}
                //     handleClose={handleClose}

                //     // functions
                //     addInstance={addNewInstance}
                //     updateInstance={updateInstance}
                //     deleteInstance={deleteInstance}
                //     handleChange={handleChange}
                //     // wardlist={wardlist}
                //     // panchayatList={panchayatList}
                //     // districtList={districtList}
                //     modalHeader={modalHeader}
                //     roleList={roleList}
                //     permissionList={permissionList}
                //     handleCheckboxChange={handleCheckboxChange}
                // />

                <FormModal
                    modalHeader={modalHeader}
                    lazyLoading={lazyLoading}
                    setIsOpen={setIsOpen}
                    isAdd={isAdd}
                    isedit={isedit}
                    setisEdit={setisEdit}
                    // error={error}
                    // errorMsg={errorMsg}

                    // setListData={tableData}
                    instanceData={instanceData}
                    // setInstanceData={setInstanceData}
                    handleClose={handleClose}

                    // functions
                    addInstance={addNewInstance}
                    updateInstance={updateInstance}
                    deleteInstance={deleteInstance}
                    handleChange={handleChange}

                    child={<PermissionForm
                        lazyLoading={lazyLoading}
                        setIsOpen={setIsOpen}
                        isAdd={isAdd}
                        isedit={isedit}

                        error={error}
                        errorMsg={errorMsg}
                        errString={errString}

                        setListData={tableData}
                        instanceData={instanceData}
                        setInstanceData={setInstanceData}

                        handleClose={handleClose}
                        handleChange={handleChange}
                        roleList={roleList}
                        permissionList={permissionList}
                        handleCheckboxChange={handleCheckboxChange}

                    />}
                />

            )
        }

        <Grid item xs={12} sm={6}>
            <Typography variant="h6">{modalHeader + "s"} Details</Typography>
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setisAdd(true)}>
                Create {modalHeader}
            </Button>
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


    </>)
}






const PermissionForm = (props) => {

    const { lazyLoading, setIsOpen, isAdd, isedit,
        errorMsg, errString, error,
        instanceData, setList, setInstanceData,
        handleChange, handleClose,
        roleList, permissionList, handleCheckboxChange,
    } = props


    return (

        <>

            <Grid container spacing={2}>


                <Grid item xs={12} md={6} sm={6}>
                    <SelectDropDown
                        list={roleList}
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

                    <FormGroup>
                        <Typography variant="h6">Permissions</Typography>
                        {permissionList?.map((permission) => (
                            <FormControlLabel
                                key={permission?.id}
                                control={<Checkbox
                                    // checked={instanceData?.permission?.includes((permission.id) !== -1)}
                                    checked={instanceData?.permission?.includes(permission?.id)}
                                    onChange={handleCheckboxChange}
                                    // name={permission.name} 
                                    name="permission" value={permission?.id}
                                    disabled={!isedit && !isAdd}
                                />}
                                label={permission?.name}
                            />
                        ))}


                    </FormGroup>
                </Grid>




            </Grid>

        </>



    )
}







function WardDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList, roleList, permissionList, handleCheckboxChange
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


                    {/* ----------------modal data ------------------ */}

                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label>Roles : </label>
                                        <SelectDropdown
                                            list={roleList}
                                            onchange={handleChange}
                                            selected={instanceData?.role}
                                            showname={"name"}
                                            name={"role"}
                                            disabled={!isedit && !isAdd}
                                            error={error}
                                        />


                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div class="row">
                                <FormGroup>
                                    <Typography variant="h6">Permissions</Typography>
                                    {permissionList?.map((permission) => (
                                        <FormControlLabel
                                            key={permission?.id}
                                            control={<Checkbox
                                                // checked={instanceData?.permission?.includes((permission.id) !== -1)}
                                                checked={instanceData?.permission?.includes(permission?.id)}
                                                onChange={handleCheckboxChange}
                                                // name={permission.name} 
                                                name="permission" value={permission?.id}
                                                disabled={!isedit && !isAdd}
                                            />}
                                            label={permission?.name}
                                        />
                                    ))}


                                </FormGroup>
                            </div>

                            {/* {permissionList?.map((permission) => (
                                <div key={permission?.id}>
                                    <input
                                        type="checkbox"
                                        id={permission?.name}
                                        name="permisssion"
                                        value={permission?.id}
                                        checked={instanceData?.permission?.includes(permission?.id)}
                                        onChange={handleCheckboxChange}
                                        disabled={!isedit && !isAdd}
                                    />
                                    <label htmlFor={permission?.name}>{permission?.name}</label>
                                </div>

                            ))} */}
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
