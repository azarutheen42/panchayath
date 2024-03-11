import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Config from '../Config';

export default function AlertDialog({ handleClose, onClick,loading }) {
   
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are You Sure ? Confirm !
                </DialogTitle>
                {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are You Sure ! Confirm !
          </DialogContentText>
        </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>

                    <Button variant="contained"
                    onClick={onClick}
                        // style= {{backgroundColor:"#c62828",color:"white"}}  
                        size="small" >
                       {loading ? Config.loader : <span ></span>} Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}