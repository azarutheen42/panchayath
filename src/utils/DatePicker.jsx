import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

export default function BasicDatePicker(props) {

  const {handleOnChange,value} =props

  console.log(value,"date")

  return (
    <>
    <InputLabel htmlFor="Date Of  Birth"  className="input-label">Date Of  Birth </InputLabel>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
     
        <DatePicker 
        id="Date Of  Birth" 
        // label="Date Of  Birth" 
        slotProps={{ textField: { size: 'small' } }}
        format="DD/MM/YYYY" 
        // format="YYYY/MM/DD/"   
        name='date_of_birth'
        value={value}
        size="small"
        onChange={(newValue) => handleOnChange(newValue)}
        
        />
      </DemoContainer>
    </LocalizationProvider>
    
    </>
  );
}