type TPalette = Record<string, any> & { mode: "light" | "dark" };

const palette: TPalette = {
  mode: "light",
  common: {
    black: "#000000",
    white: "#fff",
  },
  primary: {
    main: "#B88E2F",
  },
  secondary: {
    main: "#2EC1AC",
  },
  text: {
    primary: "#3A3A3A",
    black: "#000000",
    grey: "#898989",
    disable: "#B0B0B0",
    darkGrey: "#616161",
    darkGrey2: "#9F9F9F",
  },
  bg: {
    gray: "#F4F5F7",
    lightPrimary: "#FCF8F3",
  },
};

export default palette;
