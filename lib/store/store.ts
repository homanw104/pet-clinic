import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/authSlice";
import errorReducer from "@/lib/store/errorSlice";
import themeReducer from "@/lib/store/themeSlice";
import overlayReducer from "@/lib/store/overlaySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    theme: themeReducer,
    overlay: overlayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
