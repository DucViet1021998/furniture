import { AppBar, Container, Stack, Toolbar } from "@mui/material";
import IconSection from "./IconSection";
import LogoSection from "./LogoSection";
import NavSection from "./NavSection";

const Header = () => {
  return (
    <AppBar
      sx={{
        bgcolor: "common.white",
        height: HEADER_HEIGHT,
        boxShadow: "0px 2px 4px -1px rgba(57,76,96,.15)",
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          px: "0 !important",
        }}
      >
        <Container>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            color="text.black"
          >
            <LogoSection />
            <NavSection />
            <IconSection />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

export const HEADER_HEIGHT = "100px";
