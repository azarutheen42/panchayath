import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Config from "../Config"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ButtonWithLoader from "./Button";
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';


// Define the styled component for the image thumbnail
const StyledSmallImageThumbnail = styled('img')({
    width: 50, // Adjust the width to make the thumbnail smaller
    height: 'auto', // Maintain aspect ratio
    borderRadius: 4, // Add rounded corners
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow for depth
    cursor: 'pointer', // Add cursor pointer for clickable behavior
    // border: '1px solid #000',
});


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // padding: "5px 15px", // Remove padding from the cell
    padding: '8px',
    // '&.noPadding': {
    //     padding: 0, // Apply the global CSS class to remove padding
    //   },
    border: '.5px solid #ccc',

    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.black,
        // color: theme.palette.common.white,
        backgroundColor: "#cff4fc",
        color: "#000",
        fontWeight: "bold",
        // padding: '15px'
    },
    // [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14,


    // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        // border: 0,
    },
    '&:hover': {
        backgroundColor: '#f5f5f5', // Change background color on hover
    },
}));

const StyledTableHead = styled(TableHead)({
    position: 'sticky', // Set the table head to sticky position
    top: '0', // Stick to the top of the table
    zIndex: '100', // Ensure the header stays above the content

    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    backgroundColor: "#cff4fc",
    color: "#000",
    fontWeight: "bold",
    padding: "20px"

});


const StyledTable = styled(Table)(({ theme }) => ({
    // borderCollapse: 'separate', // Separate borders for cells
    borderSpacing: '0px', // No spacing between cells
    borderRadius: '5px', // Curved border radius
    minWidth: '100%', // Ensure the table takes full width of its container
}));


const siCell = {
    width: 60,
}

const ActionCell = {
    width: "130px"
}


const StyledTableContainer = styled(TableContainer)({
    maxHeight: '100%', // Ensure the container takes full height of its parent
    overflow: 'auto', // Enable scrollable overflow for the container
});


function CustomTable(props) {


    const [hide, setIsHide] = useState(false);
    const [mui, setMui] = useState(true);

    // const [loader,setLoader]=useState(false);

    const {
        headers, data, fieldsToShow, fields, getInstanceData,
        loader, setLoader, actionShow, lazyLoading
    } = props


    const navigate = useNavigate();


    const fetchData = async (id, bool, text, rowIndex) => {
        setLoader(rowIndex)
        try {
            // setLoader(rowIndex);
            await new Promise(resolve => setTimeout(resolve, 500));
            const data = await getInstanceData(id, bool, text);
            return { success: true };

        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoader()
            // setLoading(false);
        }

    }

    console.log(lazyLoading, "lazy loading true")





    return (
        <>

            {mui && (
                <StyledTableContainer
                // component={Paper}
                >


                    <StyledTable
                    //      sx={{ minWidth: 700 }} 
                    // aria-label="customized table" 
                    // className='mt-2' 
                    >
                        <StyledTableHead >
                            {/* <StyledTableRow> */}
                            <StyledTableCell style={siCell}>Si.No</StyledTableCell>

                            {headers?.map((header, index) => (

                                <StyledTableCell key={index}>{header}</StyledTableCell>
                            ))}

                            {!actionShow && <StyledTableCell>Action</StyledTableCell>}


                            {/* </StyledTableRow> */}
                        </StyledTableHead>
                        <TableBody>


                            {(lazyLoading || !data) ? (
                                <TableRowsLoader rowsNum={5} cellNo={headers?.length + 2} />
                            )
                                :

                                (data?.map((row, rowIndex) => (
                                    <StyledTableRow key={rowIndex}>
                                        <StyledTableCell style={siCell}>{rowIndex + 1}</StyledTableCell>


                                        {Object.entries(fields).map(([fieldName, getValue]) => (
                                            <StyledTableCell key={`${rowIndex}-${fieldName}`}>
                                                {getValue(renderField(row, fieldName))}
                                                {/* {renderField(row, fieldName)} */}
                                            </StyledTableCell>
                                        ))}

                                        {!actionShow && <StyledTableCell style={ActionCell}>

                                            <ButtonWithLoader
                                                itemId={row?.id}
                                                onClick={() => fetchData(row?.id, false, "view", rowIndex)}
                                                class_name="btn btn-success"
                                                text="View"
                                                span_class="glyphicon glyphicon-pencil"
                                                loader={loader}
                                                index={rowIndex}
                                            // setLoader={setLoader}
                                            // key = {employee?.id}
                                            />


                                        </StyledTableCell>

                                        }

                                    </StyledTableRow>
                                )))

                            }

                        </TableBody>
                    </StyledTable>


                    {!data?.length &&
                       <div className="text-center p-5"> No data </div>
                    }


                </StyledTableContainer>
            )}




        </>
    );
}



const isImageUrl = (url) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
};

const nestedFieldExtractor = (obj, path) => {
    // return path.split('.').reduce((acc, key) => acc[key], obj);

    return path.split('.').reduce((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return acc[key];
        }
        return undefined;
    }, obj);
};


const renderField = (data, field) => {
    // Check if the field is nested
    if (field.includes('.')) {
        const nestedFields = field.split('.'); // Split nested fields
        let value = data;
        for (let nestedField of nestedFields) {
            value = value[nestedField]; // Traverse through nested structure
            if (!value) return ''; // Return empty string if any nested field is undefined
        }
        return renderImageOrText(value); // Render the value as image or text
    } else {
        return renderImageOrText(data[field]); // Render the value as image or text
    }
};

// Function to render value as image or text
const renderImageOrText = (value) => {
    // Check if the value is an image URL
    if (isImageUrl(value)) {
        var alt_name = getImageName(value);
        alt_name = Config.truncateText(alt_name, 7)
        // return <img
        //     src={Config?.MEDIA_URL + value}
        //     alt={alt_name}
        //     // className="emp-thumb"
        // // style={{ width: '100px', height: 'auto' }}
        // />;


        return <CustomTableCell imagePath={Config?.MEDIA_URL + value} altText={alt_name} />


        return
    } else {
        // return value;
        if (typeof value !== 'string') {
            return value ?? "Nill"

        }
        else {
            return Config?.truncateText(value ? (value) : "", 20)
        }
    }

};



const getImageName = (imageUrl) => {
    const imageNameWithExtension = imageUrl.split('/').pop(); // Get the last part of the URL (image name with extension)
    const parts = imageNameWithExtension.split('.'); // Split by dot to separate name and extension
    parts.pop(); // Remove the last part (extension)
    return parts.join('.'); // Join the remaining parts back together
};


import { Skeleton } from "@mui/material";

const TableRowsLoader = ({ rowsNum, cellNo }) => {
    return [...Array(rowsNum)].map((row, index) => (
        <StyledTableRow key={index}>

            {[...Array(cellNo)]?.map((e, index) => (
                <StyledTableCell component="th" scope="row">
                    <Skeleton animation="wave" variant="text" />
                </StyledTableCell>
            ))}
        </StyledTableRow>
    ));
};




export default CustomTable;






const CustomTableCell = ({ imagePath, altText }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleDownload = async () => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = altText;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <>

            <StyledSmallImageThumbnail src={imagePath} alt={altText} onClick={handleOpenModal} />

            {/* Modal for displaying the image and download button */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="sm" // Set the maximum width to sm (small)
                PaperProps={{
                    style: {
                        width: '50%', // Set the width to 50% of the screen
                        margin: 'auto', // Center the modal horizontally
                        padding: '20px', // Add padding on both sides
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
            >
                <img
                    src={imagePath}
                    alt={altText}
                    style={{
                        maxWidth: '100%', // Ensure the image fits within the modal
                        height: 'auto', // Maintain aspect ratio
                        objectFit: 'contain', // Fit the image without stretching
                    }}
                />

                <div style={{ textAlign: 'center', marginTop: 10 }}> {/* Add margin between image and button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small" // Set the size of the download button to small
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </div>
            </Dialog>

        </>



    );
};









