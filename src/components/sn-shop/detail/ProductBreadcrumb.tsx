import { ArrowIcon2 } from "@/components/icons";
import { PathConstant } from "@/const";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";

const ProjectBreadcrumb = ({ title }: { title: string }) => {
  return (
    <Stack height={100} bgcolor="#F9F1E7" justifyContent="center">
      <Container>
        <Box display="flex" alignItems="center">
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ArrowIcon2 />}
            sx={{
              fontSize: 16,
              "& .MuiBreadcrumbs-separator": {
                mx: 1.5,
              },
            }}
          >
            <Link
              underline="none"
              color="#9F9F9F"
              href={PathConstant.HOME_PAGE}
              sx={{
                fontWeight: 400,
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Link>
            <Link
              underline="none"
              color="#9F9F9F"
              href={PathConstant.SHOP_PAGE}
              sx={{
                fontWeight: 400,
                "&:hover": { color: "primary.main" },
              }}
            >
              Shop
            </Link>

            <Link />
          </Breadcrumbs>

          {/* Vertical Divider and Title */}
          <Box
            mx={2}
            height={24}
            width="2px"
            bgcolor="#9F9F9F"
            display="inline-block"
          />
          <Typography fontSize={18}>{title}</Typography>
        </Box>
      </Container>
    </Stack>
  );
};

export default memo(ProjectBreadcrumb);
