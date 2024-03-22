import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import moment from 'moment'; // Import Moment.js

import dayjs from 'dayjs';

// export default function BasicDatePicker(props) {



//   const { handleChange, handleDateChange, value, name, disabled, error, report, label } = props



//   return (
//     <>
//       <InputLabel htmlFor="Date Picker" className="input-label">{label} </InputLabel>
//       <LocalizationProvider
//         dateAdapter={AdapterDayjs}
//       >
//         <DemoContainer components={['DatePicker']} fullwidth  >

//           <DatePicker fullwidth
//             id="Date Picker"
//             // label={label}
//             slotProps={{ textField: { size: 'small' } }}
//             format="DD/MM/YYYY"
//             // format="YYYY/MM/DD/"   
//             name={name}
//             value={value || ""}
//             size="small"
//             onChange={handleDateChange}
//             disabled={disabled}
//             renderInput={(params) => <input {...params} />}

//           />
//         </DemoContainer>

//       </LocalizationProvider>

//       {(!value && error) && (
//         <span className="req-text">This field is required</span>
//       )}



//     </>
//   );
// }


export default function datePicke(props) {

  const { handleChange, handleDateChange, value, name, disabled, error, report, label } = props


  return (
    <>
      <label class="form-label">{label} </label>
      <input type="Date"
        class="form-control"
        name={name}
        onChange={handleChange}
        defaultValue={value}
        disabled={disabled}
        required />



      {(!value && error) && (
        <span className="req-text">This field is required</span>
      )}



    </>
  )
} 