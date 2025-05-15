import { createSlice } from "@reduxjs/toolkit";

const hasSign = createSlice({
  name: "signed",
  initialState: { value: false },
  reducers: {
    setSign: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setSign } = hasSign.actions;
export default hasSign.reducer;
