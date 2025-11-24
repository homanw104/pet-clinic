import { createSlice } from "@reduxjs/toolkit";

interface IThemeState {
  name: "lightTheme" | "darkTheme";
}

const initialState: IThemeState = {
  name: "lightTheme",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.name = (state.name === "lightTheme") ? "darkTheme" : "lightTheme";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
