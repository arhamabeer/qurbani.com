import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slice/adminSlice";
import animalReducer from "../slice/animalSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    animal: animalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
