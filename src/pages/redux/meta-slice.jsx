import { createSlice } from "@reduxjs/toolkit";

const metaData = createSlice({
  name: "metaData",
  initialState: { device: "", browser: "", os: "", ip: "" },
  reducers: {
    setMeta: (state, action) => {
      state.device = action.payload.device;
      state.browser = action.payload.browser;
      state.os = action.payload.os;
      state.ip = action.payload.ip;
    },
  },
});

export const { setMeta } = metaData.actions;
export default metaData.reducer;
