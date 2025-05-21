import { createSlice } from "@reduxjs/toolkit";

const tutor = createSlice({
  name: "tutor",
  initialState: {
    default: {
      language: "",
      gender: "",
      country: "",
    },
    speaker: "",
  },
  reducers: {
    setTutor: (state, action) => {
      state.default.language = action.payload.language;
      state.default.gender = action.payload.gender;
      state.default.country = action.payload.country;
    },
    hasSpeaker: (state, action) => {
      state.speaker = action.payload.speaker;
    },
  },
});

export const { setTutor, hasSpeaker } = tutor.actions;
export default tutor.reducer;
