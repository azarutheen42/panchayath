
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Config from '../Config';
import { StyledSmallImageThumbnail } from '../components/Table';
import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';



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

        const filename = e.target.files[0].name
        const file = e.target.files[0]

        const maxSizeInBytes = 10 * 1024 * 1024;

        console.log(file.size / 1024)

        if (name === "image") {
            const check = Config?.fileType(filename)

            if (!check) {
                Config?.toastalert("File Format not supported", "warn")
                return
            }

        }
        else if (name === "file") {

            const check = Config?.DocfileType(filename)

            if (!check) {
                Config?.toastalert("File Format not supported", "warn")
                return
            }

        }


        if (file?.size > maxSizeInBytes) {
            Config?.toastalert("Maximum Filesize Exceed", "warn")
            return

        }


        setImage(file);
    };

    const handleRemoveFile = () => {
        setImage(null);
    };

    console.log(value)


    const getFileName = () => {
        const filename = value?.split("/")?.pop()
        const ext = filename?.split(".")?.pop()
        const nameonly = filename?.split(".")[0]
        const showfilename = Config?.truncateText(nameonly, 10) +"..  "+ "." + ext
        return showfilename

    }

    return (
        <>
            <ToastContainer />
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
                                        >
                                            {image?.name}

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
                                    {/* {Config?.truncateText(value?.split("/")?.pop(), 20)} */}
                                    {getFileName()}

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









