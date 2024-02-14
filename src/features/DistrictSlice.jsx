import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
    loading: false,
    error: null,
};


export const DistrictSlice = createSlice({
    name: 'district',
    initialState: { value: null },
    reducers: {
        setDistrict: (state, action) => {
            // console.log(state)
            state.value = action.payload
        },

        addNewDistrictReducer: (state, action) => {
            state.loading = false;
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.value.unshift(...newData)
        },

        updateDistrictReducer: (state, action) => {
            state.loading = false;
            const { uid, newData } = action.payload;
            const index = state.value.findIndex(item => item.id === uid);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...newData };
            }
        },

        deleteDistrictReducer: (state, action) => {
            const id = action.payload;
            console.log(action.payload)
            state.value = state.value.filter(item => item.id !== id);

        }
    }
})

export const { setDistrict, addNewDistrictReducer, updateDistrictReducer, deleteDistrictReducer } = DistrictSlice.actions;
export default DistrictSlice.reducer;