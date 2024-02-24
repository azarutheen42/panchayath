import { createSlice } from '@reduxjs/toolkit'



export const DistrictSlice = createSlice({
    name: 'district',
    initialState: { value: null },
    reducers: {
        setDistrict: (state, action) => {
            state.value = action.payload
        },


    }
})

export const { setDistrict } = DistrictSlice.actions;
export default DistrictSlice.reducer;