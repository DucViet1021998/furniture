"use client";

import { AppImage, AppSwipe } from "@/components/common";
import { ArrowIcon } from "@/components/icons";
import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/types";

const slides = [
  {
    src: "/images/main-slide.png",
    alt: "main-slide",
    content: "Bed Room",
    description: "Inner Peace",
  },
  {
    src: "/images/slide-1.png",
    alt: "slide-1",
    content: "Living Room",
    description: "Sweet Home",
  },
  {
    src: "/images/slide-2.png",
    alt: "slide-2",
    content: "Dining Room",
    description: "Yummy",
  },
  {
    src: "https://cdn.media.amplience.net/i/shadesoflight/XU19178.0.XU19178AB?fmt=auto&w=675",
    alt: "slide-3",
    content: "Office Room",
    description: "Lofi",
  },
  {
    src: "https://cdn.media.amplience.net/i/shadesoflight/XU19218.0.XU19218IR?fmt=auto&w=675",
    alt: "slide-4",
    content: "Family Room",
    description: "Comfortable",
  },
];

const SlideSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleChangeSlide = useCallback((swipe: Swiper) => {
    setActiveSlide(swipe.activeIndex);
  }, []);

  const [content, description] = useMemo(() => {
    return [slides[activeSlide].content, slides[activeSlide].description];
  }, [activeSlide]);

  return (
    <Stack
      direction="row"
      spacing={4}
      height={670}
      bgcolor="bg.lightPrimary"
      alignItems="center"
      justifyContent="flex-end"
      pl={8}
      mt={9}
    >
      <Stack width={422}>
        <Typography variant="h1" fontWeight={700}>
          50+ Beautiful rooms inspiration
        </Typography>
        <Typography color="text.darkGrey" fontWeight={500}>
          Our designer already made a lot of beautiful prototype of rooms that
          inspire you
        </Typography>
        <Button
          sx={{
            mt: 3,
            width: 176,
            height: 48,
            borderRadius: "unset",
          }}
          variant="contained"
        >
          Explore More
        </Button>
      </Stack>

      <Stack direction="row">
        <Stack maxWidth={904} position="relative">
          <AppSwipe
            grabCursor={true}
            modules={[FreeMode, Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={true}
            freeMode={false}
            spaceBetween={-468}
            onSlideChange={handleChangeSlide}
          >
            {slides?.map((slide, index) => (
              <SwiperSlide key={index}>
                <AppImage
                  width={activeSlide === index ? 404 : 372}
                  height={activeSlide === index ? 582 : 486}
                  src={slide.src}
                  alt={slide.alt}
                />
              </SwiperSlide>
            ))}
          </AppSwipe>

          <Stack
            direction="row"
            zIndex={99}
            position="absolute"
            bottom="24px"
            left="24px"
            alignItems="flex-end"
          >
            <Stack
              height={130}
              bgcolor="rgba(255, 255, 255, 0.72)"
              p="32px 14px 32px 32px"
            >
              <Typography color="text.darkGrey">
                0{activeSlide + 1} &#8213; {content}
              </Typography>
              <Typography fontSize={28} fontWeight={600}>
                {description}
              </Typography>
            </Stack>
            <Stack
              width={48}
              height={48}
              bgcolor="primary.main"
              alignItems="center"
              justifyContent="center"
              color="common.white"
              fontSize={24}
              className="cursor-pointer"
            >
              <ArrowIcon />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SlideSection;
