import { createTheme } from "@mui/material";
import breakpoints from "../breakpoints";
const customBreakpoints = createTheme({ breakpoints }).breakpoints;
const maxWidth = 1440;

export default {
  styleOverrides: {
    root: {
      [customBreakpoints.up("xs")]: {
        maxWidth: maxWidth,
        paddingLeft: 80,
        paddingRight: 80,
      },
      // [customBreakpoints.up("sm")]: {
      //   maxWidth: maxWidth,
      //   paddingLeft: "80px",
      //   paddingRight: "80px",
      // },
    },
  },
};
