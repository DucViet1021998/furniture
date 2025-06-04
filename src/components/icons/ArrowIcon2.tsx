import { IIconProps } from "@/models";
import { SvgIcon } from "@mui/material";
import { memo } from "react";

const ArrowIcon2 = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 8 14"
      sx={{ fontSize: "inherit", fill: "none", ...sx }}
      {...otherProps}
    >
      <path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="currentColor" />
    </SvgIcon>
  );
};

export default memo(ArrowIcon2);
