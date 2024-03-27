// PaginationComponent.js
import React, { useState, useEffect, useRef } from "react";

/* 
Used For Paginating List Items AllOver APP 
get initiall list as data ,
get no of pages as count ,
and fetch data from particular page from API Pass the function from Parent Component as fetchData function 

*/

 function PaginationComponent (props) {
  const { data, setData, count, fetchData } = props;
  //   const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();

  // const { page, setPage, handlePageChange, count, data } = props


  /* Used for Prevent fetchData function running initialy mount */
  const isMounted = useRef(true);

  /* intially set Total Page nos*/
  useEffect(() => {
    const total = Math.ceil(count / data?.length);
    console.log(count, data, total);
    setTotalPages(total);
  }, []);

  /* 
  Used to call  fetchData function  when CurrentPage State changes 
  */
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      fetchData(currentPage);
    }
  }, [currentPage]);

  /*
  Function To Handle currentPage change
  */
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  /* Function to genrate Page number Buttons for Total no of pages */
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            i === currentPage
              ? "currentpage btn-pagination-number"
              : "btn-pagination-number"
          }
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <>
        <div>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className={currentPage === 1 ? "disabled" : "btn-edit"}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {/* Page Nuber Buttons */}
          {renderPageNumbers()}

          <button
            className={currentPage === totalPages ? "disabled" : "btn-edit"}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </>

      {/* {!data?.length&& (<>
    
    <div> No Records </div>
    
    </>)} */}
    </div>
  );
};

// export default PaginationComponent;




import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationControlled(props) {
  const { page, setPage, handlePageChange, count, data ,total} = props


  return (

    <>

      {data?.length > 0 && (

        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={total} page={page} onChange={handlePageChange} />
        </Stack>
      )}
    </>


  );
}



export default  PaginationControlled;