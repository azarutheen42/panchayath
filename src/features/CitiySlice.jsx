import { createSlice } from '@reduxjs/toolkit'


export const CitySlice = createSlice({
    name: 'city',
    initialState: { value: null },
    reducers: {
   
        setCity: (state, action) => {
            state.value = action.payload
        },
    

    }
})

export const { setCity } = CitySlice.actions;
export default CitySlice.reducer;