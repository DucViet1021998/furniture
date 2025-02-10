"use client";

import { Container, Grid, Pagination, Stack } from "@mui/material";
import { products } from "../sn-home/ProductSection";
import ProductCard from "../sn-home/ProductSection/ProductCard";

const ProductSection = () => {
  return (
    <Container>
      <Grid container mt={4} columnSpacing={2} rowSpacing={4}>
        {products.map((product, index) => (
          <Grid item xs={3} key={index}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

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
