"use client";

import { Container, Grid2, Pagination, Stack } from "@mui/material";
// import { products } from "../sn-home/ProductSection";
import ProductCard from "../sn-home/ProductSection/ProductCard";

const ProductSection = () => {
  return (
    <Container>
      <Grid2 container mt={4} columnSpacing={2} rowSpacing={4}>
        {/* {products.map((product, index) => (
          <Grid2 size={3} key={index}>
            <ProductCard {...product} />
          </Grid2>
        ))} */}
      </Grid2>

      <Stack mt={5} alignItems="center">
        <Pagination
          count={10}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default ProductSection;
