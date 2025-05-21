import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    email: "",
    token: "",
    isUpdated: false,
    education: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.token = "";
    },
    isUpdated: (state) => {
      state.isUpdated = !state.isUpdated;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
  },
});

export const { setUser, resetUser, isUpdated, setEducation } = user.actions;
export default user.reducer;
