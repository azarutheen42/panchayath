import { createSlice } from '@reduxjs/toolkit'

export const CollectorSlice = createSlice({
    name: 'collector',
    initialState: {value: null},
    reducers: {
        setCollector: (state, action) => {
          
            state.value = action.payload
        }
    }
})

export const {setCollector} = CollectorSlice.actions;
export default CollectorSlice.reducer;