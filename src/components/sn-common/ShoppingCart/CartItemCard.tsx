"use-client";

import { RemoveCartItemIcon } from "@/components/icons";
import { cartActions, useAppDispatch } from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { getDiscountedPrice } from ".";

const CartItemCard = ({ cartItem }: ICartItemCardProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = (cartItem: ICartItem) => {
    dispatch(cartActions.removeCartItem(cartItem));
  };

  const discountedPrice = getDiscountedPrice(
    cartItem.price,
    cartItem.salePercent
  );

  return (
    <Card
      key={cartItem._id}
      sx={{
        boxShadow: "unset",
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              height: 105,
              width: 105,
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <CardMedia
              component="img"
              image={cartItem.image}
              alt={cartItem.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="calc(100% - 105px)"
            pl={2}
          >
            <Stack direction={"column"}>
              <Typography fontSize={20} fontWeight={400}>
                {cartItem.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontSize={20} fontWeight={300}>
                  {cartItem.quantity} X
                </Typography>
                <Typography fontSize={20} fontWeight={500} color="primary.main">
                  {FormatUtils.formatNumber(discountedPrice)} $
                </Typography>
              </Stack>
            </Stack>
            <RemoveCartItemIcon
              className="cursor-pointer"
              onClick={() => handleRemoveCartItem(cartItem)}
              sx={{
                fontSize: 36,
                color: "#9F9F9F",
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default memo(CartItemCard);

interface ICartItemCardProps {
  cartItem: ICartItem;
}
