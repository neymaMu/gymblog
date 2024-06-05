import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  update: null,
 
};

const updateSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
   
   
    updatefolow: (state, action) => {
        state.update= action.payload;
        state.loading = false;
        state.error = null;

       
    },
  }
  }) 

  export const {
   updatefolow
  
  
  } = updateSlice.actions;
  
  export default updateSlice.reducer;