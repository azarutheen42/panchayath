import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 250,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  padding: 2,
};

// This is used fro delete confirmation
//this dialog box take setISAlert  state for open and close dialog box
//handle remove function  used to call delete function in parent component
function AlertDelete(props) {
  const {
    handleRemove,
    msgText,
    isAlert,
    setIsAlert,
    handleBuyerActivate,
    buyerActiveStatus,
  } = props;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);

  // closing the modal
  const handleClose = () => {
    setOpen(false);
    setIsAlert(false);
  };
  return (<>
  
  
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          //   sx={style}
          className="alert-box"
        >
          <div className="alert-header text-end text-warning">
            <button
              className="btn btn-sm btn-close"
              onClick={handleClose}
            ></button>
          </div>



              <div className="">
                <h5 className="text-center">Are You Sure</h5>

                <h5 className="text-center">Confirm Delete !</h5>
              </div>

              <div className="text-center mt-5">
                <button className="btn-delete" onClick={handleRemove}>
                  Delete
                </button>
                <button className="btn-cancel mx-3" onClick={handleClose}>
                  Cancel
                </button>
              </div>
        </Box>
      </Modal>
    </div>

    </>
  );
}

export default AlertDelete;
