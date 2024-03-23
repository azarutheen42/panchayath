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
import Grid from '@mui/material/Grid';


import SelectDropDown from "../utils/SelectDropDown"
import FormModal from "../utils/FormModal";
import TextInput from "../utils/TextInput";
import FileUploadComponent from "../utils/FileInput"
import BasicDatePicker from "../utils/DatePicker";
import InputBox from "../utils/NumberInput";
import { TextField } from '@mui/material';
import MultipleSelect from "./MultiDropdown";
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import { Typography, Container, Paper, Card, CardContent, CardMedia } from '@mui/material';


function Attendance() {
  // Get
  const modalHeader = "Attendence";
  // meta StATE
  const [listInstanceData, setListInstanceData] = useState([])
  const [instanceData, setInstanceData] = useState({})
  const [isOpen, setIsOpen] = useState();
  const [isedit, setisEdit] = useState();
  const [isAdd, setisAdd] = useState();
  const [error, setError] = useState(false);
  const [image, setImage] = useState();
  const [loader, setLoader] = useState();


  const [errorMsg, setErrorMsg] = useState({});
  const [errString, seterrString] = useState();
  const [lazyLoading, setLazyLoading] = useState(true);





  // META DATA
  const headersToShow = ["Date", "Emp Id", "Name", "In Time", "Out Time", "Status", "Role", "Photo"]
  const tableData = listInstanceData
  const fieldsToShow = []
  const fields = {
    'date': (value) => today,
    'emp_id': (value) => value,
    'name': (value) => value,
    'clock_in': (value) => value ? value : "Nill",
    'clock_out': (value) => value ? value : "Nill",
    'present': (value) => value ? "Present" : "Absent",
    'role_name': (value) => value,
    'image': (value) => value,

  }


  const handleClose = () => {
    setIsOpen();
    setisAdd();
    setErrorMsg({});
    seterrString();
    setisEdit();

  }

  // ----------------------------------------------

  const [today, setToday] = useState();


  const getCurr = () => {
    console.log('date')
    let date = new Date().toISOString().slice(0, 10)
    console.log('date')
    setToday(date)
  }


  useEffect(() => {
    fetchAttendanceData()
    getCurr()
    // fetchEmpAttendanceData();
  }, [])


  // ------------------------------------------------------------

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(
        Config.BASE_URL + 'worker-stats',
        Config?.config,
      )

      const data = await response.json()
      console.log(data), setListInstanceData(data)
    } catch (error) {
      console.log('Scheme fetching data error', error)
      Config?.toastalert("Something Went Wrong", "error")
    }
  }

  // Emp Individual Ttendance Report
  const fetchEmpAttendanceData = async (id) => {
    try {
      const response = await fetch(
        Config.BASE_URL + `get-attendance/${id}/`,
        Config?.config,
      )

      const data = await response.json()
      console.log(data), setInstanceData(data)
      setIsOpen(true)
    } catch (error) {
      console.log('Emp Attendance fetching data error', error)
      Config?.toastalert("Something Went Wrong", "error")
    }
  }





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
      setEmployee((prevstate) => {
        return {
          ...prevstate, [name]: value
        }

      })

    }

  }

  return (
    <>
      <ToastContainer />

      {
        (isOpen || isAdd) && (

          // <CustomizedDialogs
          //   setIsOpen={setIsOpen}
          //   isAdd={isAdd}
          //   error={error}

          //   setListData={tableData}
          //   instanceData={instanceData}
          //   setInstanceData={setInstanceData}
          //   handleClose={handleClose}

          //   // functions
          //   // addInstance={addEmployee}
          //   // updateInstance={updateEmployee}
          //   // deleteInstance={deleteEmployee}
          //   handleChange={handleChange}

          // // setImage={setImage}
          // // image={image}


          // />


          <FormModal
            modalHeader={modalHeader}
            lazyLoading={lazyLoading}
            setIsOpen={setIsOpen}
            isAdd={isAdd}
            isedit={isedit}
            setisEdit={setisEdit}

            instanceData={instanceData}
            handleClose={handleClose}
            handleChange={handleChange}
            view={true}

            child={<AttendenceModal
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
            // setEndDate={setEndDate}
            // setStartDate={setStartDate}
            // setTrigger={setTrigger}


            />}
          />
        )
      }



      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{modalHeader + "s"} Details</Typography>
      </Grid>

      <Grid item xs={12}>

        <CustomTable
          headers={headersToShow}
          data={tableData}
          fieldsToShow={fieldsToShow}
          fields={fields}

          getInstanceData={fetchEmpAttendanceData}
          loader={loader}
          setLoader={setLoader}
        />

      </Grid>


    </>
  )
}

export default Attendance




const AttendenceModal = (props) => {

  const {
    instanceData, setInstanceData

  } = props


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trigger, setTrigger] = useState(false);


  const styles = {
    cardTitle: {
      color: 'black',
      fontWeight: 500,
      fontSize: '1.2rem',

    },
    cardText: {
      color: 'black',
      fontWeight: 500,
      fontSize: '1rem',
    },

  };




  const cardStyle = {
    display: 'flex',
    marginTop: "-10px",
    marginBottom: "20px",
    // margin: '20px auto',
    // borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    height: "200px"
  };

  const userImageStyle = {
    flex: '0 0 30%',
    height: "180px",
    // width: "5px", // Adjust the width to make the thumbnail smaller
    // height: 'auto', // Maintain aspect ratio
    borderRadius: 4, // Add rounded corners
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const userDetailsStyle = {
    flex: 1,

  };



  useEffect(() => {
    if (startDate || endDate) {
      fetchEmpAttendanceData(instanceData?.id);
    }
  }, [trigger, startDate, endDate])

  const fetchEmpAttendanceData = async (id) => {
    try {
      const response = await fetch(
        Config.BASE_URL + `get-attendance/${id}/?start_date=${startDate ?? ""}&end_date=${endDate ?? ""}`,
        Config?.config,
      )

      const data = await response.json()
      console.log(data), setInstanceData(data)
    } catch (error) {
      console.log('Emp Attendance fetching data error', error)
      Config?.toastalert("Something Went Wrong", "error")
    }
  }


  return (

    <>




      <Grid container spacing={0}>


        <Grid item xs={12} sm={12} md={12}>

          {/* <Card style={cardStyle} >
          <CardMedia
            component="img"
            // style={userImageStyle}
            sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            image={instanceData?.image}
            alt="User Image"
          />
          <CardContent style={userDetailsStyle} >
            <Typography variant="body1" gutterBottom>
              Employee Name : {instanceData?.name}
            </Typography>
            <Typography variant="body1" >
              Employee ID: {instanceData?.emp_id}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Total working Days :{instanceData?.total_working_days}
            </Typography>
            <Typography variant="body1" >
              Present Days : {instanceData?.present_count}
            </Typography>
            <Typography variant="body1" >
              Absent Days : {instanceData?.absent_count}
            </Typography>

          </CardContent>
        </Card> */}

          <Card sx={{ display: 'flex', marginBottom: 2 }}>
            <CardMedia
              component="img"
              image={instanceData?.image}
              alt="Image Title"
              sx={{ width: 150, objectFit: 'cover' }}
            />


            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="body1">
                Employee Name : {instanceData?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Employee ID: {instanceData?.emp_id}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total working Days :{instanceData?.total_working_days}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Present Days : {instanceData?.present_count}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Absent Days : {instanceData?.absent_count}
              </Typography>
            </CardContent>

          </Card>

        </Grid>

      </Grid>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <div class="form-group" style={{ paddingLeft: 5 }}>
            <label for="fromDate" style={{ fontWeight: "bold" }}>From Date :</label>
            <input type="date" class="form-control" id="fromDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div class="form-group" style={{ paddingLeft: 5 }}>
            <label for="toDate" style={{ fontWeight: "bold" }}>To Date :</label>
            <input type="date" class="form-control" id="toDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

        </Grid>

        {/* <Grid item xs={12} sm={2}>
          <div class="form-group" style={{ paddingLeft: 5 }}>
            <label for="search" style={{ fontWeight: "bold" }}>Search</label>
            <button class="btn btn-success"
              onChange={(e) => setTrigger(!trigger)}
            >Get</button>
          </div>

        </Grid> */}

      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className="table-info">
                  <th>S.No</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>

                  {/* <th className="text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {instanceData?.attendances?.map(
                  (empAttenTable, e) => (
                    <tr key={empAttenTable.id}>
                      <td>{e + 1}</td>
                      <td>{empAttenTable.date}</td>
                      <td>{empAttenTable.clock_in ?? 0.00}</td>
                      <td>{empAttenTable.clock_out ?? 0.00}</td>

                      {/* <td>
                      <p className="text-center">
                        <button className="btn btn-success">
                          <span className="glyphicon glyphicon-pencil"></span>{' '}
                          Edit
                        </button>
                      </p>
                    </td> */}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {!instanceData?.attendances?.length && (

                <div className="text-center p-5"> No data </div>
          )}
        </Grid>

      </Grid>






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

          sx={Config.style}
        >


          {/* <Typography gutterBottom>

                  </Typography> */}

          {/* <div class="modal-body">
                      <div class="card"> */}


          {/* ----------------modal data */}

          <div className="card-body">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-xs-3 col-sm-6">
                <div className="form-group">
                  <label for="fromDate">From Date :</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                  />
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xs-3 col-sm-6">
                <div className="form-group">
                  <label for="fromDate">To Date :</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                  />
                </div>
              </div>
              <div className="col-md-2 col-lg-2 col-xs-3 col-sm-6">
                <div className="form-group">
                  <label for="search">Search :</label>
                  <button
                    className="btn btn-info"
                    onClick="getReport()"
                  >
                    Get
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <div className="form-group">
                  <img
                    src={instanceData?.image ? Config?.MEDIA_URL + instanceData?.image : Config?.avatar}
                    className="emp-thumb"
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                <div className="form-group">
                  <h5 className="">
                    Emp Name : &nbsp;
                    <span className="form-required">
                      {instanceData?.name}
                    </span>
                  </h5>
                  <h5 className="">
                    Emp id : &nbsp; &nbsp;
                    <span className="form-required">
                      {instanceData?.emp_id}
                    </span>
                  </h5>
                  <h5 className="">
                    Total working Days : &nbsp;
                    <span className="form-required">
                      {instanceData?.total_working_days}
                    </span>
                  </h5>
                  <h5 className="">
                    Present Days : &nbsp;
                    <span className="form-required">
                      {instanceData?.present_count}
                    </span>
                  </h5>
                  <h5 className="">
                    Absent Days : &nbsp;
                    <span className="form-required">
                      {instanceData?.absent_count}
                    </span>
                  </h5>
                </div>
              </div>
              <hr />

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr className="table-info">
                      <th>S.No</th>
                      <th>Date</th>
                      <th>In Time</th>
                      <th>Out Time</th>

                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instanceData?.attendances?.map(
                      (empAttenTable, e) => (
                        <tr key={empAttenTable.id}>
                          <td>{e + 1}</td>
                          <td>{empAttenTable.date}</td>
                          <td>{empAttenTable.clock_in}</td>
                          <td>{empAttenTable.clock_out}</td>

                          <td>
                            <p className="text-center">
                              <button className="btn btn-success">
                                <span className="glyphicon glyphicon-pencil"></span>{' '}
                                Edit
                              </button>
                            </p>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
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

