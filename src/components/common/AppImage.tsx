import { Box, BoxProps } from "@mui/material";
import Image, { ImageProps } from "next/image";
import { memo } from "react";

const AppImage = ({
  width,
  height,
  classes,
  src,
  boxProps,
  children,
  alt = "",
  ...imageProps
}: AppImageProps) => {
  return (
    <Box
      position="relative"
      className={classes?.root}
      width={width || "unset"}
      height={height || "unset"}
      {...boxProps}
    >
      <Image
        src={src}
        fill={true}
        draggable={false}
        alt={alt}
        {...imageProps}
      />
      {children}
    </Box>
  );
};

export type AppImageProps = Omit<ImageProps, "width" | "height"> & {
  width?: number | string;
  height?: number | string;
  classes?: {
    root: string;
  };
  boxProps?: BoxProps;
};

export default memo(AppImage);
