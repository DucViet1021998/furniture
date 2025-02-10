import {
  ProductSection,
  RoomSection,
  SlideSection,
  WallPaper,
} from "@/components/sn-home";
import { Container, Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack>
      <WallPaper />
      <Container>
        <RoomSection />
        <ProductSection />
      </Container>
      <SlideSection />
    </Stack>
  );
}
