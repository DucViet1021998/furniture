"use client";

import { IProduct } from "@/models";
import { Container, Grid2, Stack } from "@mui/material";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const ProductDetailPage = ({ data }: { data: IProduct }) => {
  console.log(data);

  return (
    <Stack pb={10} borderBottom="1px solid #D9D9D9">
      <ProductBreadcrumb title={data?.name} />

      <Container>
        <Grid2 container spacing={4}>
          <Grid2 className="custome-gallery" size={6}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={false}
              thumbnailPosition="left"
            />
          </Grid2>
          <Grid2 className="custome-gallery" size={6}>
            <Grid2 size={6}>
              <Stack spacing={2}>
                {/* Tên và giá */}
                <Stack spacing={1}>
                  <h2 style={{ fontSize: 28, fontWeight: 600 }}>
                    {data?.name}
                  </h2>
                  <div style={{ fontSize: 20, color: "#888" }}>
                    Rs. {data?.price.toLocaleString()}
                  </div>
                </Stack>

                {/* Đánh giá */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Stack direction="row" spacing={0.5}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </Stack>
                  <div style={{ fontSize: 14, color: "#777" }}>
                    5 Customer Review
                  </div>
                </Stack>

                {/* Mô tả */}
                <div style={{ fontSize: 14, color: "#555", maxWidth: 500 }}>
                  Setting the bar as one of the loudest speakers in its class,
                  the Kilburn is a compact, stout-hearted hero with a
                  well-balanced audio which boasts a clear midrange and extended
                  highs for a sound.
                </div>

                {/* Size */}
                <Stack spacing={1}>
                  <div style={{ fontWeight: 600 }}>Size</div>
                  <Stack direction="row" spacing={1}>
                    {["L", "XL", "XS"].map((size) => (
                      <div
                        key={size}
                        style={{
                          border: "1px solid #ccc",
                          padding: "4px 12px",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        {size}
                      </div>
                    ))}
                  </Stack>
                </Stack>

                {/* Color */}
                <Stack spacing={1}>
                  <div style={{ fontWeight: 600 }}>Color</div>
                  <Stack direction="row" spacing={2}>
                    {["#6E56F5", "#000", "#CBA946"].map((color) => (
                      <div
                        key={color}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          backgroundColor: color,
                          border: "1px solid #999",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>

                {/* Quantity + Buttons */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Stack
                    direction="row"
                    sx={{ border: "1px solid #ccc", borderRadius: 4 }}
                    alignItems="center"
                  >
                    <button style={{ padding: "4px 12px", fontSize: 16 }}>
                      -
                    </button>
                    <div
                      style={{
                        padding: "4px 12px",
                        minWidth: 24,
                        textAlign: "center",
                      }}
                    >
                      1
                    </div>
                    <button style={{ padding: "4px 12px", fontSize: 16 }}>
                      +
                    </button>
                  </Stack>
                  <button
                    style={{
                      padding: "8px 24px",
                      borderRadius: 8,
                      border: "1px solid #000",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    style={{
                      padding: "8px 24px",
                      borderRadius: 8,
                      border: "1px solid #000",
                      fontWeight: 500,
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    + Compare
                  </button>
                </Stack>

                {/* Divider */}
                <div
                  style={{ borderBottom: "1px solid #eee", margin: "20px 0" }}
                />

                {/* SKU, Category, Tags, Share */}
                <Stack spacing={1} fontSize={14}>
                  <div>
                    <b>SKU</b> : SS001
                  </div>
                  <div>
                    <b>Category</b> : Sofas
                  </div>
                  <div>
                    <b>Tags</b> : Sofa, Chair, Home, Shop
                  </div>
                  <div>
                    <b>Share</b> :
                    <Stack
                      direction="row"
                      spacing={1}
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      <a href="#">
                        <img
                          width={16}
                          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                        />
                      </a>
                      <a href="#">
                        <img
                          width={16}
                          src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                        />
                      </a>
                      <a href="#">
                        <img
                          width={16}
                          src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                        />
                      </a>
                    </Stack>
                  </div>
                </Stack>
              </Stack>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
};

export default ProductDetailPage;
