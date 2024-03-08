import { useEffect } from 'react'
import { useState }  from 'react'
import axios         from 'axios'
import Config        from '../Config'
import Box           from '@mui/material/Box'
import Modal         from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

function Attendance() {
  // Get

  const [attendanceList, setAttendanceList] = useState([])
  // const [empAttendanceList, setEmpAttendanceList] = useState([]);

  const [empAttn, setEmpAttn] = useState()

  const [isOpen, setIsOpen] = useState()

  const [isAdd, setisAdd] = useState()

  const [today, setToday] = useState()

  const handleClose = () => {
    setIsOpen()
    
  }

  const getCurr = () => {
    console.log('date')
    let date = new Date().toISOString().slice(0, 10)
    console.log('date')
    setToday(date)
  }

  console.log(isOpen, 'open error')
  useEffect(() => {
    fetchAttendanceData()
    getCurr()
    // fetchEmpAttendanceData();
  }, [])

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(
        Config.BASE_URL + 'worker-stats',
        Config?.config,
      )

      const data = await response.json()
      console.log(data), setAttendanceList(data)
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
      console.log(data), setEmpAttn(data)
      setIsOpen(true)
    } catch (error) {
      console.log('Emp Attendance fetching data error', error)
    }
  }

  return (
    <>
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Attendance Details</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {(isOpen || isAdd) && (
              <>
                <Modal
                  // keepMounted
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Box sx={style}>
                    <div className="modal-content">
                      <form action="" method="post" id="">
                        <h3 style={{ marginLeft: 20 }}>Attendance Report</h3>
                        <div className="modal-body">
                          <div className="card">
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
                                      src={Config.MEDIA_URL + empAttn.image}
                                      className="emp-thumb"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                                  <div className="form-group">
                                    <h5 className="">
                                      Emp Name : &nbsp;
                                      <span className="form-required">
                                        {empAttn.name}
                                      </span>
                                    </h5>
                                    <h5 className="">
                                      Emp id : &nbsp; &nbsp;
                                      <span className="form-required">
                                        {empAttn.emp_id}
                                      </span>
                                    </h5>
                                    <h5 className="">
                                      Total working Days : &nbsp;
                                      <span className="form-required">
                                        {empAttn.total_working_days}
                                      </span>
                                    </h5>
                                    <h5 className="">
                                      Present Days : &nbsp;
                                      <span className="form-required">
                                        {empAttn.present_count}
                                      </span>
                                    </h5>
                                    <h5 className="">
                                      Absent Days : &nbsp;
                                      <span className="form-required">
                                        {empAttn.absent_count}
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
                                      {empAttn?.attendances?.map(
                                        (empAttenTable,e) => (
                                          <tr key={empAttenTable.id}>
                                            <td>{e+1}</td>
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
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>
              </>
            )}
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                <div className="form-group">
                  <label
                  // style="font-weight: bold;"
                  >
                    Employee Name :
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              
             
              <div className="col-md-3 col-lg-3 col-xs-3 col-sm-6">
                <div className="form-group">
                  <label for="search">Search :</label>
                  <button className="btn btn-success" onClick="getReport()">
                    Get Report
                  </button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-info">
                    <th>S.No</th>
                    <th>Date </th>
                    <th>Emp id </th>
                    <th>Employee Name </th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Status</th>
                    <th>Role Name</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList?.map((attenTable) => (
                    <tr key={attenTable.id}>
                      <td></td>
                      <td>{today}</td>
                      <td>{attenTable.emp_id}</td>
                      <td>{attenTable.name}</td>
                      <td>{attenTable.clock_in}</td>
                      <td>{attenTable.clock_out}</td>
                      <td>{attenTable.present}</td>
                      <td>{attenTable.role_name}</td>
                      <td>
                        <img
                          src={Config.MEDIA_URL + attenTable.image}
                          className="emp-thumb"
                        />
                      </td>

                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => fetchEmpAttendanceData(attenTable.id)}
                        >
                          <span className="glyphicon glyphicon-eye-open"></span>{' '}
                          View
                        </button>
                        <button className="btn btn-danger">
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
    </>
  )
}

export default Attendance
