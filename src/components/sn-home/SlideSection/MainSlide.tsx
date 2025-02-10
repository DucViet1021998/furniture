import { AppImage } from "@/components/common";
import { ArrowIcon } from "@/components/icons";
import { Stack, Typography } from "@mui/material";

const MainSlide = () => {
  return (
    <Stack position="relative">
      <AppImage
        width={404}
        height={582}
        src="/images/main-slide.png"
        alt="main-slide"
      />

      <Stack
        position="absolute"
        bottom="24px"
        left="24px"
        width="217px"
        height={130}
        bgcolor="rgba(255, 255, 255, 0.72)"
        p="32px 0px 32px 32px"
      >
        <Typography color="text.darkGrey">01 &#8213; Bed Room</Typography>
        <Typography fontSize={28} fontWeight={600}>
          Inner Peace
        </Typography>
      </Stack>
      <Stack
        width={48}
        height={48}
        position="absolute"
        bottom="24px"
        left="241px"
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
  );
};

export default MainSlide;
