import MuiContainer from "./MuiContainer";
import { Components, Theme } from "@mui/material";

const components: Components<Omit<Theme, "components">> = {
  MuiContainer,
};

export default components;
