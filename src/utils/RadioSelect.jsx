import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup(props) {
    const {value,setValue,label,valueList,handleChange} =props

 

    console.log(value)
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" className='input-label'>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        size="small"
        value={value}
        onChange={handleChange}

      >
        {valueList?.map((each,index)=>
        <FormControlLabel key={index} value={each?.id} control={<Radio   size="small"/>} label={each?.name}/>
        )}
      </RadioGroup>
    </FormControl>
  );
}