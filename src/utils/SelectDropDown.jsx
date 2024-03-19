import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectDropDown(props) {

   const {value,setValue,lists,label,handleChange,empstatus,selectvalue}=props 


  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  console.log(value)
  return (
    <>
    <InputLabel id="demo-select-small-label " className='input-label'>{label}</InputLabel>
   
    <FormControl fullWidth size="small">
    {/* <InputLabel id="demo-select-small-label">select {label}</InputLabel> */}
   
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        defaultValue={value}
        value={value}
        // label={label}
        onChange={handleChange}
        name={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {empstatus?.map((each,index)=>
           <MenuItem key={index} value={each?.id}>{each?.profession}</MenuItem>  
        )}

        {lists?.map((each,index)=>
           <MenuItem key={index} value={each?.id}>{each?.name}</MenuItem>  
        )}
       
      </Select>
    </FormControl>
    </>
  );
}