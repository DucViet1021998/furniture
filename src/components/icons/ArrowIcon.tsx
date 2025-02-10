import { IIconProps } from "@/models";
import { SvgIcon } from "@mui/material";
import { memo } from "react";

const ArrowIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", fill: "none", ...sx }}
      {...otherProps}
    >
      <path
        d="M21 12H3M21 12L15 6M21 12L15 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(ArrowIcon);
