"use client";

import { memo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/pagination";
import { Swiper, SwiperProps } from "swiper/react";

const AppSwipe = ({ children, ...otherProps }: SwiperProps) => {
  return <Swiper {...otherProps}>{children}</Swiper>;
};

export default memo(AppSwipe);
