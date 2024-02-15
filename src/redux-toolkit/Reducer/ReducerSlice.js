import {createSlice} from '@reduxjs/toolkit';
import {getDataapi} from '../getData';

const initialState = {
  photos: [],
  loading: true,
  error: null,
};
 

 const getDatareducer = createSlice({
  name: 'apiData',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDataapi.fulfilled, (state, action) => {
      state.loading = false;
      state.photos=action.payload;
    });
    builder.addCase(getDataapi.pending, state => {
      state.loading = true;
    });
    builder.addCase(getDataapi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});


const { actions, reducer } = getDatareducer
export const { save } = actions;
export default reducer;









// import { createSlice } from '@reduxjs/toolkit';
// const locationSlice = createSlice({
//     name: "location",
//     initialState: {
//         location: ['Bangalore', 'Hyderabad', 'Delhi'],
//     },
//     reducers: {
//         save: (state, param) => {
//             const { payload } = param;
//             state.location = [...state.location, payload];
//         },
//     }
// });
// const { actions, reducer } = locationSlice
// export const { save } = actions;
// export default reducer;


