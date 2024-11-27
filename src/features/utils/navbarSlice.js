// src/features/navbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    width: 0,
    height: 0,
  },
  reducers: {
    setNavbarDimensions: (state, action) => {
      const { width, height } = action.payload;
      state.width = width;
      state.height = height;
    },
  },
});

export const { setNavbarDimensions } = navbarSlice.actions;

export default navbarSlice.reducer;