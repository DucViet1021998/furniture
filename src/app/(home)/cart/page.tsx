"use client";

import { AppBreadCrumb } from "@/components/common";
import { getDiscountedPrice } from "@/components/common/ShoppingCart";
import { TrashIcon } from "@/components/icons";
import { ServiceSection } from "@/components/sn-shop";
import { cartActions, useAppDispatch, useAppSelector } from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import {
  Box,
  Button,
  CardMedia,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { shallowEqual } from "react-redux";

const cartHeadLabel = [
  "Image",
  "Product",
  "Price",
  "Quantity",
  "Subtotal",
  "Remove",
];

const CartPage = () => {
  const { cartItems } = useAppSelector(
    (state) => state.cartReducer,
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const subtotalItem = (cartItem: ICartItem) =>
    getDiscountedPrice(cartItem.price, cartItem.salePercent) *
    cartItem.quantity;

  const handleRemoveCartItem = (cartItem: ICartItem) => {
    dispatch(cartActions.removeCartItem(cartItem));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discounted = getDiscountedPrice(item.price, item.salePercent);
      return total + discounted * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <>
      <AppBreadCrumb />
      <Stack
        width={"100%"}
        direction={"row"}
        height={"525px"}
        paddingX={"100px"}
        paddingY={"80px"}
      >
        {/* Card List */}
        <Box width={"75%"} height={"100%"} maxHeight={"100%"}>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {cartHeadLabel.map((label, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        backgroundColor: "#F9F1E7",
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Box
                        sx={{
                          height: 105,
                          width: 105,
                          overflow: "hidden",
                          borderRadius: "10px",
                          margin: "auto",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={"16px"}
                        fontWeight={400}
                        lineHeight={"100%"}
                        color="#9F9F9F"
                      >
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={"16px"}
                        fontWeight={400}
                        lineHeight={"100%"}
                        color="#9F9F9F"
                      >
                        {FormatUtils.formatNumber(item.price)} $
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        border={1}
                        borderRadius={"5px"}
                        borderColor={"#9F9F9F"}
                        width={"32px"}
                        height={"32px"}
                        margin={"auto"}
                        fontSize={"16px"}
                        fontWeight={400}
                        lineHeight={"100%"}
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={"16px"}
                        fontWeight={400}
                        lineHeight={"100%"}
                      >
                        {FormatUtils.formatNumber(subtotalItem(item))} $
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <TrashIcon
                        className="cursor-pointer"
                        onClick={() => handleRemoveCartItem(item)}
                        sx={{
                          color: "#B88E2F",
                          fontSize: 28,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Cart total */}
        <Stack
          direction={"column"}
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ backgroundColor: "#F9F1E7" }}
          marginLeft={10}
          width={"25%"}
        >
          <Box
            padding={3}
            height={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Typography
              height={"10%"}
              alignItems={"center"}
              fontSize={"32px"}
              fontWeight={600}
              lineHeight={"100%"}
              margin={"auto"}
            >
              Cart Totals
            </Typography>
            <Box height={"80%"} padding={3}>
              <Stack
                height={"50%"}
                direction={"row"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"100%"}
                >
                  Subtotal
                </Typography>
                <Typography
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"100%"}
                  color="#9F9F9F"
                >
                  {FormatUtils.formatNumber(subtotal)} $
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                display={"flex"}
                justifyContent={"space-between"}
                height={"50%"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"16px"}
                  fontWeight={500}
                  lineHeight={"100%"}
                >
                  Total
                </Typography>
                <Typography
                  fontSize={"20px"}
                  fontWeight={500}
                  lineHeight={"100%"}
                  color="primary.main"
                >
                  {FormatUtils.formatNumber(subtotal)} $
                </Typography>
              </Stack>
            </Box>

            <Stack margin={"auto"} height={"10%"}>
              <Button
                sx={{
                  borderRadius: 99,
                }}
                variant="outlined"
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <ServiceSection />
    </>
  );
};

export default CartPage;
