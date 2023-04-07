import "@mui/material/styles";

/**
 * Allow theme customization using `createTheme`.
 */
declare module "@mui/material/styles" {
  interface Palette {
    primary: PaletteColorOptions;
    secondary: PaletteColorOptions;
    tertiary: PaletteColorOptions;
    surface: SurfaceColorOptions;
  }

  interface PaletteOptions {
    primary: PaletteColorOptions;
    secondary: PaletteColorOptions;
    tertiary: PaletteColorOptions;
    surface: SurfaceColorOptions;
  }

  interface PaletteColor {
    main: string;
    onMain: string;
    container: string;
    onContainer: string;
  }

  interface PaletteColorOptions {
    main: string;
    onMain: string;
    container: string;
    onContainer: string;
  }

  interface  SurfaceColorOptions {
    main: string;
    onMain: string;
    1: string;
    2: string;
    3: string;
    4: string;
  }
}
