
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Config from '../Config';
import { StyledSmallImageThumbnail } from '../components1/Table';
import InputLabel from '@mui/material/InputLabel';


const media ="http://127.0.0.1:8000"
const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const itemStyle = {
    padding: '10px',
    backgroundColor: '#f0f0f0',
  };
  


const FileUploadBox = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);


    const { handleChange, value, name, disabled, error, report, filelabel  ,image,setImage ,errorMsg,errorField} = props



    const handleRemoveFile = () => {
        setImage(null);
    };

    console.log(value)

    return (
        <>
        <InputLabel id="demo-select-small-label " className='input-label'>{filelabel}</InputLabel>
         <div style={{ display: 'flex', alignItems: 'center' ,}} className='border border-2'>
            <input
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
                inputprops={{ accept: 'image/*' }} // Optional: restrict to image files
                id="file-input"
                name={name}
                disabled={disabled}
            />
            <label htmlFor="file-input"  >
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginRight: '8px' }}

                    disabled={disabled}
                >
                   {filelabel}
                </Button>
            </label>


            {(value || image) && (
                <div 
                style={{
                    //  backgroundColor: '#e0e0e0',
                 paddingLeft: '10px',
                 paddingRight:"10px", 
                 borderRadius: '4px', 
                 display: 'flex', 
                 alignItems: 'center',
                  marginRight: '8px' 
                }}
                  >

                    {
                        image ? 
                    (
                    <>
                        <span 
                        style={{ marginRight: '8px' }}
                        // style={itemStyle}
                        >{image?.name}
                        
                        </span>

                    <IconButton onClick={handleRemoveFile} size="small" >
               
                     X
                    </IconButton>

                        </>
                        )
                        :

                        <span 
                        style={{ marginRight: '8px' }}
                        // style={itemStyle}
                        >
                              <StyledSmallImageThumbnail src={value} alt="" />
                           {Config?.truncateText(value?.split("/")?.pop(),20)}
                        
                        </span>
                    }
                </div>
            )}

         </div>

         {/* {((!value) && error) && (
          <span className="req-text">This field is required</span>
        )} */}


{((!image && !value ) && error) && (
          <span className="req-text">This field is required</span>
        )}

{errorMsg && (
                 <span className="req-text">{ errorMsg[errorField]?.pop()}</span>
            )}

        </>
    );
};

export default FileUploadBox;










// import CloseIcon from '@mui/icons-material/Close'
// import React from 'react'
// import AttachFileIcon from '@mui/icons-material/AttachFile'
// import { MuiFileInput } from 'mui-file-input'
// import ClearIcon from "@mui/icons-material/Clear";


// import { IconButton } from "@mui/material";

// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// // import DragAndDrop from './DragandDrop'


// export default function MyComponent() {
//     // const [value, setValue] = React.useState(null)

//     const [file, setFile] = React.useState([])

//     const handleChange = (newFile) => {
//         setFile(newFile)


//     }
//     console.log(file)
//     return (


//         // <>

//         //     <MuiFileInput
//         //         fullWidth
//         //         // style={{ height: 50 }}
//         //         InputProps={{
//         //             style: {
//         //                 height: '50px', // Set a fixed height
//         //                 transition: 'none' ,// Disable transitions
//         //                 cursor: 'pointer',
//         //                 border: '2px dashed #ccc',
//         //             },
//         //             startAdornment: <AttachFileIcon />
//         //         }}
//         //         variant="outlined"
//         //         disableAnimation
//         //         // size="small"
//         //         // variant="outlined"
//         //         //   disabled
//         //         clearIconButtonProps={{
//         //             title: "Remove",
//         //             children: <CloseIcon fontSize="small" />
//         //         }}

//         //         getInputText={(value) => value ? value.name : ''}
//         //         getSizeText={(value) => 'Very big'}

//         //         //   inputProps={{ accept: '.png, .jpeg' }}
//         //         hideSizeText
//         //         value={file} onChange={handleChange}

//         //         // style={{
//         //         //     paddingLeft: '40px',
//         //         //     border: '2px dashed #ccc',
//         //         //     borderRadius: '4px',
//         //         //     position: 'relative',
//         //         //     cursor: 'pointer',
//         //         //     '&:hover': {
//         //         //         borderColor: '#999',
//         //         //     },
//         //         // }}

//         //     />

//         // </>


//         <>


//             {/* <DragAndDrop handleDrop={handleDrop}> */}
//             <label
//                 className="file-input-box form-input text-center"
//                 htmlFor="files"
//             >
//                 <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
//                 <span style={{ color: "blue", textDecoration: "underline" }}>
//                     Browse
//                 </span>
//                 <input
//                     // ref={inputFileUploadRef}
//                     type="file"
//                     name="files"
//                     className="form-control-file"
//                     id="files"
//                     onChange={handleChange}
//                     multiple
//                     hidden
//                 />
//             </label>
//             {/* </DragAndDrop> */}

//             {/*
//              list uploaded files 
             
//             */}
        
//             {/* <div
//                 key={file.name}
//                 className="file-name-list"
//             > */}
//                 <div className="filename">
//                     {
//                         <img
//                             //   src={Config.HOST_URL + "/assets/images/document.svg"}
//                             alt="document"
//                         />
//                     }{" "}
//                     {file.name}
//                 </div>
//                 <IconButton
//                     className="trash-icon"
//                 //   onClick={(e) => removeFile(e, eachKey)}
//                 >
//                     <ClearIcon color="warning" />
//                 </IconButton>
//             {/* </div> */}
//         </>
//     )




// }