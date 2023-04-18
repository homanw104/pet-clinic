import { createSlice } from "@reduxjs/toolkit";

interface IOverlayState {
  isMount: boolean; // Used to determine fade in/out animations in other components
}

const initialState: IOverlayState = {
  isMount: false,
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState: initialState,
  reducers: {
    mountOverlay: (state) => {
      state.isMount = true;
    },
    unmountOverlay: (state) => {
      state.isMount = false;
    },
  },
});

export const { mountOverlay, unmountOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;
