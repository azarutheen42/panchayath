import { createSlice } from '@reduxjs/toolkit'

export const PanchayathSlice = createSlice({
    name: 'panchayath',
    initialState: {value: null},
    reducers: {
        setPanchayath: (state, action) => {
            state.value = action.payload
        },

        addNewPanchayathReducer: (state, action) => {
            state.loading = false;
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.value.unshift(...newData)
        },

        updatePanchayathReducer: (state, action) => {
            state.loading = false;
            const { uid, newData } = action.payload;
            const index = state.value.findIndex(item => item.id === uid);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...newData };
            }
        },

        deletePanchayathReducer: (state, action) => {
            const id= action.payload;
            console.log(action.payload)
            state.value = state.value.filter(item => item.id !== id);

        }
    }
})

export const {setPanchayath ,addNewPanchayathReducer,updatePanchayathReducer,deletePanchayathReducer} = PanchayathSlice.actions;
export default PanchayathSlice.reducer;