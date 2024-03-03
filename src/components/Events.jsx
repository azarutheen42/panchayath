import { useState, useEffect } from 'react'
import axios from 'axios'
import Config from '../Config'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

function Events(props) {
    const [date, setDate] = useState()
    const [subject, setSubject] = useState()
    const [time, settime] = useState()
    const [place, setPlace] = useState()
    const [heldby, setheldby] = useState()
    const [mdetails, setmdetails] = useState()
    const [meetings, setmeetings] = useState()
    const [updatemeetings, setupdatemeetings] = useState()
    const [isedit, setisEdit] = useState()
    const [isAdd, setisAdd] = useState()
    const [id, setId] = useState()
    const [error, setError] = useState()

    const [open, setOpen] = useState(false)
    //Scheme

    const [schemedate, setschemeDate] = useState('')
    const [schemetime, setschemeTime] = useState('')
    const [scheme_name, setScheme_Name] = useState('')
    const [period, setPeriod] = useState('')
    const [Announced_by, setAnnounced_by] = useState('')
    const [details, setScheme_Details] = useState('')
    const [schemelist, setschemeList] = useState()

    //Events
    const [event_date, setEventDate] = useState()
    const [event_time, setEventTime] = useState()
    const [event_name, setEvent_Name] = useState()
    const [eventPlace, seteventPlace] = useState()
    const [eventDetails, seteventDetails] = useState()
    const [eventList, setEventList] = useState([])

    //ANNOUNCEMENT'
    const [annoncementDate, setAnnouncement_Date] = useState()
    const [annoncementTime, setAnnouncement_Time] = useState()
    const [annoncementName, setAnnouncement_Name] = useState()
    const [annoncementPlace, setAnnouncement_Place] = useState()
    const [annoncementDetails, setAnnouncement_Details] = useState()
    const [WardList, setWardList] = useState([])
    const [wardNum, setWardNum] = useState()

    //announcement Get
    const [announcementList, setAnnouncementList] = useState([])

    useEffect(() => {
        fetchAnnouncementData()
    }, [])

    const fetchAnnouncementData = async () => {
        try {
            const response = await fetch(
                Config.BASE_URL + 'announcement',
                Config?.config,
            )
            const data = await response.json()
            console.log(data)
            setAnnouncementList(data)
        } catch (error) {
            console.log('Announcement Data Fetching Error', error)
        }
    }
    //Announcement POST
    const handleSubmitannouncement = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('date', annoncementDate)
        data.append('time', annoncementTime)
        data.append('name', annoncementName)
        data.append('place', annoncementPlace)
        data.append('details', annoncementDetails)
        data.append('ward', wardNum)
        axios
            .post(`${Config.BASE_URL}announcement`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Delete Announcement
    const deleteAnnouncement = (id) => {
        console.log('deleting')

        axios
            .delete(`${Config.BASE_URL}announcementdelete/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setAnnouncementList(announcementList?.filter((e) => e.id !== id))
                }
            })

            .catch(function (error) {
                console.log(error)
            })
    }

    // const [schemeid, setSchemeId] = useState();
    useEffect(() => {
        fetchmeetings()
        fetchscheme()
        // fetchevent()
    }, [])

    //Edit Announcement

    const getannouncement = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}announcementedit/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // setupdatemeetings(response?.data)
                    setAnnouncement_Date(response.data.date)
                    setAnnouncement_Time(response.data.time)
                    setAnnouncement_Name(response.data.name)
                    // settime(response.data.time)
                    setAnnouncement_Place(response.data.place)
                    setWardNum(response.data.ward)
                    setAnnouncement_Details(response.data.details)
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
    const handleOpenannouncement = (id) => {
        getannouncement(id)
        setOpen(true)
    }


    //UPDATE ANNOUNCEMENT
    const updateannouncementdetails = (id) => {
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()
        data.append('date', annoncementDate)
        data.append('time', annoncementTime)
        data.append('name', annoncementName)
        data.append('place', annoncementPlace)
        data.append('details', annoncementDetails)
        data.append('ward', wardNum)

        axios
            .put(`${Config.BASE_URL}announcementedit/${id}`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setAnnouncementList((prevArray) => {
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

    //EVENTS POST

    const handleSubmitEvent = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('date', event_date)
        data.append('time', event_time)
        data.append('event_name', event_name)
        data.append('Place', eventPlace)
        data.append('details', eventDetails)
        axios
            .post(`${Config.BASE_URL}eventregister`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    //Events Get

    useEffect(() => {
        fetchevent()
        fetchwards()
    }, [])


    //ward fetch
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
    //Event GET

    const fetchevent = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(
                Config.BASE_URL + 'eventregister',
                Config?.config,
            )
            const data = await response.json()

            console.log(data)
            setEventList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    //Event Edit

    const getevents = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}eventregisteredit/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // setupdatemeetings(response?.data)
                    setEventDate(response.data.date)
                    setEventTime(response.data.time)
                    setEvent_Name(response.data.event_name)
                    // settime(response.data.time)
                    setPlace(response.data.Place)
                    seteventDetails(response.data.details)
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

    const handleOpenEvent = () => {
        getevents()
        setOpen(true)
    }


    //Update EVENTS

    const updateeventdetails = (id) => {
        // const check = checkSchemeValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()
        data.append('date', event_date)
        data.append('time', event_time)
        data.append('event_name', event_name)
        data.append('Place', eventPlace)
        data.append('details', eventDetails)

        axios
            .put(`${Config.BASE_URL}eventregisteredit/${id}`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setEventList((prevArray) => {
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

    //Event Delete
    const deleteEvent = (id) => {
        console.log('deleting')

        axios
            .delete(`${Config.BASE_URL}eventregister/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setEventList(eventList?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    //scheme details

    const handleSubmitScheme = async (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('date', schemedate)
        data.append('time', schemetime)
        data.append('scheme_name', scheme_name)
        data.append('Period', period)
        data.append('Announced_by', Announced_by)
        data.append('details', details)
        axios
            .post(`${Config.BASE_URL}scheme`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //Scheme LIST

    const fetchscheme = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'scheme', Config?.config)
            const data = await response.json()

            console.log(data)
            setschemeList(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setisEdit()
    }

    const handleOpen = () => {
        getmeeting()
        setOpen(true)
    }
    //SCHEME Edit

    const getscheme = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}schemeedit/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // setupdatemeetings(response?.data)

                    setDate(response.data.date)
                    setSubject(response.data.Subject)
                    setScheme_Name(response.data.scheme_name)
                    // settime(response.data.time)
                    setPeriod(response.data.Period)
                    setAnnounced_by(response.data.Announced_by)
                    setScheme_Details(response.data.details)
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
    //Delete Scheme
    const deletescheme = (id) => {
        console.log('deleting')

        axios
            .delete(`${Config.BASE_URL}schemedelete/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setschemeList(schemelist?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //Validation for scheme
    const checkSchemeValidation = () => {
        if (!period || !details) {
            console.log('please fill required fields')
            setError(true)
            return false
        } else {
            setError(false)
            return true
        }
    }
    //Update Scheme
    const updateSchemedetails = (id) => {
        const check = checkSchemeValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append('date', schemedate)
        data.append('time', schemetime)
        data.append('scheme_name', scheme_name)
        data.append('Period', period)
        data.append('Announced_by', Announced_by)
        data.append('details', details)

        axios
            .put(`${Config.BASE_URL}schemeedit/${id}`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setschemeList((prevArray) => {
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

    //Form Submit

    const handlesubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('date', date)
        data.append('time', time)
        data.append('subject', subject)
        data.append('place', place)
        data.append('held_by', heldby)
        data.append('details', mdetails)
        axios
            .post(`${Config.BASE_URL}meeting`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //fetching mom details
    const fetchmeetings = async () => {
        try {
            // Make an API call to fetch data from the backend
            const response = await fetch(Config.BASE_URL + 'meeting', Config?.config)
            const data = await response.json()
            console.log(data)
            setmeetings(data)
            // Assuming your data is an array of objects with 'value' and 'label' properties
            // setWardList(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    //Delete meetings
    const deletemeetings = (id) => {
        console.log('deleting')

        axios
            .delete(`${Config.BASE_URL}momdelete/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setmeetings(meetings?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //Edit Meetings
    const getmeeting = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}momedit/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // setupdatemeetings(response?.data)
                    setDate(response.data.date)
                    setSubject(response.data.subject)
                    settime(response.data.time)
                    setPlace(response.data.place)
                    setheldby(response.data.held_by)
                    setmdetails(response.data.details)
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

    //Validation + Updating data

    const checkValidation = () => {
        if (!date || !time || !subject || !place) {
            console.log('please fill required fields')
            setError(true)
            return false
        } else {
            setError(false)
            return true
        }
    }
    const updateMeetingdetails = (id) => {
        const check = checkValidation()

        if (!check) {
            return
        }

        const data = new FormData()

        data.append('date', date)
        data.append('time', time)
        data.append('Subject', subject)
        data.append('Place', place)
        data.append('Held_by', heldby)
        data.append('details', mdetails)

        axios
            .put(`${Config.BASE_URL}momedit/${id}`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setmeetings((prevArray) => {
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

    // const handleClose = () => {
    //   setOpen(false)
    //   setisEdit()
    // }

    // const handleOpen = () => {
    //   getmeeting()
    //   setOpen(true)
    // }

    const [staffsubject, setStaffSubject] = useState()
    const [staffdetails, setStaffDetails] = useState()
    const [staffnoticeList, setstaffnoticeList] = useState([])
    //Get staff Notice Board
    useEffect(() => {
        getstaffnotice()
    }, [])

    const getstaffnotice = async () => {
        // e.preventDefault()
        axios
            .get(`${Config.BASE_URL}staffnotice`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data)
                    setstaffnoticeList(response.data)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //SUBMIT staff notice list
    const handleSubmitstaffnotice = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('subject', staffsubject)
        data.append('details', staffdetails)

        axios
            .post(`${Config.BASE_URL}staffnotice/`, data, Config.config)
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response)
                    setstaffnoticeList((prevstate) => {
                        return [...prevstate, response?.data]
                    })


                    handleClose()
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    console.log(staffnoticeList)
    //Edit staff notice

    const getstaffnoticeid = (id, edit) => {
        // setOpen(true)
        axios
            .get(`${Config.BASE_URL}staffnotice/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    setStaffSubject(response.data.subject)
                    setStaffDetails(response.data.details)
                    setId(response.data.id)
                    setisEdit(edit)
                    setOpen(true)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Staff Notice DELETE

    const deletestaffnotice = (id) => {
        console.log('deleting')
        console.log(id)

        axios.delete(`${Config.BASE_URL}staffnotice/${id}`, Config.config)
            .then(function (response) {
                if (response.status === 204) {
                    console.log(response)
                    setstaffnoticeList(staffnoticeList?.filter((e) => e.id !== id))
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    // Update Staff Notice 
    const handleCloseStaff = () => {
        setOpen()
        setisEdit(true)
    }
    // const handleOpenstaffnotice = (id) => {
    //     getannouncement(id)
    //     setOpen(true)
    //   }
    // update
    const updatestaffnotice = (id) => {
        // // const check = checkValidation()

        // if (!check) {
        //   return
        // }

        const data = new FormData()

        data.append('subject', staffsubject)
        data.append('details', staffdetails)
        axios
            .put(`${Config.BASE_URL}staffnotice/${id}/`, data, Config.config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response)

                    setstaffnoticeList((prevArray) => {
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


    return (
        <>
            {props?.path === 'minutes-of-meeting' && (
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Minutes of Meeting Details</h4>
                        </div>
                        <div className="page-btn">
                            <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#myModal"
                            >
                                <span className="glyphicon glyphicon-list-alt"></span>&nbsp; Add
                                meeting
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
                                                Create Minute Of Meeting{' '}
                                            </h3>
                                            <div className="modal-body">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Date : <span className="form-required">*</span>
                                                                    </label>
                                                                    <input type="date" className="form-control" name="date" onChange={(e) => setDate(e.target.value)} defaultValue={date || ''} required
                                                                    />
                                                                    {error && !date && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Time : <span className="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name="category_name"
                                                                        onChange={(e) => settime(e.target.value)}
                                                                        defaultValue={time || ''}
                                                                        required
                                                                    />
                                                                    {error && !time && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Subject :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Subject"
                                                                        onChange={(e) => setSubject(e.target.value)}
                                                                        defaultValue={subject}
                                                                        required
                                                                    />
                                                                    {error && !subject && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Place : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Place"
                                                                        onChange={(e) => setPlace(e.target.value)}
                                                                        defaultValue={place}
                                                                        required
                                                                    />
                                                                    {error && !place && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Held By :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Held_by"
                                                                        onChange={(e) => setheldby(e.target.value)}
                                                                        defaultValue={heldby || ''}
                                                                        required
                                                                    />
                                                                    {error && !heldby && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Meeting Details :
                                                                    </label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="details"
                                                                        onChange={(e) =>
                                                                            setmdetails(e.target.value)
                                                                        }
                                                                        defaultValue={mdetails || ''}
                                                                    ></textarea>
                                                                    {error && !mdetails && (
                                                                        <span className="req-text">
                                                                            This field is required
                                                                        </span>
                                                                    )}
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
                                                        onClick={() => updateMeetingdetails(id)}
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
                                        <form action="" method="post" id="">
                                            <h3 style={{ marginLeft: 20 }}>
                                                Create Minute Of Meeting{' '}
                                            </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Date : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        name="date"
                                                                        onChange={(e) => setDate(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Time : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        class="form-control"
                                                                        name="category_name"
                                                                        onChange={(e) => settime(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Subject :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Subject"
                                                                        onChange={(e) => setSubject(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Place : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Place"
                                                                        onChange={(e) => setPlace(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Held By :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Held_by"
                                                                        onChange={(e) => setheldby(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Meeting Details :
                                                                    </label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="details"
                                                                        onChange={(e) =>
                                                                            setmdetails(e.target.value)
                                                                        }
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="submit"
                                                    class="btn btn-success"
                                                    onClick={handlesubmit}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </form>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Subject</th>
                                            <th>Place</th>
                                            <th>Held by</th>
                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meetings?.map((meetingdetails, e) => (
                                            <tr key={meetingdetails.id}>
                                                <td>{e + 1}</td>
                                                <td>{meetingdetails.date}</td>
                                                <td>{meetingdetails.time}</td>
                                                <td>{meetingdetails.Subject}</td>
                                                <td>{meetingdetails.Place}</td>
                                                <td>{meetingdetails.Held_by}</td>
                                                <td>{meetingdetails.details}</td>

                                                <td>
                                                    {/* <button class="btn btn-success">
                            <span class="glyphicon glyphicon-pencil"></span>{' '}
                            Edit
                          </button> */}
                                                    <button
                                                        class="btn btn-success"
                                                        onClick={() => getmeeting(meetingdetails?.id, true)}
                                                    >
                                                        <span class="glyphicon glyphicon-pencil"></span>{' '}
                                                        Edit
                                                    </button>
                                                    <button class="btn btn-info" onClick={handleOpen}>
                                                        <span class="glyphicon glyphicon-eye-open"></span>{' '}
                                                        View
                                                    </button>
                                                    <button
                                                        class="btn btn-danger"
                                                        onClick={() => deletemeetings(meetingdetails?.id)}
                                                    >
                                                        <span class="glyphicon glyphicon-trash"></span>{' '}
                                                        Delete
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
            )}

            {props?.path === 'scheme' && (
                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4> Scheme Details</h4>
                        </div>
                        <div class="page-btn">
                            <button
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#myModal"
                            >
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add
                                scheme
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
                                            <h3 style={{ marginLeft: 20 }}>Scheme </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Date : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setschemeDate(e.target.value)
                                                                        }
                                                                        name="date"
                                                                        defaultValue={date || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                  <label class="form-label">
                                    Time : <span class="form-required">*</span>
                                  </label>
                                  <input
                                    type="time"
                                    class="form-control"
                                    onChange={(e) =>
                                      setschemeTime(e.target.value)
                                    }
                                    name="time"
                                    defaultValue={time || ''}
                                    required
                                  />
                                </div>
                              </div> */}
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Scheme Name :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setScheme_Name(e.target.value)
                                                                        }
                                                                        name="scheme_name"
                                                                        defaultValue={scheme_name || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Period :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) => setPeriod(e.target.value)}
                                                                        name="Period"
                                                                        defaultValue={period}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Announced By :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setAnnounced_by(e.target.value)
                                                                        }
                                                                        name="announced_by"
                                                                        defaultValue={Announced_by}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Scheme Details :
                                                                    </label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="details"
                                                                        defaultValue={details}
                                                                        onChange={(e) =>
                                                                            setScheme_Details(e.target.value)
                                                                        }
                                                                    ></textarea>
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
                                                        onClick={() => updateSchemedetails(id)}
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
                                        <form action="" method="post" id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Scheme </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Date : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setschemeDate(e.target.value)
                                                                        }
                                                                        name="date"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Time : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setschemeTime(e.target.value)
                                                                        }
                                                                        name="time"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Scheme Name :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setScheme_Name(e.target.value)
                                                                        }
                                                                        name="scheme_name"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Period :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) => setPeriod(e.target.value)}
                                                                        name="Period"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Announced By :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        onChange={(e) =>
                                                                            setAnnounced_by(e.target.value)
                                                                        }
                                                                        name="Announced_by"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Scheme Details :
                                                                    </label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="details"
                                                                        onChange={(e) =>
                                                                            setScheme_Details(e.target.value)
                                                                        }
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="submit"
                                                    class="btn btn-success"
                                                    onClick={handleSubmitScheme}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </form>
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
                                            <th>Date </th>

                                            <th>Scheme Name</th>
                                            <th>Scheme period</th>
                                            <th>Announced by</th>
                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schemelist?.map((user, e) => (
                                            <tr key={user.id}>
                                                <td>{e + 1}</td>
                                                <td>{user.date}</td>
                                                <td>{user.scheme_name}</td>
                                                <td>{user.Period}</td>
                                                <td>{user.Announced_by}</td>
                                                <td>{user.details}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => getscheme(user?.id, true)}
                                                    >
                                                        <span class="glyphicon glyphicon-pencil"></span>{' '}
                                                        Edit
                                                    </button>
                                                    <button class="btn btn-info" onClick={handleOpen}>
                                                        <span class="glyphicon glyphicon-eye-open"></span>{' '}
                                                        View
                                                    </button>
                                                    <button
                                                        class="btn btn-danger"
                                                        onClick={() => deletescheme(user?.id)}
                                                    >
                                                        <span class="glyphicon glyphicon-trash"></span>{' '}
                                                        Delete
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
            )}

            {props?.path === 'events' && (
                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Events Details</h4>
                        </div>
                        <div class="page-btn">
                            <button
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#myModal"
                            >
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add
                                Events
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
                                            <h3 style={{ marginLeft: 20 }}>Events </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Date : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        name="date"
                                                                        onChange={(e) =>
                                                                            setEventDate(e.target.value)
                                                                        }
                                                                        defaultValue={event_date || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Time : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        class="form-control"
                                                                        name="time"
                                                                        onChange={(e) =>
                                                                            setEventTime(e.target.value)
                                                                        }
                                                                        defaultValue={event_time || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Event Name :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="event_name"
                                                                        onChange={(e) =>
                                                                            setEvent_Name(e.target.value)
                                                                        }
                                                                        defaultValue={event_name || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Place : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Place"
                                                                        onChange={(e) =>
                                                                            seteventPlace(e.target.value)
                                                                        }
                                                                        defaultValue={eventPlace || ''}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label"> Details :</label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="eventDetails"
                                                                        onChange={(e) =>
                                                                            seteventDetails(e.target.value)
                                                                        }
                                                                        defaultValue={eventDetails || ''}
                                                                    ></textarea>
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
                                                        onClick={() => updateeventdetails(id)}
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
                                        <form action="" method="post" id="">
                                            <h3 style={{ marginLeft: 20 }}>Create Events </h3>
                                            <div class="modal-body">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Date : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        class="form-control"
                                                                        name="date"
                                                                        onChange={(e) =>
                                                                            setEventDate(e.target.value)
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Time : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        class="form-control"
                                                                        name="time"
                                                                        onChange={(e) =>
                                                                            setEventTime(e.target.value)
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Event Name :{' '}
                                                                        <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="event_name"
                                                                        onChange={(e) =>
                                                                            setEvent_Name(e.target.value)
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label">
                                                                        Place : <span class="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        name="Place"
                                                                        onChange={(e) =>
                                                                            seteventPlace(e.target.value)
                                                                        }
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label class="form-label"> Details :</label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="eventDetails"
                                                                        onChange={(e) =>
                                                                            seteventDetails(e.target.value)
                                                                        }
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="submit"
                                                    class="btn btn-success"
                                                    onClick={handleSubmitEvent}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </form>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Event Name</th>
                                            <th>Place</th>

                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {eventList?.map((events, e) => (
                                            <tr key={events.id}>
                                                <td>{e + 1}</td>
                                                <td>{events.date}</td>
                                                <td>{events.time}</td>
                                                <td>{events.event_name}</td>
                                                <td>{events.Place}</td>

                                                <td>{events.details}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => getevents(events?.id, true)}
                                                    >
                                                        <span className="glyphicon glyphicon-pencil"></span>{' '}
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-info"
                                                        onClick={handleOpenEvent}
                                                    >
                                                        <span className="glyphicon glyphicon-eye-open"></span>{' '}
                                                        View
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => deleteEvent(events?.id)}>
                                                        <span
                                                            className="glyphicon glyphicon-trash"

                                                        ></span>{' '}
                                                        Delete
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
            )}

            {props?.path === 'public-notice' && (
                <div className="d-flex align-content-end flex-wrap">
                    <div>
                        <h3>No Data To Dispaly</h3>
                    </div>
                </div>
            )}

            {props?.path === "staff-notice" && (

                <>
                    <div className="content">
                        <div className="page-header">
                            <div className="page-title">
                                <h4>Staff Notice Board Details</h4>
                            </div>
                            <div className="page-btn">
                                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                    <span className="glyphicon glyphicon-user"></span>
                                    Add new notice
                                </button>

                                {open && (
                                    <Modal
                                        // keepMounted
                                        open={open}
                                        onClose={handleCloseStaff}
                                        aria-labelledby="keep-mounted-modal-title"
                                        aria-describedby="keep-mounted-modal-description"
                                    >
                                        <Box sx={style}>
                                            <div className="modal-content">

                                                <h3 style={{ marginLeft: 20 }}> Staff Notice Board Details</h3>
                                                <div className="modal-body">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-12 col-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label"
                                                                        >
                                                                            Subject  :
                                                                            <span className="form-required">*</span>
                                                                        </label>
                                                                        <textarea name="subject" onChange={(e) => setStaffSubject(e.target.value)} defaultValue={staffsubject || ''} id="" cols="30" rows="4"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-12 col-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label"
                                                                        >
                                                                            Details :
                                                                            <span className="form-required">*</span>
                                                                        </label>
                                                                        <textarea name="details" onChange={(e) => setStaffDetails(e.target.value)} defaultValue={staffdetails || ''} id="details" cols="30" rows="4"></textarea>

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
                                                            className="btn btn-success" onClick={() => updatestaffnotice(id)}

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

                                            <form action="" method="post" id="">
                                                <h3 style={{ marginLeft: 20 }}>Create staffnotice Board</h3>
                                                <div className="modal-body">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-12 col-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label"
                                                                        >
                                                                            Subject  :
                                                                            <span className="form-required">*</span>
                                                                        </label>
                                                                        <textarea name="subject" onChange={(e) => setStaffSubject(e.target.value)} id="" cols="30" rows="4"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-12 col-12">
                                                                    <div className="form-group">
                                                                        <label className="form-label"
                                                                        >
                                                                            Details :
                                                                            <span className="form-required">*</span>
                                                                        </label>
                                                                        <textarea name="details" onChange={(e) => setStaffDetails(e.target.value)} id="details" cols="30" rows="4"></textarea>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="submit" className="btn btn-success" onClick={handleSubmitstaffnotice}>Save</button>
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleCloseStaff}>Close</button>
                                                </div>
                                            </form>
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
                                            <th>Subject</th>
                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffnoticeList?.map((staffnotice, e) => (
                                            <tr key={staffnotice.id}>
                                                <td>{e + 1}</td>
                                                <td>{staffnotice.subject}</td>
                                                <td>{staffnotice.details}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() =>
                                                        getstaffnoticeid(staffnotice?.id, true)}>
                                                        <span className="glyphicon glyphicon-pencil"></span>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-info" onClick={() =>
                                                        getstaffnotice(staffnotice?.id, false)}>
                                                        <span className="glyphicon glyphicon-eye-open"></span>
                                                        View
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => deletestaffnotice(staffnotice?.id)} >
                                                        <span className="glyphicon glyphicon-trash" ></span>
                                                        Delete
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


                </>
            )}

            {props?.path === 'announcements' && (
                <div class="content">
                    <div class="page-header">
                        <div class="page-title">
                            <h4>Announcement Details</h4>
                        </div>
                        <div class="page-btn">
                            <button
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#myModal"
                            >
                                <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add
                                Announcement
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
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Date :{' '}
                                                                        <span className="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        name="date"
                                                                        onChange={(e) =>
                                                                            setAnnouncement_Date(e.target.value)
                                                                        } defaultValue={annoncementDate || ''}
                                                                        required
                                                                    />
                                                                    {(error && !announcementList?.date) && (
                                                                        <span className="req-text">This field is required</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Time :{' '}
                                                                        <span className="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        name="time"
                                                                        onChange={(e) =>
                                                                            setAnnouncement_Time(e.target.value)
                                                                        } defaultValue={annoncementTime || ''}
                                                                        required
                                                                    />
                                                                    {(error && !announcementList?.time) && (
                                                                        <span className="req-text">This field is required</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Announcement Name :{' '}
                                                                        <span className="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="name"
                                                                        onChange={(e) =>
                                                                            setAnnouncement_Name(e.target.value)
                                                                        } defaultValue={annoncementName || ''}
                                                                        required
                                                                    />
                                                                    {(error && !announcementList?.name) && (
                                                                        <span className="req-text">This field is required</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        Place :{' '}
                                                                        <span className="form-required">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="place"
                                                                        onChange={(e) =>
                                                                            setAnnouncement_Place(e.target.value)
                                                                        } defaultValue={annoncementPlace}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {' '}
                                                                        Details :
                                                                    </label>
                                                                    <textarea
                                                                        cols="30"
                                                                        rows="1"
                                                                        name="details"
                                                                        onChange={(e) =>
                                                                            setAnnouncement_Details(e.target.value)
                                                                        } defaultValue={annoncementDetails || ''}
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-sm-6 col-12">
                                                                <div class="form-group">
                                                                    <label style={{ color: 'grey' }}>
                                                                        Ward No :
                                                                    </label>
                                                                    <select
                                                                        name="ward_no"
                                                                        id=""
                                                                        className="custom-dropdown"
                                                                        onChange={(e) =>
                                                                            setWardNum(e?.target?.value)
                                                                        } defaultValue={wardNum || ''}
                                                                    >
                                                                        <option disabled selected value>
                                                                            -----------
                                                                        </option>
                                                                        {WardList?.map((e) => (
                                                                            <option value={e?.id}>
                                                                                {e?.ward_no}
                                                                            </option>
                                                                        ))}
                                                                    </select>
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
                                                        onClick={() => updateannouncementdetails(id)}
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
                                        <h3 style={{ marginLeft: 20 }}>Create Announcement </h3>
                                        <div class="modal-body">
                                            <div class="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    Date :{' '}
                                                                    <span className="form-required">*</span>
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    name="date"
                                                                    onChange={(e) =>
                                                                        setAnnouncement_Date(e.target.value)
                                                                    }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    Time :{' '}
                                                                    <span className="form-required">*</span>
                                                                </label>
                                                                <input
                                                                    type="time"
                                                                    className="form-control"
                                                                    name="time"
                                                                    onChange={(e) =>
                                                                        setAnnouncement_Time(e.target.value)
                                                                    }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    Announcement Name :{' '}
                                                                    <span className="form-required">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="name"
                                                                    onChange={(e) =>
                                                                        setAnnouncement_Name(e.target.value)
                                                                    }
                                                                    required
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    Place :{' '}
                                                                    <span className="form-required">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="place"
                                                                    onChange={(e) =>
                                                                        setAnnouncement_Place(e.target.value)
                                                                    }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="form-label"> Details :</label>
                                                                <textarea
                                                                    cols="30"
                                                                    rows="1"
                                                                    name="details"
                                                                    onChange={(e) =>
                                                                        setAnnouncement_Details(e.target.value)
                                                                    }
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6 col-sm-6 col-12">
                                                            <div class="form-group">
                                                                <label style={{ color: 'grey' }}>
                                                                    Ward No :
                                                                </label>
                                                                <select
                                                                    name="ward_no"
                                                                    id=""
                                                                    className="custom-dropdown"
                                                                    onChange={(e) => setWardNum(e?.target?.value)}
                                                                >
                                                                    <option disabled selected value>
                                                                        -----------
                                                                    </option>
                                                                    {WardList?.map((e) => (
                                                                        <option value={e?.id}>{e?.ward_no}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="submit"
                                                class="btn btn-success"
                                                onClick={handleSubmitannouncement}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-danger"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
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
                                            <th>Date </th>
                                            <th>Time </th>
                                            <th>Announcement Name</th>
                                            <th>Place</th>

                                            <th>Details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcementList?.map((announcements, e) => (
                                            <tr key={announcements.id}>
                                                <td>{e + 1}</td>
                                                <td>{announcements.date}</td>
                                                <td>{announcements.time}</td>
                                                <td>{announcements.name}</td>
                                                <td>{announcements.place}</td>
                                                <td>{announcements.details}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() =>
                                                        getannouncement(announcements?.id, true)}>
                                                        <span
                                                            className="glyphicon glyphicon-pencil"

                                                        ></span>{' '}
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-info" onClick={handleOpenannouncement}
                                                    >
                                                        <span className="glyphicon glyphicon-eye-open"></span>{' '}
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() =>
                                                            deleteAnnouncement(announcements?.id)
                                                        }
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
                            <br />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Events




// function Events(props) {
//     return (
//         <>


//             {props?.path === "minutes-of-meeting" && (

//                 <div class="content">
//                     <div class="page-header">
//                         <div class="page-title">
//                             <h4>Minutes of Meeting Details</h4>
//                         </div>
//                         <div class="page-btn">
//                             <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//                                 <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add meeting
//                             </button>
//                             <div id="myModal" class="modal fade" role="dialog">
//                                 <div class="modal-dialog modal-lg modal-dialog-centered">

//                                     <div class="modal-content">

//                                         <form action="" method="post"  id="">
//                                             <h3 style={{ marginLeft: 20 }}>Create Minute Of Meeting </h3>
//                                             <div class="modal-body">
//                                                 <div class="card">
//                                                     <div class="card-body">
//                                                         <div class="row">
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Date : <span class="form-required">*</span></label>
//                                                                     <input type="date" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Time : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Subject : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_code" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Place : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Held By : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Meeting Details :</label>
//                                                                     <textarea cols="30" rows="1"></textarea>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="modal-footer">
//                                                 <button type="submit" class="btn btn-success">Save</button>
//                                                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="card">
//                         <div class="card-body">
//                             <div class="table-responsive">
//                                 <table class="table table-bordered">
//                                     <thead>
//                                         <tr class="table-info">
//                                             <th>S.No</th>
//                                             <th>Date </th>
//                                             <th>Time </th>
//                                             <th>Subject</th>
//                                             <th>Place</th>
//                                             <th>Held by</th>
//                                             <th>Details</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>

//                                         <tr>
//                                             <td>1.</td>
//                                             <td>01-11-23</td>
//                                             <td>04.30 PM</td>
//                                             <td>Panchayat Project</td>
//                                             <td>Tenkasi</td>
//                                             <td>Vinsup</td>
//                                             <td>Project</td>
//                                             <td>
//                                                 <button class="btn btn-success">
//                                                     <span class="glyphicon glyphicon-pencil"></span> Edit
//                                                 </button>
//                                                 <button class="btn btn-info">
//                                                     <span class="glyphicon glyphicon-eye-open"></span> View
//                                                 </button>
//                                                 <button class="btn btn-danger">
//                                                     <span class="glyphicon glyphicon-trash"></span> Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <br />
//                         </div>
//                     </div>
//                 </div>
//             )}


//             {props?.path === "scheme" && (


//                 <div class="content">
//                     <div class="page-header">
//                         <div class="page-title">
//                             <h4> Scheme Details</h4>
//                         </div>
//                         <div class="page-btn">
//                             <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//                                 <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add scheme
//                             </button>
//                             <div id="myModal" class="modal fade" role="dialog">
//                                 <div class="modal-dialog modal-lg modal-dialog-centered">

//                                     <div class="modal-content">

//                                         <form action="" method="post"  id="">
//                                             <h3 style={{ marginLeft: 20 }}>Create Scheme </h3>
//                                             <div class="modal-body">
//                                                 <div class="card">
//                                                     <div class="card-body">
//                                                         <div class="row">
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Date : <span class="form-required">*</span></label>
//                                                                     <input type="date" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Time : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Scheme Name : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_code" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Period : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Announced By : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Scheme Details :</label>
//                                                                     <textarea cols="30" rows="1"></textarea>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="modal-footer">
//                                                 <button type="submit" class="btn btn-success">Save</button>
//                                                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="card">
//                         <div class="card-body">
//                             <div class="table-responsive">
//                                 <table class="table table-bordered">
//                                     <thead>
//                                         <tr class="table-info">
//                                             <th>S.No</th>
//                                             <th>Date </th>

//                                             <th>Scheme Name</th>
//                                             <th>Scheme period</th>
//                                             <th>Announced by</th>
//                                             <th>Details</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>1.</td>
//                                             <td>31-10-23</td>

//                                             <td>Park Improvement</td>
//                                             <td>3 Months</td>
//                                             <td>State Board</td>
//                                             <td>park area</td>
//                                             <td>
//                                                 <button class="btn btn-success">
//                                                     <span class="glyphicon glyphicon-pencil"></span> Edit
//                                                 </button>
//                                                 <button class="btn btn-info">
//                                                     <span class="glyphicon glyphicon-eye-open"></span> View
//                                                 </button>
//                                                 <button class="btn btn-danger">
//                                                     <span class="glyphicon glyphicon-trash"></span> Delete
//                                                 </button>
//                                             </td>
//                                         </tr>


//                                     </tbody>
//                                 </table>
//                             </div>
//                             <br />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {props?.path === "events" && (

//                 <div class="content">
//                     <div class="page-header">
//                         <div class="page-title">
//                             <h4>Events Details</h4>
//                         </div>
//                         <div class="page-btn">
//                             <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//                                 <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Events
//                             </button>
//                             <div id="myModal" class="modal fade" role="dialog">
//                                 <div class="modal-dialog modal-lg modal-dialog-centered">

//                                     <div class="modal-content">

//                                         <form action="" method="post"  id="">
//                                             <h3 style={{ marginLeft: 20 }}>Create Events </h3>
//                                             <div class="modal-body">
//                                                 <div class="card">
//                                                     <div class="card-body">
//                                                         <div class="row">
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Date : <span class="form-required">*</span></label>
//                                                                     <input type="date" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Time : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Event Name : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_code" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Place : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>

//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label"> Details :</label>
//                                                                     <textarea cols="30" rows="1"></textarea>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="modal-footer">
//                                                 <button type="submit" class="btn btn-success">Save</button>
//                                                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="card">
//                         <div class="card-body">
//                             <div class="table-responsive">
//                                 <table class="table table-bordered">
//                                     <thead>
//                                         <tr class="table-info">
//                                             <th>S.No</th>
//                                             <th>Date </th>
//                                             <th>Time </th>
//                                             <th>Event Name</th>
//                                             <th>Place</th>

//                                             <th>Details</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>1.</td>
//                                             <td>31-10-23</td>
//                                             <td>05.30 PM</td>
//                                             <td>Panchayat Project</td>
//                                             <td>Ayikudy</td>

//                                             <td>Discuss with Project</td>
//                                             <td>
//                                                 <button class="btn btn-success">
//                                                     <span class="glyphicon glyphicon-pencil"></span> Edit
//                                                 </button>
//                                                 <button class="btn btn-info">
//                                                     <span class="glyphicon glyphicon-eye-open"></span> View
//                                                 </button>
//                                                 <button class="btn btn-danger">
//                                                     <span class="glyphicon glyphicon-trash"></span> Delete
//                                                 </button>
//                                             </td>
//                                         </tr>


//                                     </tbody>
//                                 </table>
//                             </div>
//                             <br />
//                         </div>
//                     </div>
//                 </div>


//             )}


//             {props?.path === "public-notice" && (
//                 <div className="d-flex align-content-end flex-wrap">
//                     <div>
//                         <h3>No Data To Dispaly</h3>
//                     </div>

//                 </div>
//             )}


//             {props?.path === "staff-notice" && (

//                 <div className="d-flex align-content-end flex-wrap">
//                     <div>
//                     <h3>No Data To Dispaly</h3>
//                     </div>

//                 </div>
//             )}


//             {props?.path === "announcements" && (

//                 <div class="content">
//                     <div class="page-header">
//                         <div class="page-title">
//                             <h4>Announcement Details</h4>
//                         </div>
//                         <div class="page-btn">
//                             <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//                                 <span class="glyphicon glyphicon-list-alt"></span>&nbsp; Add Announcement
//                             </button>
//                             <div id="myModal" class="modal fade" role="dialog">
//                                 <div class="modal-dialog modal-lg modal-dialog-centered">

//                                     <div class="modal-content">

//                                         <form action="" method="post"  id="">
//                                             <h3 style={{ marginLeft: 20 }}>Create Announcement </h3>
//                                             <div class="modal-body">
//                                                 <div class="card">
//                                                     <div class="card-body">
//                                                         <div class="row">
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Date : <span class="form-required">*</span></label>
//                                                                     <input type="date" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Time : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Announcement Name : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_code" required />
//                                                                 </div>
//                                                             </div>
//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label">Place : <span class="form-required">*</span></label>
//                                                                     <input type="text" class="form-control" name="category_name" required />
//                                                                 </div>
//                                                             </div>

//                                                             <div class="col-lg-6 col-md-6 col-sm-12 col-12">
//                                                                 <div class="form-group">
//                                                                     <label class="form-label"> Details :</label>
//                                                                     <textarea cols="30" rows="1"></textarea>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="modal-footer">
//                                                 <button type="submit" class="btn btn-success">Save</button>
//                                                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="card">
//                         <div class="card-body">
//                             <div class="table-responsive">
//                                 <table class="table table-bordered">
//                                     <thead>
//                                         <tr class="table-info">
//                                             <th>S.No</th>
//                                             <th>Date </th>
//                                             <th>Time </th>
//                                             <th>Announcement Name</th>
//                                             <th>Place</th>

//                                             <th>Details</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>1.</td>
//                                             <td>31-10-23</td>
//                                             <td>05.30 PM</td>
//                                             <td>Panchayat Project</td>
//                                             <td>Ayikudy</td>

//                                             <td>Discuss with Project</td>
//                                             <td>
//                                                 <button class="btn btn-success">
//                                                     <span class="glyphicon glyphicon-pencil"></span> Edit
//                                                 </button>
//                                                 <button class="btn btn-info">
//                                                     <span class="glyphicon glyphicon-eye-open"></span> View
//                                                 </button>
//                                                 <button class="btn btn-danger">
//                                                     <span class="glyphicon glyphicon-trash"></span> Delete
//                                                 </button>
//                                             </td>
//                                         </tr>


//                                     </tbody>
//                                 </table>
//                             </div>
//                             <br />
//                         </div>
//                     </div>
//                 </div>


//             )}


//         </>
//     )
// }



// export default Events;


