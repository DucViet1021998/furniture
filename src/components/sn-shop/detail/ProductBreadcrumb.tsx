import { PathConstant } from "@/const";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { memo } from "react";

const ProjectBreadcrumb = ({ title }: { title: string }) => {
  return (
    <Breadcrumbs
      sx={{
        fontSize: 18,
      }}
      aria-label="breadcrumb"
    >
      <Link
        sx={{ "&:hover": { color: "primary.main" } }}
        underline="none"
        color="inherit"
        href={PathConstant.HOME_PAGE}
      >
        Home
      </Link>
      <Link
        sx={{ "&:hover": { color: "primary.main" } }}
        underline="none"
        color="inherit"
        href={PathConstant.SHOP_PAGE}
      >
        Shop
      </Link>
      <Typography fontSize={18}>{title}</Typography>
    </Breadcrumbs>
  );
};

export default memo(ProjectBreadcrumb);
