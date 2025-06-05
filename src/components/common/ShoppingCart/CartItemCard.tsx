"use-client";

import { ICartItemCardProps } from "@/models";
import { cartActions, useAppDispatch } from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { memo } from "react";
import RemoveCartItemIcon from "./RemoveCartItemIcon";
const CartItemCard = ({ cartItem }: ICartItemCardProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = (cartItem: ICartItem) => {
    dispatch(cartActions.removeCartItem(cartItem));
  };
  return (
    <Card
      key={cartItem.productId}
      sx={{
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CardMedia
            component="img"
            image={cartItem.image}
            alt={cartItem.name}
            sx={{ maxWidth: "108px", maxHeight: "108px", borderRadius: "3px" }}
            width={"30%"}
          />
          <Stack direction={"column"} width={"60%"}>
            <Typography fontSize={20} fontWeight={400}>
              {cartItem.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontSize={20} fontWeight={300}>
                {cartItem.quantity} X
              </Typography>
              <Typography fontSize={20} fontWeight={500} color="primary.main">
                {FormatUtils.formatNumber(cartItem.price)} $
              </Typography>
            </Stack>
          </Stack>
          <RemoveCartItemIcon
            className="cursor-pointer"
            onClick={() => handleRemoveCartItem(cartItem)}
            width={"10%"}
            sx={{
              fontSize: 36,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default memo(CartItemCard);
