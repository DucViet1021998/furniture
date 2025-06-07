"use client";

import { Box, BoxProps } from "@mui/material";
import { memo } from "react";

const AppHTMLRender = ({ htmlRender, ...otherProps }: AppHTMLRenderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        fontSize: 16,
        lineHeight: 1.6,

        "& p": {
          marginBottom: 2,
          fontSize: 16,
        },

        "& h1": {
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 2,
        },

        "& h2": {
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 2,
        },

        "& h3": {
          fontSize: 18,
          fontWeight: 500,
          marginBottom: 1.5,
        },

        "& h4, & h5, & h6": {
          fontSize: 16,
          fontWeight: 500,
          marginBottom: 1.5,
        },

        "& ul, & ol": {
          paddingLeft: 4,
          marginBottom: 2,
        },

        "& li": {
          fontSize: 16,
          marginBottom: 0.5,
        },

        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 2,
        },

        "& th, & td": {
          border: "1px solid #ccc",
          padding: "8px",
          textAlign: "left",
          fontSize: 15,
        },
      }}
      dangerouslySetInnerHTML={{
        __html: htmlRender,
      }}
      {...otherProps}
    />
  );
};

export default memo(AppHTMLRender);

type AppHTMLRenderProps = BoxProps & {
  htmlRender: string | TrustedHTML;
};
