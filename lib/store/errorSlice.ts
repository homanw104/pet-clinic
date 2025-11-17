import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IErrorState {
  isError: boolean;
  errorMsg: string;
}

const initialState: IErrorState = {
  isError: false,
  errorMsg: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    raiseError: (state, action: PayloadAction<unknown>) => {
      state.isError = true;
      const error = action.payload;

      if (error instanceof Error) {
        state.errorMsg = error.message;
      } else if (typeof error === "string") {
        state.errorMsg = error;
      } else {
        state.errorMsg = "Caught an unknown error: " + error;
      }
    },
    resetError: (state) => {
      state.isError = false;
    }
  },
})

export const { raiseError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
