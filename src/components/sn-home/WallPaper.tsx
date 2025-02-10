import { AppImage } from "@/components/common";
import { HEADER_HEIGHT } from "@/layouts/MainLayout/Header";
import { Button, Stack, Typography } from "@mui/material";

const WallPaper = () => {
  return (
    <Stack>
      <AppImage
        src="/images/banner.png"
        width="100%"
        height={`calc(100vh - ${HEADER_HEIGHT})`}
        alt="banner"
      />
      <Stack
        sx={{
          height: 443,
          width: 643,
          position: "absolute",
          bottom: "20%",
          right: "100px",
          zIndex: 999,
          bgcolor: "#FFF3E3",
          borderRadius: "10px",
          p: "60px 40px",
        }}
      >
        <Typography letterSpacing="3px" fontWeight={600}>
          New Arrival
        </Typography>

        <Typography
          lineHeight="65px"
          fontSize={52}
          fontWeight={700}
          color="primary.main"
          sx={{ whiteSpace: "pre-line" }}
        >
          Discover Our{"\n"}New Collection
        </Typography>

        <Typography variant="h4" fontWeight={500} color="text.black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </Typography>

        <Button
          sx={{
            width: 222,
            height: 74,
            mt: 6,
            fontWeight: 700,
            borderRadius: "none",
          }}
          variant="contained"
        >
          Buy now
        </Button>
      </Stack>
    </Stack>
  );
};

export default WallPaper;
