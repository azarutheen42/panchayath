import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectDropDown(props) {

  const { list, handleChange, selected, name, showname, disabled, error, report, label, errorMsg, errorField } = props


  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };


  return (
    <>
      <InputLabel id="demo-select-small-label " className='input-label'>{label}</InputLabel>

      <FormControl fullWidth
        size="small"
      >
        {/* <InputLabel id="demo-select-small-label">select {label}</InputLabel> */}

        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          // defaultValue={selected}
          // value={value}
          name={name}
          // className="custom-dropdown"
          required
          value={selected ?? ""}
          onChange={handleChange}
          disabled={disabled}
        >



          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {list?.map((each, index) =>
            <MenuItem key={index} value={each?.id}>{each[showname]}</MenuItem>
          )}




        </Select>

        {(!selected && error) && (
          <span className="req-text">This field is required</span>
        )}


        {errorMsg && (
          <span className="req-text">{errorMsg[errorField]?.pop()}</span>
        )}
      </FormControl>
    </>
  );
}


