import { Stack } from "@mui/material";
import Header, { HEADER_HEIGHT } from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Stack pt={HEADER_HEIGHT}>
      <Header />
      {children}
      <Footer />
    </Stack>
  );
};

export default MainLayout;

type MainLayoutProps = {
  children: React.ReactNode;
};
