import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    email: "",
    token: "",
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
  },
});

export const { setUser, setAdditionalInformation, resetUser } = user.actions;
export default user.reducer;
