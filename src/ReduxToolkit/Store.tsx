import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import LayoutSlice from "./Slice/LayoutSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    layout: LayoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
