"use client";

import { ShareIcon, CompareIcon, LikeIcon } from "@/components/icons";
import { PRODUCT_DETAIL_PAGE } from "@/const/path.const";
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

const ProductCard = ({
  imgSrc,
  imgAlt = "img-alt",
  title,
  description,
  price,
  sale,
  isNew,
}: ProductCardProps) => {
  const router = useRouter();

  const productLabel = useMemo(() => {
    if (sale) {
      return { label: `${sale} %`, bgColor: "#E97171" };
    } else if (isNew) {
      return { label: "New", bgColor: "#2EC1AC" };
    } else {
      return { label: null, bgColor: undefined };
    }
  }, [sale, isNew]);

  const discountedPrice = useMemo(() => {
    return sale ? price - (price * sale) / 100 : price;
  }, [price, sale]);

  const handleClick = () => {
    const path = PRODUCT_DETAIL_PAGE.replace("[id]", title);
    router.push(path);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
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
        <CardMedia component="img" image={imgSrc} alt={imgAlt} />
        <CardContent sx={{ bgcolor: "bg.gray" }}>
          <Typography
            gutterBottom
            variant="h3"
            fontWeight={600}
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="h5" color="text.grey">
            {description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontSize={20} fontWeight={600}>
              {FormatUtils.formatNumber(discountedPrice)} $
            </Typography>
            {sale && (
              <Typography
                sx={{ textDecoration: "line-through" }}
                color="text.disable"
              >
                {FormatUtils.formatNumber(price)} $
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
  imgSrc: string;
  imgAlt?: string;
  title: string;
  description: string;
  price: number;
  sale?: number;
  isNew?: boolean;
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
