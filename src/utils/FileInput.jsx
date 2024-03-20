// import React, { useState } from 'react';
// import { Button, Input, Typography, Paper, Grid, IconButton } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import CloseIcon from '@mui/icons-material/Close';

// const FileUploadBox = ({ onUpload }) => {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (selectedFile) {
//             onUpload(selectedFile);
//             setSelectedFile(null); // Clear selected file after upload
//         } else {
//             console.log('No file selected');
//         }
//     };

//     const handleRemoveFile = () => {
//         setSelectedFile(null);
//     };

//     return (

//         <>
//             <Input
//                 type="file"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 inputProps={{ accept: 'image/*' }} // Optional: restrict to image files
//                 id="file-input"
//             />
//             <label htmlFor="file-input">
//                 <Button
//                     variant="outlined"
//                     component="span"
//                     startIcon={<CloudUploadIcon />}
//                 >
//                     Choose File
//                 </Button>
//             </label>
//             {/* </div> */}
//             {selectedFile && (
//                 <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body1" style={{ marginRight: '10px' }}>
//                         {selectedFile.name}
//                     </Typography>
//                     <IconButton onClick={handleRemoveFile}>
//                         <CloseIcon />
//                     </IconButton>
//                 </div>
//             )}
//         </>
//     );
// };

// export default FileUploadBox;





import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUploadBox = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                inputProps={{ accept: 'image/*' }} // Optional: restrict to image files
                id="file-input"
            />
            <label htmlFor="file-input">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    style={{ marginRight: '8px' }}
                >
                    Choose File
                </Button>
            </label>
            {selectedFile && (
                <div style={{ backgroundColor: '#e0e0e0', padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                    <span style={{ marginRight: '8px' }}>{selectedFile.name}</span>
                    <IconButton onClick={handleRemoveFile} size="small">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
        </div>
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