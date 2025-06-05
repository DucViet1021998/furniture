"use client";

import ShoppingCart from "@/components/common/ShoppingCart";
import {
  AccountIcon,
  CartIcon,
  HeartIcon,
  SearchIcon,
} from "@/components/icons";
import { cartActions, useAppDispatch } from "@/redux-store";
import { Box, Stack } from "@mui/material";

const icons = [AccountIcon, SearchIcon, HeartIcon];
const IconSection = () => {
  const dispatch = useAppDispatch();
  const handleShowCart = () => {
    dispatch(cartActions.isShowCart(true));
  };

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
          <CartIcon onClick={handleShowCart} />
        </Box>
      </Stack>
    </>
  );
};

export default IconSection;
