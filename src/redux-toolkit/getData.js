import {createAsyncThunk} from '@reduxjs/toolkit';

export const getDataapi = createAsyncThunk(
  "fetchData", 
  async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list');
      const ndata=await response.json()
      return ndata ;
    } catch (error) {
      console.error(error);
    }
});


