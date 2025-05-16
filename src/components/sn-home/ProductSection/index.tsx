"use client";

import { Button, Grid2, Stack, Typography } from "@mui/material";
import ProductCard, { ProductCardProps } from "./ProductCard";
import { useEffect, useState } from "react";
import AOS from "aos";

const ProductSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  const handleShowMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4);
    setTimeout(() => AOS.refresh(), 0);
    window.scrollBy({ top: 100, behavior: "smooth" });
  };

  return (
    <Stack mt={8} alignItems="center">
      <Typography variant="h1" fontWeight={700}>
        Our Products
      </Typography>

      <Grid2 container mt={4} columnSpacing={2} rowSpacing={4}>
        {products.slice(0, visibleProducts).map((product, index) => (
          <Grid2 size={3} key={index} data-aos="fade-up">
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>

      {visibleProducts < products.length && (
        <Button
          variant="contained"
          data-aos="zoom-in"
          sx={{
            mt: 4,
            width: 202,
            height: 48,
            bgcolor: "common.white",
            borderRadius: "unset",
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
          }}
          onClick={handleShowMore}
        >
          Show more
        </Button>
      )}
    </Stack>
  );
};

export default ProductSection;

export const products: ProductCardProps[] = [
  {
    imgSrc: "/images/syltherine.png",
    title: "Syltherine",
    description: "Stylish cafe chair",
    price: 2500,
    sale: 30,
  },
  {
    imgSrc: "/images/leviosa.png",
    title: "Leviosa",
    description: "Stylish cafe chair",
    price: 2500,
  },
  {
    imgSrc: "/images/lolito.png",
    title: "Lolito",
    description: "Luxury big sofa",
    price: 7000,
    sale: 50,
  },
  {
    imgSrc: "/images/respira.png",
    title: "Respira",
    description: "Outdoor bar table and stool",
    price: 500,
    isNew: true,
  },
  {
    imgSrc: "/images/grifo.png",
    title: "Grifo",
    description: "Night lamp",
    price: 1500,
  },
  {
    imgSrc: "/images/muggo.png",
    title: "Muggo",
    description: "Small mug",
    price: 150,
    isNew: true,
  },
  {
    imgSrc: "/images/pingky.png",
    title: "Pingky",
    description: "Cute bed set",
    price: 7000,
    sale: 50,
  },
  {
    imgSrc: "/images/potty.png",
    title: "Potty",
    description: "Minimalist flower pot",
    price: 500,
    isNew: true,
  },
  {
    imgSrc:
      "https://cdn.media.amplience.net/i/shadesoflight/XU21048.0.XU21048LW?fmt=auto&w=675",
    title: "Zion Console",
    description: "Light Gray Washed Wood",
    price: 980,
  },
  {
    imgSrc:
      "https://cdn.media.amplience.net/i/shadesoflight/XU22135.0.XU22135BR?fmt=auto&w=675",
    title: "Arielle Nesting",
    description: "Coffee Tables",
    price: 150,
  },
  {
    imgSrc:
      "https://cdn.media.amplience.net/i/shadesoflight/XU20234.0.XU20234LW?fmt=auto&w=500",
    title: "Heirloom",
    description: "Farm Table",
    price: 7000,
    sale: 50,
  },
  {
    imgSrc:
      "https://cdn.media.amplience.net/i/shadesoflight/XU15023.0.XU15023BG?fmt=auto&w=675",
    title: "Rattan",
    description: "Wingback Chair",
    price: 979,
    isNew: true,
  },
];
