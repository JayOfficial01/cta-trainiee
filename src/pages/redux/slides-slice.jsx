import { createSlice } from "@reduxjs/toolkit";

const slides = createSlice({
  name: "slides",
  initialState: { slides: [] },
  reducers: {
    setSlides: (state, action) => {
      state.slides = action.payload;
    },
    clearSlides: (state) => {
      state.slides = [];
    },
  },
});

export const { setSlides, clearSlides } = slides.actions;
export default slides.reducer;
