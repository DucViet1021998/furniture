"use-client";

import { cartActions, useAppDispatch, useAppSelector } from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { memo, useEffect } from "react";
import { shallowEqual } from "react-redux";
import CartItemCard from "./CartItemCard";
import CloseCartIcon from "./CloseCartIcon";

const ShoppingCart = () => {
  const { isShowCart, cartItems } = useAppSelector(
    (state) => ({
      isShowCart: state.cartReducer.isShowCart,
      cartItems: state.cartReducer.cartItems,
    }),
    shallowEqual
  );

  // Init cart items from local storage
  useEffect(() => {
    const storedCartJson = localStorage.getItem(CART_KEY);
    if (storedCartJson) {
      const cartItems: ICartItem[] = JSON.parse(storedCartJson);
      dispatch(cartActions.initCartItemsFromLocalStorage(cartItems));
    }
  }, []);

  // Handle update cart items in local storage when state change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const dispatch = useAppDispatch();

  const handleCloseCart = () => {
    dispatch(cartActions.isShowCart(false));
  };

  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Drawer
        open={isShowCart}
        onClose={handleCloseCart}
        anchor={"right"}
        PaperProps={{
          sx: { height: "746px" },
        }}
      >
        <Box
          sx={{ width: 500 }}
          paddingX={2}
          paddingY={2}
          role="presentation"
          display={"flex"}
          justifyContent="space-between"
          flexDirection={"column"}
          height={"100%"}
        >
          {/* Header */}
          <Box sx={{ border: "1px" }} height={"5%"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600} fontSize={24}>
                Shopping Cart
              </Typography>
              <CloseCartIcon
                className="cursor-pointer"
                onClick={handleCloseCart}
                sx={{
                  fontSize: 36,
                }}
              />
            </Box>
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
              }}
            />
          </Box>
          {/* Content */}
          <Box
            sx={{
              height: "90%",
              overflowY: "auto",
            }}
          >
            {cartItems.map((item) => (
              <CartItemCard key={item.productId} cartItem={item} />
            ))}
          </Box>
          {/* Footer */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            height={"5%"}
            sx={{ flexShrink: 0 }}
          >
            <Typography fontSize={20} fontWeight={400}>
              Subtotal
            </Typography>
            <Typography fontSize={20} fontWeight={600} color="primary.main">
              {FormatUtils.formatNumber(subtotal)} $
            </Typography>
          </Stack>
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Button variant="outlined">Cart</Button>
            <Button variant="outlined">Checkout</Button>
            <Button variant="outlined">Comparision</Button>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};
export default memo(ShoppingCart);

export const CART_KEY = "cart";
