import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import signReducer from "./log-indicator";
import courseReducer from "./course-slice";
import slidesReducer from "./slides-slice";
import questionReducer from "./questions-slice";
import resourceReducer from "./resources-slice";
import quizReducer from "./quiz-slice";
import metaReducer from "./meta-slice";
import chatReducer from "./chat-slice";
import tutorReducer from "./tutor-configuration-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    signed: signReducer,
    courses: courseReducer,
    slides: slidesReducer,
    questions: questionReducer,
    resources: resourceReducer,
    quizes: quizReducer,
    meta: metaReducer,
    chat: chatReducer,
    tutor: tutorReducer,
  },
});
