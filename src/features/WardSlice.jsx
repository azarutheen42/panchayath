import { createSlice } from '@reduxjs/toolkit'

export const WardSlice = createSlice({
    name: 'ward',
    initialState: {value: null},
    reducers: {
        setWard: (state, action) => {
            state.value = action.payload
        },
        addNewWardReducer: (state, action) => {
            state.loading = false;
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.value.unshift(...newData)
        },

        updateWardReducer: (state, action) => {
            state.loading = false;
            const { uid, newData } = action.payload;
            const index = state.value.findIndex(item => item.id === uid);
            if (index !== -1) {
                state.value[index] = { ...state.value[index], ...newData };
            }
        },

        deleteWardReducer: (state, action) => {
            const id= action.payload;
            console.log(action.payload)
            state.value = state.value.filter(item => item.id !== id);

        }
      
          
        
    }
})

export const {setWard,addNewWardReducer,updateWardReducer,deleteWardReducer} = WardSlice.actions;
export default WardSlice.reducer;