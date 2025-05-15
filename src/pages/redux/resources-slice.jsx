import { createSlice } from "@reduxjs/toolkit";

const resources = createSlice({
  name: "resources",
  initialState: { resources: [] },
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload;
    },
  },
});

export const { setResources } = resources.actions;
export default resources.reducer;
