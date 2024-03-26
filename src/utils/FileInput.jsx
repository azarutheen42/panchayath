
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Config from '../Config';
import { StyledSmallImageThumbnail } from '../components/Table';
import InputLabel from '@mui/material/InputLabel';



const media = "http://127.0.0.1:8000"
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


    const { handleChange, value, name, disabled, error, report, filelabel, image, setImage, errorMsg, errorField, required } = props


    const handleFileChange = (e) => {


        setImage(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setImage(null);
    };

    console.log(value)

    return (
        <>
            <InputLabel id="demo-select-small-label " className='input-label'>{filelabel}</InputLabel>
            <div style={{ display: 'flex', alignItems: 'center', }} className='border border-2'>
                <input
                    type="file"
                    // onChange={handleChange}
                    onChange={handleFileChange}
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
                            paddingRight: "10px",
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
                                    {Config?.truncateText(value?.split("/")?.pop(), 20)}

                                </span>
                        }
                    </div>
                )}

            </div>

            {/* {((!value) && error) && (
          <span className="req-text">This field is required</span>
        )} */}
            {required && (<>


                {((!image && !value) && error) && (
                    <span className="req-text">This field is required</span>
                )}
            </>)}

            {errorMsg && (
                <span className="req-text">{errorMsg[errorField]?.pop()}</span>
            )}

        </>
    );
};

export default FileUploadBox;









