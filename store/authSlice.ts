import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  username: string | null;
  password: string | null;
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  username: null,
  password: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: IUserState, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout: (state: IUserState, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.username = null;
    }
  },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
