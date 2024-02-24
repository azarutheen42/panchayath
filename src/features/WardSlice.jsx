import { createSlice } from '@reduxjs/toolkit'

export const WardSlice = createSlice({
    name: 'ward',
    initialState: {value: null},
    reducers: {
        setWard: (state, action) => {
            state.value = action.payload
        },
    
        
    }
})

export const {setWard} = WardSlice.actions;
export default WardSlice.reducer;