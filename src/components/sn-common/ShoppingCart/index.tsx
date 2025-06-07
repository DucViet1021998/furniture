"use-client";

import { CloseCartIcon } from "@/components/icons";
import { CART_PAGE } from "@/const/path.const";
import { cartActions, useAppDispatch, useAppSelector } from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import CartItemCard from "./CartItemCard";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
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

  const handleCloseCart = () => {
    dispatch(cartActions.isShowCart(false));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discounted = getDiscountedPrice(item.price, item.salePercent);
      return total + discounted * item.quantity;
    }, 0);
  }, [cartItems]);

  const router = useRouter();

  const handleNavigateToCartPage = () => {
    dispatch(cartActions.isShowCart(false));
    router.push(CART_PAGE);
  };

  return (
    <div>
      <Drawer
        open={isShowCart}
        onClose={handleCloseCart}
        anchor={"right"}
        PaperProps={{
          sx: { height: "746px", maxHeight: "100%" },
        }}
      >
        <Box
          sx={{ width: 415 }}
          paddingX={2}
          paddingY={2}
          role="presentation"
          display={"flex"}
          justifyContent="space-between"
          flexDirection={"column"}
          height={"100%"}
        >
          {/* Header */}
          <Box sx={{ border: "1px" }}>
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
              <CartItemCard key={item._id} cartItem={item} />
            ))}
          </Box>

          {/* Footer */}
          <Stack direction={"row"} justifyContent={"space-between"} pt={1}>
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
            <Button
              onClick={handleNavigateToCartPage}
              variant="outlined"
              sx={{
                borderRadius: 99,
              }}
            >
              Cart
            </Button>
            <Button
              sx={{
                borderRadius: 99,
              }}
              variant="outlined"
            >
              Checkout
            </Button>
            <Button
              sx={{
                borderRadius: 99,
              }}
              variant="outlined"
            >
              Comparison
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};
export default memo(ShoppingCart);

export const CART_KEY = "cart";

export const getDiscountedPrice = (
  price: number,
  salePercent?: number
): number => {
  const sale = salePercent || 0;
  if (!price || sale) return price;
  return price - (price * sale) / 100;
};
