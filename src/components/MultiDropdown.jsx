import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function MultipleSelect(props) {

    // const {data } =props
    const { data, list, onchange, value, name, showname, disabled, error, report } = props

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const getWardLabel = (value) => {
        const listData = value ? value : []
        const label = listData?.map((no) => (data?.find((e) => e?.id === no)?.name)).join(',')
        return label
    }

    return (
        <>

            <FormControl fullWidth>
                {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value || []}
                    onChange={onchange}
                    name={name}
                    // input={<OutlinedInput label="Tag" />}
                    // renderValue={(selected) => getWardLabel(selected)}
                    renderValue={getWardLabel}
                    // renderValue={getWardLabel(selected)}
                    MenuProps={MenuProps}
                    size='small'
                >
                    {data?.map((e, index) => (
                        <MenuItem key={index} value={e.id}>
                            <Checkbox checked={value?.indexOf(e) > -1} />
                            <ListItemText primary={e?.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}









export default MultipleSelect;