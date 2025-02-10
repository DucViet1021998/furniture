import { IIconProps } from "@/models";
import { SvgIcon } from "@mui/material";
import { memo } from "react";

const SuccessIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      sx={{ fontSize: "inherit", ...sx }}
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM9.04516 16.9403C9.22516 17.1203 9.44517 17.2003 9.68517 17.2003C9.92517 17.2003 10.1452 17.1203 10.3452 16.9403L18.9652 8.34029C19.3252 7.98029 19.3252 7.42028 18.9652 7.06028C18.6052 6.70028 18.0452 6.70028 17.6852 7.06028L9.70517 15.0203L6.34516 11.6803C5.98516 11.3203 5.42518 11.3203 5.06518 11.6803C4.70518 12.0403 4.70518 12.6003 5.06518 12.9603L9.04516 16.9403Z"
        fill="currentColor"
        stroke="currentStroke"
      />
    </SvgIcon>
  );
};

export default memo(SuccessIcon);
