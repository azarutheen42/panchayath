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





const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.black,
        backgroundColor: "#cff4fc",
        color: "#000",
        // color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const siCell = {
    width: "10px",

}

const ActionCell = {
    width: "120px",
}

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

            {/* <div className='container mt-5  bg-white p-5'> */}

            {/* <div className="row">

                    <div className="col text-end">
                        <Button variant="contained"
                        // onClick={handleCreateForm}
                        >+ New </Button>

                    </div>
                    <Button className='button btn-edit'>
                        Back
                    </Button>

                    <button className='button btn-edit' >edit</button>
                </div> */}


            {mui && (
                <TableContainer
                // component={Paper}
                >
                    <Table
                        //      sx={{ minWidth: 700 }} 
                        // aria-label="customized table" 
                        className='mt-2'>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell style={siCell}>Si.No</StyledTableCell>

                                {headers?.map((header, index) => (

                                    <StyledTableCell key={index}>{header}</StyledTableCell>
                                ))}

                                {!actionShow && <StyledTableCell>Action</StyledTableCell>}


                            </StyledTableRow>
                        </TableHead>
                        <TableBody>


                            {(lazyLoading || !data) ? (
                                <TableRowsLoader rowsNum={5} cellNo={headers?.length + 2} />
                            )

                                :
                                (data?.length === 0) ?
                                    <>
                                        <p>No Data</p>
                                    </>

                                    :
                                    <>
                                        {data?.map((row, rowIndex) => (
                                            <StyledTableRow key={rowIndex}>
                                                <StyledTableCell style={siCell}>{rowIndex + 1}</StyledTableCell>


                                                {hide &&
                                                    (
                                                        fieldsToShow?.map((field, fieldIndex) => (
                                                            <StyledTableCell key={`${rowIndex}-${fieldIndex}`}>
                                                                {/* Handle nested fields */}
                                                                {field.includes('.') ?

                                                                    nestedFieldExtractor(row, field)
                                                                    :
                                                                    isImageUrl(row[field])
                                                                        ?
                                                                        (<img src={row[field]} alt={row[field]} style={{ width: '100px', height: 'auto' }} />)

                                                                        :
                                                                        (
                                                                            row[field]
                                                                        )}
                                                                {/* Render image if field is an image URL */}

                                                                {renderField(row, field)}

                                                            </StyledTableCell>
                                                        ))
                                                    )
                                                }

                                                {Object.entries(fields).map(([fieldName, getValue]) => (
                                                    <StyledTableCell key={`${rowIndex}-${fieldName}`}>
                                                        {getValue(renderField(row, fieldName))}
                                                        {/* {renderField(row, fieldName)} */}
                                                    </StyledTableCell>
                                                ))}

                                                <StyledTableCell style={ActionCell}>

                                                    {!actionShow && <ButtonWithLoader
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
                                                    }

                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}

                                    </>}

                        </TableBody>
                    </Table>
                </TableContainer>

            )}


            {!mui && (
                <div className="table-responsive mt-2">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">

                                <th style={siCell}>Si.No</th>

                                {headers?.map((header) => (
                                    <th key={header}>{header}</th>
                                ))}


                                {!actionShow && <th>Action</th>}

                            </tr>
                        </thead>
                        <tbody>

                            {
                                (!data || lazyLoading) ? (
                                    <TableRowsLoader rowsNum={10} cellNo={headers?.length + 2} />
                                )

                                    :
                                    (data.length === 0) ?
                                        <>
                                            <TableRowsLoader rowsNum={10} cellNo={headers?.length + 2} />
                                        </>


                                        :
                                        <>
                                            {data?.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td style={siCell}>{rowIndex + 1}</td>
                                                    {hide &&
                                                        (
                                                            fieldsToShow?.map((field, fieldIndex) => (
                                                                <td key={`${rowIndex}-${fieldIndex}`}>
                                                                    {/* Handle nested fields */}
                                                                    {field.includes('.') ?

                                                                        nestedFieldExtractor(row, field)
                                                                        :
                                                                        isImageUrl(row[field])
                                                                            ?
                                                                            (<img src={row[field]} alt={row[field]} style={{ width: '100px', height: 'auto' }} />)

                                                                            :
                                                                            (
                                                                                row[field]
                                                                            )}
                                                                    {/* Render image if field is an image URL */}

                                                                    {renderField(row, field)}

                                                                </td>
                                                            ))
                                                        )
                                                    }
                                                    {Object.entries(fields).map(([fieldName, getValue]) => (
                                                        <td key={`${rowIndex}-${fieldName}`}>
                                                            {getValue(renderField(row, fieldName))}
                                                            {/* {renderField(row, fieldName)} */}
                                                        </td>
                                                    ))}

                                                    {!actionShow &&
                                                        <td style={ActionCell}>

                                                            {/* <button class="buttontn btn-edit"  onClick={() => fetchData(row?.id, false, "view",rowIndex)}>
                                                        {(loader ===rowIndex ) ? Config.loader : <span class="glyphicon glyphicon-pencil"></span>} View
                                                    </button> */}
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

                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </>
                            }



                        </tbody>
                    </table>
                </div >

            )
            }


            {/* </div> */}

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
        return <img
            src={Config?.MEDIA_URL + value}
            alt={alt_name}
            className="emp-thumb"
        // style={{ width: '100px', height: 'auto' }}
        />;
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