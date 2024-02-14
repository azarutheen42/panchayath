import { createSlice } from '@reduxjs/toolkit'

export const PanchayathSlice = createSlice({
    name: 'panchayath',
    initialState: {value: null},
    reducers: {
        setPanchayath: (state, action) => {
            state.value = action.payload
        },


    }
})

export const {setPanchayath } = PanchayathSlice.actions;
export default PanchayathSlice.reducer;