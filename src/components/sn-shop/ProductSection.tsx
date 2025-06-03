"use client";

import { Container, Grid2, Pagination, Stack } from "@mui/material";
import ProductCard from "../sn-home/ProductSection/ProductCard";
import { IPaginationList, IProduct } from "@/models";

const ProductSection = ({ data }: { data?: IPaginationList<IProduct> }) => {
  return (
    <Container>
      <Grid2 container mt={4} columnSpacing={2} rowSpacing={4}>
        {data?.data?.map((product, index) => (
          <Grid2 size={3} key={index}>
            <ProductCard data={product} />
          </Grid2>
        ))}
      </Grid2>

      <Stack mt={5} alignItems="center">
        <Pagination
          count={data?.totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default ProductSection;
