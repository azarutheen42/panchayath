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
import Grid from '@mui/material/Grid';


function Attendance() {
  // Get

  // meta StATE
  const [listInstanceData, setListInstanceData] = useState([])
  const [instanceData, setInstanceData] = useState({})
  const [isOpen, setIsOpen] = useState();
  const [isedit, setisEdit] = useState();
  const [isAdd, setisAdd] = useState();
  const [error, setError] = useState(false);
  const [image, setImage] = useState();
  const [loader, setLoader] = useState();


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
    'status': (value) => value ? "Present" : "Absent",
    'role_name': (value) => value,
    'image': (value) => value,

  }


  const handleClose = () => {
    setIsOpen()

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


      {
        (isOpen || isAdd) && (

          <CustomizedDialogs
            setIsOpen={setIsOpen}
            isAdd={isAdd}
            error={error}

            setListData={tableData}
            instanceData={instanceData}
            setInstanceData={setInstanceData}
            handleClose={handleClose}

            // functions
            // addInstance={addEmployee}
            // updateInstance={updateEmployee}
            // deleteInstance={deleteEmployee}
            handleChange={handleChange}

          // setImage={setImage}
          // image={image}


          />
        )
      }


      <Grid item xs={6}>
        <Typography variant="h6">Attendance Details</Typography>
      </Grid>
      {/* <Grid item xs={6} display="flex" justifyContent="flex-end">
        <IconButton color="primary" aria-label="add">
          <AddButton
            onClick={() => setisAdd(true)}
            text={" Create"}
          />
        </IconButton>
      </Grid> */}


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

