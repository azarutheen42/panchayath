import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput(props) {


    const {label,handleChange,value} =props
    const [name, setName] = React.useState('Cat in the Hat');

    return (


        <TextField
            id="outlined-controlled"
            label={label}
            value={value}
            onChange={handleChange}
            fullWidth
            style={{ height: 50 }}
            // size='small'
            InputProps={{
                style: {
                    // height: '40px', // Set a fixed height
                    transition: 'none' // Disable transitions
                }
            }}
            variant="outlined"
            disableAnimation
        // autoFocus
        />

    );
}
