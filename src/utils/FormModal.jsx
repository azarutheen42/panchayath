import { useState, useEffect } from "react"
import Config from '../Config'
import axios from 'axios'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { UpdateButton, SaveButton, CloseButton, DeleteButton, AddButton } from "../components1/Button";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import EditIcon from '@mui/icons-material/Edit';
import CustomTable from "../components1/Table";
import AlertDialog from "../components1/Alert";
import React from "react";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectDropdown from "../components1/Dropdown"
import { useDispatch } from "react-redux";
import { setWard } from "../features/WardSlice"
import { setStreet } from "../features/StreetSlice";
import { Typography, Container, Grid, Paper } from '@mui/material';

import TextInput from "./TextInput";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




function HouseDialogs(props) {

    const { instanceData, setInstanceData, setListData, roles, handleClose, isAdd, modalHeader, setisEdit, isedit,
        deleteInstance, updateInstance, handleChange, addInstance, error, wardlist, districtList, panchayatList, streetList, buildingType, child, view
        // setError, setImage, image 
    } = props


    // const [isedit, setIsedit] = useState(false);
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
                fullWidth
                maxWidth={"md"}

            >
             

                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
                        <h6>{modalHeader + "s"} Details
                        {!view && (
                            (!isAdd && (

                                <button className="btn btn-sm" onClick={() => setisEdit(!isedit)}>  <EditIcon
                                    style={{ color: "blue" }}
                                />  </button>
                            ))

                            )}
                        </h6>
                    </DialogTitle>


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


                    <Typography gutterBottom>

                        {child}
                        {/* {child}
                       {child} */}

                    </Typography>

                </DialogContent>


                {!view && (

                    <DialogActions  >

                        <Grid item xs={12} sm={6}>

                            {!isAdd && (

                                <DeleteButton
                                    loading={loading}
                                    setLoading={setLoading}
                                    onClick={handleClickOpen}
                                />
                            )}

                        </Grid>

                        <Grid item xs={12} sm={12} md={6} display="flex" justifyContent={Config?.isMobile ? 'flex-end' : 'center'}>

                            {isedit && (
                                <IconButton color="primary" aria-label="add" >    

                                    <UpdateButton
                                        loading={loading}
                                        setLoading={setLoading}
                                        onClick={() => updateInstance(instanceData?.id)}
                                    />
                                </IconButton>


                            )}
                            {isAdd && (

                                <IconButton color="primary" aria-label="add">

                                    <SaveButton
                                        loading={loading}
                                        setLoading={setLoading}
                                        onClick={addInstance}
                                    />
                                </IconButton>

                            )}

                            <IconButton color="primary" aria-label="add">

                                <CloseButton
                                    onClick={handleClose}
                                />
                            </IconButton>




                        </Grid>

                    </DialogActions>
                )}

            </BootstrapDialog>
        </React.Fragment>
    );
}


export default HouseDialogs;