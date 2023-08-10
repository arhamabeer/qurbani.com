import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slice/adminSlice";
import animalReducer from "../slice/animalSlice";
import shareReducer from "../slice/shareSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    animal: animalReducer,
    share: shareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
