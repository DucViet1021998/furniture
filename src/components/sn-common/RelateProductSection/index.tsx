"use client";

import ProductCard from "@/components/sn-home/ProductSection/ProductCard";
import { IProduct } from "@/models";
import {
  Box,
  Container,
  ContainerProps,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const RelateProductSection = ({
  data,
  title,
  containerprops,
}: {
  data?: IProduct[];
  title?: string;
  containerprops?: ContainerProps;
}) => {
  return (
    <Stack mt={3}>
      <Container {...containerprops}>
        <Stack bgcolor="#fff" alignItems="left" p={2}>
          <Stack
            direction="row"
            borderBottom="1px solid #ffba00"
            justifyContent="space-between"
          >
            <Typography
              color="primary"
              fontWeight={700}
              fontSize={{ xs: 16, md: 20 }}
            >
              {/* {title || "Sản phẩm"} */}
            </Typography>

            <Box
              component={Link}
              href=""
              //   href={RouteConstant.PRODUCT}
              sx={{
                fontSize: { xs: 16, md: 20 },
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              Xem thêm {">>"}
            </Box>
          </Stack>

          <Grid2 container mt={4} columnSpacing={2} rowSpacing={4}>
            {data &&
              data.map((product, index) => (
                <Grid2 size={{ xs: 6, md: 3 }} key={index} data-aos="fade-up">
                  <ProductCard data={product} />
                </Grid2>
              ))}
          </Grid2>
        </Stack>
      </Container>
    </Stack>
  );
};

export default RelateProductSection;
