"use client";

import { createTheme } from "@mui/material";
import breakpoints from "./breakpoints";
import createCache from "@emotion/cache";
import palette from "./palette";
import typography from "./typography";
import components from "./components";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  components,
});

// Refer link: https://mui.com/material-ui/guides/interoperability/#css-injection-order
const createEmotionCache = () =>
  createCache({
    key: "css",
    prepend: true,
  });

export default theme;
export { palette, typography, breakpoints, createEmotionCache };
