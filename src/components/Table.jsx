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



export default function CustomTable(props) {


    const [hide, setIsHide] = useState(false);
    const [mui, setMui] = useState(false);

    // const [loader,setLoader]=useState(false);

    const {
        headers, data, fieldsToShow, fields,getInstanceData,loader
    } = props


    const navigate = useNavigate();

    // const WardList = useSelector((state) => state?.ward?.value);

    // const getWardName = (id) => {
    //     const label = WardList?.find((e) => e.id === id)?.name
    //     return label
    // }


    // const headers = ['S.no', 'Name', 'Panchayath', "Ward"]
    // const fieldsToShow = ['id', 'employee_info.name', 'employee_info.image']


    // const fields = {
    //     'id': (value) => value,
    //     'employee_info.name': (value) => value,
    //     'employee_info.image': (value) => value,
    //     'ward': (wardId) => getWardName(wardId),
    //     // Add more fields as needed
    // };

    // const data =
    //     [
    //         {
    //             "id": 7,
    //             "ward": 11,
    //             "employee": 70,
    //             "employee_info": {
    //                 "id": 70,
    //                 "image": "/media/employee/70/manisha_images_1.jpg",
    //                 "emp_id": "EMP240229701c60",
    //                 "name": "manisha",
    //                 "phone_number": "7339539660",
    //                 "is_contract": false,
    //                 "is_collector": true,
    //                 "is_permenant": false,
    //                 "start_date": "2024-02-29",
    //                 "user": 138,
    //                 "role": 38,
    //                 "ward": 11,
    //                 "panchayat": 7
    //             },
    //             "ward_info": {
    //                 "id": 11,
    //                 "panchayath_info": {
    //                     "id": 7,
    //                     "city_name": "spg street2",
    //                     "district_name": "Tenkasi",
    //                     "name": "Demo",
    //                     "city": 9,
    //                     "district": 14
    //                 },
    //                 "ward_no": "10",
    //                 "name": "ward-10",
    //                 "panchayat": 7
    //             }
    //         },
    //         {
    //             "id": 8,
    //             "ward": 11,
    //             "employee": 71,
    //             "employee_info": {
    //                 "id": 71,
    //                 "image": "/media/employee/None/vicky_image.png",
    //                 "emp_id": "EMP24030771f6fa",
    //                 "name": "vicky",
    //                 "phone_number": "1234567894",
    //                 "is_contract": false,
    //                 "is_collector": true,
    //                 "is_permenant": false,
    //                 "start_date": "2024-03-07",
    //                 "user": 166,
    //                 "role": 38,
    //                 "ward": null,
    //                 "panchayat": 7
    //             },
    //             "ward_info": {
    //                 "id": 11,
    //                 "panchayath_info": {
    //                     "id": 7,
    //                     "city_name": "spg street2",
    //                     "district_name": "Tenkasi",
    //                     "name": "Demo",
    //                     "city": 9,
    //                     "district": 14
    //                 },
    //                 "ward_no": "10",
    //                 "name": "ward-10",
    //                 "panchayat": 7
    //             }
    //         }
    //     ]



    const fetchData=(id,bool,text,rowIndex) =>{
        // setLoader(rowIndex)
        try {
             getInstanceData(id,bool,text);
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            // setLoader()
            // setLoading(false);
        }

    }


    const handleNavigate = (id,k) => {
        navigate(`loan-form/${id}`)
    }




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
                                <TableRow>
                                    <StyledTableCell>Si.No</StyledTableCell>
                                    {headers?.map((header, index) => (

                                        <StyledTableCell key={index}>{header}</StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                {(!data || data.length === 0) ?
                                    <>
                                        <p>No data available</p>
                                    </> :
                                    <>
                                        {data?.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                <StyledTableCell>{rowIndex + 1}</StyledTableCell>


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

                                                <StyledTableCell>
                                                    <ButtonWithLoader
                                                        itemId={row?.id}
                                                        onClick={fetchData}
                                                        class_name="btn btn-success"
                                                        text="View"
                                                        span_class="glyphicon glyphicon-pencil"
                                                        loader={loader}
                                                        index={rowIndex}
                                                    // key = {employee?.id}
                                                    />
                                                </StyledTableCell>

                                            </TableRow>
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
                                    <th>Si.No</th>
                                    {headers?.map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>

                                {(!data || data.length === 0) ?
                                    <>
                                        <p>No data available</p>
                                    </>
                                    :
                                    <>
                                        {data?.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{rowIndex + 1}</td>
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

                                                <td>
                                                    <ButtonWithLoader
                                                        itemId={row?.id}
                                                        onClick={() => fetchData(row?.id, false, "view",rowIndex)}
                                                        class_name="btn btn-success"
                                                        text="View"
                                                        span_class="glyphicon glyphicon-pencil"
                                                    loader={loader}
                                                    index={rowIndex}
                                                    // setLoader={setLoader}
                                                    // key = {employee?.id}
                                                    />

                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                }



                            </tbody>
                        </table>
                    </div>

                )}


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
        return <img
            src={Config?.MEDIA_URL + value}
            alt={alt_name}
            className="emp-thumb"
            style={{ width: '100px', height: 'auto' }} />;
    } else {
        return value;
    }
};



const getImageName = (imageUrl) => {
    const imageNameWithExtension = imageUrl.split('/').pop(); // Get the last part of the URL (image name with extension)
    const parts = imageNameWithExtension.split('.'); // Split by dot to separate name and extension
    parts.pop(); // Remove the last part (extension)
    return parts.join('.'); // Join the remaining parts back together
};