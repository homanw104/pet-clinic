import { createSlice } from "@reduxjs/toolkit";

interface IThemeState {
  theme: "lightTheme" | "darkTheme";
}

const initialState: IThemeState = {
  theme: "lightTheme",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = (state.theme === "lightTheme") ? "darkTheme" : "lightTheme";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
