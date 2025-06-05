"use client";
import { Stack } from "@mui/material";
import Footer from "./Footer";
import Header, { HEADER_HEIGHT } from "./Header";

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
