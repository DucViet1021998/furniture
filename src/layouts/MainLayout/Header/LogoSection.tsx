"use client";

import { PathConstant } from "@/const";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LogoSection = () => {
  const router = useRouter();
  return (
    <Stack
      direction="row"
      spacing={1}
      fontSize={40}
      className="cursor-pointer"
      onClick={() => router.push(PathConstant.HOME_PAGE)}
    >
      <Typography variant="h1" fontWeight={700} color="text.black">
        Furniro
      </Typography>
    </Stack>
  );
};

export default LogoSection;
