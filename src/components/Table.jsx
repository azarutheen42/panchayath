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
import { Typography } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';



export const StyledSmallImageThumbnail = styled('img')({
    width: 50,
    height: 'auto',
    borderRadius: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    // border: '1px solid #000',
});


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // padding: "5px 15px",
    padding: '8px',
    // '&.noPadding': {
    //     padding: 0,
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
        backgroundColor: '#f5f5f5',
    },
}));

const StyledTableHead = styled(TableHead)({
    position: 'sticky',
    top: '0',
    zIndex: '100',

    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    backgroundColor: "#cff4fc",
    color: "#000",
    fontWeight: "bold",
    padding: "20px"

});


const StyledTable = styled(Table)(({ theme }) => ({
    // borderCollapse: 'separate', 
    borderSpacing: '0px',
    borderRadius: '5px',
    minWidth: '100%',
}));


const siCell = {
    width: 60,
}

const ActionCell = {
    width: "130px"
}


const StyledTableContainer = styled(TableContainer)({
    maxHeight: '100%',
    overflow: 'auto',
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





    const [page, setPage] = useState(1);


    const handlePageChange = (event, value) => {
        setPage(value)
    }






    return (
        <>


            <StyledTableContainer
                component={Paper}
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




            </StyledTableContainer>

            {!data?.length &&
                <div className="text-center p-5"> No Data Available</div>
            }



            {/* <PaginationControlled
                page={page}
                setPage={setPage}
                handlePageChange={handlePageChange}
                count={count}
                data={tdata}

            /> */}



        </>
    );
}


'.gif', '.bmp', '.webp', '.svg'
const isImageUrl = (url) => {
    return /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i.test(url);
};



const isFileUrl = (url) => {
    return /\.( txt|doc|docx|pdf|xls|xlsx|ppt|pptx|json|xml|csv)$/i.test(url);
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
        const nestedFields = field.split('.');
        let value = data;
        for (let nestedField of nestedFields) {
            value = value[nestedField];
            if (!value) return '';
        }
        return renderImageOrText(value);
    } else {
        return renderImageOrText(data[field]);
    }
};






// Function to render value as image or text
const renderImageOrText = (value) => {

    if (isImageUrl(value)) {
        var alt_name = getImageName(value);
        // alt_name = Config.truncateText(alt_name, 7)

        const ext = value?.split(".")?.pop()
        alt_name = Config?.truncateText(alt_name, 8) + "." + ext
        // return <img
        //     src={Config?.MEDIA_URL + value}
        //     alt={alt_name}
        //     // className="emp-thumb"
        // // style={{ width: '100px', height: 'auto' }}
        // />;

        return <CustomTableCell imagePath={Config?.MEDIA_URL + value} altText={alt_name} />

    }
    else if (isFileUrl(value)) {

        return <FileCell value={value} />
    } else {
        // return value;
        if (typeof value !== 'string') {
            return value ?? "Nill"

        }
        else {
            // return value ??""
            return Config?.truncateText(value ? (value) : "", 30)
        }
    }

};



const getImageName = (imageUrl) => {
    const imageNameWithExtension = imageUrl.split('/').pop();
    const parts = imageNameWithExtension.split('.');
    parts.pop();
    return parts.join('.');
};


import { Skeleton } from "@mui/material";

const TableRowsLoader = ({ rowsNum, cellNo }) => {
    return [...Array(rowsNum)].map((row, index) => (
        <StyledTableRow key={index}>

            {[...Array(cellNo)]?.map((e, index) => (
                <StyledTableCell component="th" scope="row" key={index}>
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
                        width: '50%',
                        margin: 'auto',
                        padding: '20px',
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
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />

                <div style={{ textAlign: 'center', marginTop: 10 }}> {/* Add margin between image and button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </div>
            </Dialog>

        </>



    );
};





function FileCell({ value }) {


    const iconStyle = {

        // width: "50px",
        // height: "auto"
    }

    const filename = value?.split("/")?.pop()

    const ext = filename?.split(".")?.pop()

    const nameonly = filename?.split(".")[0]

    const name = Config?.truncateText(nameonly, 20) + "." + ext


    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ display: 'block', width: "40px", WebkitFontSmoothing: 'antialiased' }}  >
                    <FileIcon extension={ext} {...defaultStyles[ext]} 
                       size={48}
                       labelUppercase
                       type="document"
                      
                    />
                </div>
                <div className='text-center p-3'>
                    <a href={value}>{name}</a>
                </div>
            </div>
         
        </>
    )
}








import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function PaginationControlled(props) {
    const { page, setPage, handlePageChange, count, data } = props





    return (

        <>

            {(data && count) && (

                <Stack spacing={2}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={Math.ceil(count / data?.length)} page={page} onChange={handlePageChange} />
                </Stack>
            )}
        </>


    );
}