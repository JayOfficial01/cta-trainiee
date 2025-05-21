import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    setChat: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChat } = chat.actions;
export default chat.reducer;
