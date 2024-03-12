import { createSlice } from '@reduxjs/toolkit'

export const ComplaintSlice = createSlice({
    name: 'complainttype',
    initialState: {value: null},
    reducers: {
        setComplaint: (state, action) => {
            state.value = action.payload
        },
    
        
    }
})

export const {setComplaint} =ComplaintSlice.actions;
export default ComplaintSlice.reducer;