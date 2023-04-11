import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState, store} from "@/store/store";

export interface IUserState {
  username: string | null;
  password: string | null;
  isLoggedIn: boolean;

}

 const initialState: IUserState = {
  username: "qingshuruyonghuming",
  isLoggedIn: false,

  password:null,
};
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    LogIn: (state:IUserState,action:PayloadAction<string>)=>{
      state.isLoggedIn = true;
      state.username = action.payload;


    },
    LogOut: (state: IUserState,action:PayloadAction<string>)=>{
      state.isLoggedIn = false;
      state.username = null;

    }
  },
})
export const {LogIn,LogOut} = authSlice.actions
export const selectAuth = (state:RootState)=>state.auth.username
export default authSlice.reducer
