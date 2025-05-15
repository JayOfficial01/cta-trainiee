import { createSlice } from "@reduxjs/toolkit";

const quizes = createSlice({
  name: "quizes",
  initialState: { quizes: [], mandatory: false },
  reducers: {
    setQuizes: (state, action) => {
      state.quizes = action.payload;
    },
    setMandatory: (state, action) => {
      state.mandatory = action.payload;
    },
    removeQuizes: (state) => {
      state.quizes = [];
    },
  },
});

export const { setQuizes, removeQuizes, setMandatory } = quizes.actions;
export default quizes.reducer;
