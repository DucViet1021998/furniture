import { IIconProps } from "@/models";
import { SvgIcon } from "@mui/material";
import { memo } from "react";

const ProductIcon = ({ sx, ...otherProps }: IIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{ fontSize: "inherit", fill: "none", ...sx }}
      {...otherProps}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-325.000000, -80.000000)">
          <g transform="translate(325.000000, 80.000000)">
            <polygon
              fill="#FFFFFF"
              fillOpacity="0.01"
              fillRule="nonzero"
              points="24 0 0 0 0 24 24 24"
            />

            <polygon
              points="22 7 12 2 2 7 2 17 12 22 22 17"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />

            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="2"
              x2="12"
              y1="7"
              y2="12"
            />

            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="12"
              x2="12"
              y1="22"
              y2="12"
            />

            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="22"
              x2="12"
              y1="7"
              y2="12"
            />

            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="17"
              x2="7"
              y1="4.5"
              y2="9.5"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(ProductIcon);
