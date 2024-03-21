import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

export default function TextInput(props) {

    const { handleChange, value, name, disabled, error, report, label, errorMsg, errorField, type } = props

    const handleCheckChange = (e) => {
        const inputValue = e.target.value;
        if (!type) {
            handleChange(e)
        }
        else {
            // Check if the identifier contains "phoneno" or "phone_no"
            if (name && (name?.includes('phone'))) {
                // Check if the input value is exactly 10 characters and contains only digits
                if (inputValue.length <= 10 ) {
                    handleChange(e)
                } 
            } else {
                handleChange(e)
            }
        }

    };

    return (
        <>
            <InputLabel id="demo-select-small-label " className='input-label'>{label}</InputLabel>
            <TextField
                type={type}
                id="outlined-controlled"
                name={name}
                // label={label}
                value={value}
                onChange={handleCheckChange}
                fullWidth
                style={{ height: 50 }}
                size='small'
                inputprops={{
                    style: {
                        // height: '40px', // Set a fixed height
                        transition: 'none' // Disable transitions
                    }
                }}
                variant="outlined"
                // disableAnimation
                disabled={disabled}
            // autoFocus
            />


            {(error && !value) && (
                <span className="req-text"> This field is required</span>
            )}


            {errorMsg && (
                <span className="req-text">{errorMsg[errorField]?.pop()}</span>
            )}


            {/* <Example/> */}

        </>

    );
}













