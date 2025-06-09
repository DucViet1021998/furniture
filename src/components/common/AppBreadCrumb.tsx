"use client";

import { AppConstant, PathConstant } from "@/const";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../icons";
import AppImage from "./AppImage";

const AppBreadCrumb = () => {
  const router = usePathname();

  return (
    <Stack
      position="relative"
      alignItems="center"
      justifyContent="center"
      className="select-none"
    >
      <AppImage
        width="100%"
        height={316}
        alt="bread-crumb"
        src="/images/bread-crumb.png"
        style={{ borderRadius: "8px" }}
        sizes="(max-width: 768px) 100vw"
      />
      <Stack
        position="absolute"
        left="50%"
        top="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
        zIndex={99}
        spacing={1}
        alignItems="center"
      >
        <Stack className="text-5xl" alignItems="center">
          <Logo />
          <Typography fontSize={48} fontWeight={500}>
            {findRouterName(router)}
          </Typography>
        </Stack>

        <Breadcrumbs separator={<>&#10095;</>}>
          <Typography
            component={Link}
            fontWeight={600}
            href={PathConstant.HOME_PAGE}
          >
            Home
          </Typography>
          <Typography>{findRouterName(router)}</Typography>
        </Breadcrumbs>
      </Stack>
    </Stack>
  );
};

export default AppBreadCrumb;

const findRouterName = (pathName: string) => {
  return AppConstant.routes.find((item) => item.path === pathName)?.label || "";
};
