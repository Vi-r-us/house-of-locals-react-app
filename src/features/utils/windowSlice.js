import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "window",
  initialState: {
    width: window.innerWidth, // Initialize with the current window width
  },
  reducers: {
    setWidth: (state, action) => {
      state.width = action.payload; // Update the width
    },
  },
});

export const { setWidth } = windowSlice.actions;

export default windowSlice.reducer;
