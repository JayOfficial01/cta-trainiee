import { createSlice } from "@reduxjs/toolkit";

const questions = createSlice({
  name: "questions",
  initialState: { value: [] },
  reducers: {
    setQuestions: (state, action) => {
      state.value = action.payload;
    },
    clearQuestions: (state) => {
      state.value = [];
    },
  },
});

export const { setQuestions, clearQuestions } = questions.actions;
export default questions.reducer;
