import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value: [],
    loading: false,
    error: null,
};



export const CitySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        setCity: (state, action) => {
            state.value = action.payload
        },
        addNewCityReducer: (state, action) => {
            state.loading = false;
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.value.unshift(...newData)
        },

        updateCityReducer: (state, action) => {
            state.loading = false;
            const { uid, newData } = action.payload;
            const index = state.value.findIndex(item => item.id === uid);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...newData };
            }
        },

        deleteCityReducer: (state, action) => {
            const id= action.payload;
            console.log(action.payload)
            state.value = state.value.filter(item => item.id !== id);

        }


    }
})

export const { setCity, addNewCityReducer, fetchDataStart, updateCityReducer, deleteCityReducer } = CitySlice.actions;
export default CitySlice.reducer;