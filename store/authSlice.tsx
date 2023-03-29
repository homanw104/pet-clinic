import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
  username: string | null;
  isLoggedIn: boolean;
  value: number;
}

const initialState: IUserState = {
  username: null,
  isLoggedIn: false,
  value:10
}
export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    Login: (state: IUserState,action:PayloadAction<string>)=>{
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    Logout: (state: IUserState)=>{
      state.isLoggedIn = false;
    }
  },
})
export const {Login,Logout} = authSlice.actions
export default authSlice.reducer