"use client";

import { ShareIcon, CompareIcon, LikeIcon } from "@/components/icons";
import { PRODUCT_DETAIL_PAGE } from "@/const/path.const";
import { IProduct } from "@/models";
import { FormatUtils } from "@/utils";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { memo, ReactNode, useMemo } from "react";

const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();

  const productLabel = useMemo(() => {
    if (data.salePercent) {
      return { label: `${data.salePercent} %`, bgColor: "#E97171" };
    } else if (data.isNew) {
      return { label: "New", bgColor: "#2EC1AC" };
    } else {
      return { label: null, bgColor: undefined };
    }
  }, [data]);

  const discountedPrice = useMemo(() => {
    return data.salePercent
      ? data.price - (data.price * Number(data.salePercent)) / 100
      : data.price;
  }, [data]);

  const handleClick = () => {
    const path = PRODUCT_DETAIL_PAGE.replace("[id]", data.name);
    router.push(path);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        position: "relative",
        "&:hover .MuiCardActionArea-root": {
          filter: "brightness(0.5)",
          transition: "filter 0.3s ease-in-out",
        },

        "&:hover .hoverButton": {
          opacity: 1,
        },
        "&:hover .hoverIcons": {
          opacity: 1,
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Box
          sx={{
            height: 300,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={data.image}
            alt={data.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // ảnh sẽ fill toàn bộ Box
              display: "block",
            }}
          />
        </Box>

        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            fontWeight={600}
            component="div"
          >
            {data.name}
          </Typography>
          <Typography variant="h5" color="text.grey">
            {data.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontSize={20} fontWeight={600}>
              {FormatUtils.formatNumber(discountedPrice)} $
            </Typography>
            {data.salePercent && (
              <Typography
                sx={{ textDecoration: "line-through" }}
                color="text.disable"
              >
                {FormatUtils.formatNumber(data.price)} $
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
      <Stack
        className="hoverButton"
        sx={{ ...hoverStyles, width: "100%", alignItems: "center" }}
      >
        <Button
          onClick={() => console.log("add to cart")}
          variant="contained"
          sx={{
            width: 202,
            height: 48,
            bgcolor: "common.white",
            borderRadius: "unset",
            color: "primary.main",
          }}
        >
          Add to cart
        </Button>
      </Stack>
      <Stack
        className="hoverIcons"
        sx={{
          ...hoverStyles,
          top: "65%",
        }}
        direction="row"
        spacing={2}
      >
        {icons.map(renderIconWithLabel)}
      </Stack>
      {productLabel.label && (
        <Box
          sx={{
            width: 48,
            height: 48,
            bgcolor: productLabel.bgColor,
            borderRadius: "50%",
            position: "absolute",
            right: 24,
            top: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {productLabel.label}
        </Box>
      )}
    </Card>
  );
};

export default memo(ProductCard);

export type ProductCardProps = {
  data: IProduct;
};

const hoverStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const icons = [
  { icon: <ShareIcon />, label: "Share" },
  { icon: <CompareIcon />, label: "Compare" },
  { icon: <LikeIcon />, label: "Like" },
];

const renderIconWithLabel = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <Stack
    key={label}
    direction="row"
    alignItems="center"
    spacing={1}
    color="common.white"
  >
    {icon}
    <Typography color="common.white">{label}</Typography>
  </Stack>
);
