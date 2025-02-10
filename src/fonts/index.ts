import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "../fonts/Roboto/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/Roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Roboto/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Roboto/Roboto-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Roboto/Roboto-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
});

const Poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Poppins/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});

export { roboto, Poppins };
