"use client";

import { IProduct } from "@/models";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ImageGallery from "react-image-gallery";
import { FormatUtils } from "@/utils";
import { useMemo, useState } from "react";
import { AppHTMLRender } from "@/components/common";
import RelateProductSection from "@/components/sn-common/RelateProductSection";
import { ProductSection } from "@/components/sn-home";

const sizeOptions = ["L", "XL", "XS"];
const ProductDetailPage = ({ data }: { data: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(sizeOptions[0]);
  const [activeColor, setActiveColor] = useState(data.colors[0]);

  const discountedPrice = useMemo(() => {
    return data?.salePercent
      ? data?.price - (data?.price * Number(data?.salePercent)) / 100
      : data?.price || 0;
  }, [data]);

  return (
    <>
      <ProductBreadcrumb title={data.name} />
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 className="custome-gallery" size={6}>
            <ImageGallery
              items={convertImageGallery(data.albumItems)}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={false}
              thumbnailPosition="left"
              showIndex={false}
            />
          </Grid2>
          <Grid2 size={6}>
            <Stack spacing={2}>
              {/* Tên và giá */}
              <Stack spacing={1}>
                <Typography fontWeight={500} variant="h2">
                  {data?.name}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography color="error" fontWeight={700} fontSize={20}>
                    {FormatUtils.formatNumber(discountedPrice)} $
                  </Typography>

                  <Typography
                    sx={{ textDecoration: "line-through" }}
                    color="text.secondary"
                  >
                    {FormatUtils.formatNumber(data?.price)} $
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={0.5}>
                  <Rating readOnly value={5} />
                </Stack>
                <Divider orientation="vertical" flexItem />
                <div style={{ fontSize: 14, color: "#777" }}>
                  5 Customer Review
                </div>
              </Stack>

              {/* Mô tả */}
              <div style={{ fontSize: 14, color: "#555" }}>
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
              </div>

              {/* Size */}
              <Stack spacing={1}>
                <div style={{ fontWeight: 600 }}>Size</div>
                <Stack direction="row" spacing={1}>
                  {sizeOptions.map((size) => (
                    <Button
                      key={size}
                      variant="contained"
                      onClick={() => setActiveSize(size)}
                      sx={{
                        width: 30,
                        minWidth: 30,
                        height: 30,
                        color: activeSize === size ? "white" : "text.black",
                        backgroundColor:
                          activeSize === size ? "#B88E2F" : "#F9F1E7",
                        "&:hover": {
                          backgroundColor:
                            activeSize === size ? "#B88E2F" : "#F9F1E7",
                        },
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>
              </Stack>

              {/* Color */}
              <Stack spacing={1}>
                <Typography>Color</Typography>
                <Stack direction="row" spacing={2}>
                  {data.colors.map((color) => (
                    <Box
                      key={color}
                      onClick={() => setActiveColor(color)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border:
                          activeColor === color
                            ? "2px solid #B88E2F"
                            : "2px solid transparent",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        transition: "border 0.2s",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: "1px solid #999",
                          boxSizing: "border-box",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>

              {/* Quantity + Buttons */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack
                  direction="row"
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "10px",
                    height: 40,
                  }}
                  alignItems="center"
                >
                  <Button
                    style={{
                      padding: "4px 12px",
                      fontSize: 16,
                      minWidth: 20,
                      height: "100%",
                    }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </Button>
                  <Box
                    sx={{
                      padding: "4px 12px",
                      minWidth: 40,
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </Box>
                  <Button
                    style={{
                      padding: "4px 12px",
                      fontSize: 16,
                      minWidth: 20,
                      height: "100%",
                    }}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </Button>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    padding: "8px 24px",
                    borderRadius: "10px",
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    padding: "8px 24px",
                    borderRadius: "10px",
                  }}
                >
                  + Compare
                </Button>
              </Stack>

              {/* Divider */}
              <Divider />

              {/* SKU, Category, Tags, Share */}
              <Stack spacing={2} sx={{ fontSize: 16, color: "#8D8D8D" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ minWidth: 100, color: "#8D8D8D" }}>
                    SKU
                  </Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>:</Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>SS001</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ minWidth: 100, color: "#8D8D8D" }}>
                    Category
                  </Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>:</Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>Sofas</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ minWidth: 100, color: "#8D8D8D" }}>
                    Tags
                  </Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>:</Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>
                    Sofa, Chair, Home, Shop
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ minWidth: 100, color: "#8D8D8D" }}>
                    Share
                  </Typography>
                  <Typography sx={{ color: "#8D8D8D" }}>:</Typography>
                  <Stack direction="row" spacing={2}>
                    <a href="#" style={{ display: "flex" }}>
                      <img
                        width={28}
                        height={28}
                        style={{ filter: "grayscale(1)", objectFit: "contain" }}
                        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                        alt="Facebook"
                      />
                    </a>
                    <a href="#" style={{ display: "flex" }}>
                      <img
                        width={28}
                        height={28}
                        style={{ filter: "grayscale(1)", objectFit: "contain" }}
                        src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                        alt="LinkedIn"
                      />
                    </a>
                    <a href="#" style={{ display: "flex" }}>
                      <img
                        width={28}
                        height={28}
                        style={{ filter: "grayscale(1)", objectFit: "contain" }}
                        src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                        alt="Twitter"
                      />
                    </a>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>

      {/* Content product */}
      <Divider sx={{ mt: 10, mb: 8 }} />
      <Container>
        <AppHTMLRender htmlRender={data?.content || ""} />
      </Container>

      {/* Related Products */}
      <Divider sx={{ mt: 10, mb: 8 }} />
      {/* <ProductSection data={{}} /> */}
    </>
  );
};

export default ProductDetailPage;

export const convertImageGallery = (data: any[]) => {
  if (!data.length) return [];

  return data.map((item) => ({
    original: item.url,
    thumbnail: item.url,
  }));
};
