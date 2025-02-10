import "@/styles/index.scss";

import { Poppins } from "@/fonts";
import AppProvider from "@/provider/AppProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniro",
  description: "Discover Our New Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Poppins.variable}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
