import { createSlice } from '@reduxjs/toolkit'

export const RequestSlice = createSlice({
    name: 'requesttype',
    initialState: {value: null},
    reducers: {
        setRequest: (state, action) => {
            state.value = action.payload
        },
    
        
    }
})

export const {setRequest} = RequestSlice.actions;
export default RequestSlice.reducer;