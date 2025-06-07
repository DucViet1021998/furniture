"use client";

import ShoppingCart from "@/components/sn-common/ShoppingCart";
import {
  AccountIcon,
  CartIcon,
  HeartIcon,
  SearchIcon,
} from "@/components/icons";
import { cartActions, useAppDispatch, useAppSelector } from "@/redux-store";
import { Badge, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const icons = [AccountIcon, SearchIcon, HeartIcon];
const IconSection = () => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useAppSelector((state) => state.cartReducer);

  const handleShowCart = () => {
    dispatch(cartActions.isShowCart(true));
  };

  useEffect(() => {
    if (cartItems.length) {
      setQuantity(getTotalQuantity(cartItems));
    } else {
      setQuantity(0);
    }
  }, [cartItems]);

  return (
    <>
      <ShoppingCart />
      <Stack direction="row" spacing={6} fontSize={28}>
        {icons.map((Icon, index) => (
          <Box key={index} className="cursor-pointer">
            <Icon />
          </Box>
        ))}
        <Box className="cursor-pointer">
          <Badge badgeContent={quantity} color="error">
            <CartIcon onClick={handleShowCart} />
          </Badge>
        </Box>
      </Stack>
    </>
  );
};

export default IconSection;

const getTotalQuantity = (products: { quantity: number }[]): number => {
  return products.reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );
};
