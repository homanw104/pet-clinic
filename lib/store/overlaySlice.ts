import { createSlice } from "@reduxjs/toolkit";

interface IOverlayState {
  isMount: boolean;
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
