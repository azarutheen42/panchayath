import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";
import Config from "../../config/config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import DragAndDrop from "../../features/DragandDrop";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

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

// used  for uploading own custom Purchase order and other support documents as customer wish
// setIsUploadPo is abooolean value to handle whether po is to be uploaded or not
// quote prop have Quote instance as object 
// addFile,setAddFile state take a boolean value for PO file upload modal open and close operation
// po state store a po instance   
function UploadPo(props) {
  const {
    handleRemove,
    msgText,
    isUploadPo,
    setIsUploadPo,
    client,
    seller,
    client_address,
    seller_address,
    quote,
    setView,
    view,
    po,
    setAddFile,
    addFile,
  } = props;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const fileInputRef = useRef();
  const inputFileUploadRef = useRef();  //handling current input file
  const [files, setFiles] = useState([]); //store all uploaded files for PO
  const [loader, setLoader] = useState(false); //animation loader
  const navigate = useNavigate();

  // close the Po upload modal
  const handleClose = () => {
    setOpen(false);
    setIsUploadPo(false);
  };


  //handling file inputs and store in "files" state
  const handleFileChange = (e) => {
    const fil = e.target.files;
    let fileList = [...files];
    console.log(fil.length,"length")
    const warningMsg = fil.length <= 1 ? "Unsupport File Format" : "Some Files Are Not Supported"
    Object.keys(fil).map((eachKey) => {
        let name = fil[eachKey].name;
        let lastDot = name?.lastIndexOf(".");
        let fileName = name?.substring(0, lastDot);
        let ext = "." + name?.substring(lastDot + 1);
        if (
            ext !== ".docx" && ext !== ".pdf" && ext !== ".jpeg" && ext !== ".jpg"
            && ext !== ".png" && ext !== ".gif" && ext !== ".zip" && ext !== ".svg"
        ) {
            // Config.toast(`${warningMsg}`, "warning");
            Config.toast(`Unsupport File Format`, "warning");
            return 
        }
        fileList.push(fil[eachKey]);
    });
    setFiles(fileList);
    
  };


  console.log(files);

  //remove files from "files" state
  const removeFile = (e, eachKey) => {
    setFiles(files.filter((e, index) => index !== Number(eachKey)));
    console.log(e, eachKey);
  };


  // adding files from drag and drop event
  const handleDrop = (filesTemp, request = null) => {
    let fileList = [...files];
    Object.keys(filesTemp).map((eachKey) => {
      fileList.push(filesTemp[eachKey]);
    });
    setFiles(fileList);
    setShowFileUpload(false);
  };


  // function to create PO from files and and close 
  // modal by setting SetIsUploadPo is false and 
  //navigate to Po Item view Page
  const handleCreatePo = () => {
    setLoader(true);
    const data = new FormData();
    for (let x = 0; x < files.length; x++) {
      if (typeof files[x] != "undefined") data.append("files", files[x]);
    }
    data.append("ai_quote", quote?.id);
    Config.axios({
      url: `${Config.BASE_URL}/user-po/`,
      method: "POST",
      auth: true,
      data: data,
      success: (response) => {
        if (response.status === 200) {
          setLoader(false);
          const poId = response.data.id;
          Config.toast("Po created Successfully", "success");
          setIsUploadPo(false);
          setView(3);
          navigate(`?po/view/${poId}`);
        }
      },
      error: (error) => {
        setLoader(false);
        console.log(error);
        Config.toast("Something Went Wrong", "error");
      },
    });
  };


  // add files to PO
  const handleUploadPo = () => {
    console.log(files);
    const file = addFile.concat(files);
    // const file = po?.files?.filter((each) => each.id !== id);
    setAddFile(file);
    setIsUploadPo(false);
    // setPo((prev) => ({
    //   ...prev,
    //   files: [...files],
    // }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          //   sx={style}
          className="po-upload-box"
        >
          <div className="row close-modal">
            <div className="text-end">
              <button className="btn-close" onClick={handleClose}></button>
            </div>
          </div>

          {/*
          
          Handle drag and drop event
          */}
          <div className="">
            <DragAndDrop handleDrop={handleDrop}>
              <label
                className="form-input text-center file-upload"
                htmlFor="files"
              >
                <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                <span style={{ color: "blue", textDecoration: "underline" }}>
                  Browse
                </span>
                <input
                  ref={inputFileUploadRef}
                  type="file"
                  name="files"
                  className="form-control-file"
                  id="files"
                  onChange={handleFileChange}
                  multiple
                  hidden
                />
              </label>
            </DragAndDrop>
          </div>
          {/* 
          
          show uploaded files in "files"
          with view and remove button
          */}
          <div className="row mt-2 p-2">
            {/* {files?.length >1 && ( */}
            {Object.keys(files)?.map((eachKey) => {
              return (
                // <div className="">
                <div
                  key={eachKey + files[eachKey].name}
                  className="po-files-view border d-flex justify-content-between "
                >
                  <div className="">{files[eachKey].name}</div>
                  <div>
                    <button
                      className="btn-file-remove"
                      data-file-index={eachKey}
                      onClick={(e) => removeFile(e, eachKey)}
                    >
                      X
                    </button>
                    {/* <IconButton
                      className="trash-icon"
                      onClick={(e) => removeFile(e, eachKey)}
                    >
                      <ClearIcon color="warning" />
                    </IconButton> */}
                  </div>
                </div>
                // </div>
              );
            })}

            {/* )}  */}
          </div>

          <div className="text-end mt-5">

            {/* 
            if already Po is there Upload Po function call
            */}
            {po && (
              <button className="btn-update" onClick={handleUploadPo}>
                {loader && Config.loader()}Upload
              </button>
            )}

          {/*  if no PO only Quote is there then createPo function call to create new PO */}
            {quote && (
              <button className="btn-update" onClick={handleCreatePo}>
                {loader && Config.loader()}Upload
              </button>
            )}

            <button className="btn-cancel mx-3" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadPo;
