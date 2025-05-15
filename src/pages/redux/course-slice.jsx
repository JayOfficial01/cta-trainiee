import { createSlice } from "@reduxjs/toolkit";

const courses = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourse } = courses.actions;
export default courses.reducer;
