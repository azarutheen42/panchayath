import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';


// export default function BasicDatePicker(props) {

//   const {handleOnChange,value} =props

//   console.log(value,"date")

//   return (
//     <>
//     <InputLabel htmlFor="Date Of  Birth"  className="input-label">Date Of  Birth </InputLabel>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
     
//         <DatePicker 
//         id="Date Of  Birth" 
//         // label="Date Of  Birth" 
//         slotProps={{ textField: { size: 'small' } }}
//         format="DD/MM/YYYY" 
//         // format="YYYY/MM/DD/"   
//         name='date_of_birth'
//         value={value}
//         size="small"
//         onChange={(newValue) => handleOnChange(newValue)}
        
//         />
//       </DemoContainer>
//     </LocalizationProvider>
    
//     </>
//   );
// }









import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function ClearableProp() {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <DemoItem label="DatePicker">
          <DatePicker
            sx={{ width: 260 }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </DemoItem>

        {cleared && (
          <Alert
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
            severity="success"
          >
            Field cleared!
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
}