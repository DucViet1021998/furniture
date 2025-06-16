import { Stack, Typography } from "@mui/material";
import { AppImage } from "../common";

const RoomSection = () => {
  return (
    <Stack mt={5} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <Typography fontWeight={700} variant="h1">
          Browse The Range
        </Typography>
        <Typography variant="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Stack>

      <Stack direction="row" mt={8} spacing={2}>
        {roomData?.map((room) => (
          <RoomItem key={room.alt} {...room} />
        ))}
      </Stack>
    </Stack>
  );
};

export default RoomSection;

const roomData = [
  { alt: "dining", src: "/images/dinning.png", label: "Dining" },
  { alt: "living", src: "/images/living.png", label: "Living" },
  { alt: "bedroom", src: "/images/bedroom.png", label: "Bedroom" },
];

interface RoomItemProps {
  alt: string;
  src: string;
  label: string;
}

const RoomItem = ({ alt, src, label }: RoomItemProps) => (
  <Stack alignItems="center" spacing={3}>
    <AppImage
      width={381}
      height={480}
      alt={alt}
      src={src}
      style={{ borderRadius: "8px" }}
      sizes="(max-width: 768px) 100vw"
    />
    <Typography fontWeight={600} variant="h2">
      {label}
    </Typography>
  </Stack>
);
