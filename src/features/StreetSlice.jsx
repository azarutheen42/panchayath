import { createSlice } from '@reduxjs/toolkit'

export const StreetSlice = createSlice({
    name: 'street',
    initialState: {value: null},
    reducers: {
        setStreet: (state, action) => {
            state.value = action.payload
        },
    
        
    }
})

export const {setStreet} = StreetSlice.actions;
export default StreetSlice.reducer;