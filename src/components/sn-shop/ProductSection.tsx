"use client";

import { Container, Grid2, Pagination, Stack } from "@mui/material";
import ProductCard from "../sn-home/ProductSection/ProductCard";
import { IProduct } from "@/models";
import { IApiResponsePagination } from "@/api/apiRequester";

const ProductSection = ({
  data,
}: {
  data?: IApiResponsePagination<IProduct>;
}) => {
  return (
    <Container>
      <Grid2 container mt={4} columnSpacing={2} rowSpacing={4}>
        {data?.payload.data?.map((product, index) => (
          <Grid2 size={3} key={index}>
            <ProductCard data={product} />
          </Grid2>
        ))}
      </Grid2>

      <Stack mt={5} alignItems="center">
        <Pagination
          count={data?.payload.totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default ProductSection;
