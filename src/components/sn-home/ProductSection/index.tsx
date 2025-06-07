"use client";

import apiRequester, { IApiResponsePagination } from "@/api/apiRequester";
import { ApiConst, AppConstant } from "@/const";
import { IProduct } from "@/models";
import { productActions, useAppDispatch, useAppSelector } from "@/redux-store";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import AOS from "aos";
import { useCallback, useEffect } from "react";
import { shallowEqual } from "react-redux";
import ProductCard from "./ProductCard";

const ProductSection = ({
  data,
  apiUrl = ApiConst.GET_PRODUCT_HOME,
}: {
  data: IApiResponsePagination<IProduct>;
  apiUrl?: string;
}) => {
  const dispatch = useAppDispatch();
  const { productList, currentPage, totalPages, hasMore } = useAppSelector(
    (state) => ({
      productList: state.productReducer.productList,
      currentPage: state.productReducer.currentPage,
      totalPages: state.productReducer.totalPages,
      hasMore: state.productReducer.hasMore,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      productActions.changePagination({
        currentPage: data.payload.currentPage,
        totalPages: data.payload.totalPages,
      })
    );
    dispatch(productActions.changeProductList(data.payload.data));

    AOS.init({
      duration: 500,
      easing: "ease-in-out",
    });

    return () => {
      dispatch(productActions.reset());
    };
  }, []);

  const fetchMoreProducts = useCallback(async () => {
    try {
      const response = await apiRequester.getPaging<IProduct>(apiUrl, {
        page: currentPage + 1,
        size: AppConstant.DEFAULT_SIZE,
      });

      const newProjects = response?.payload?.data || [];
      dispatch(productActions.changeMoreProductList(newProjects));
      dispatch(
        productActions.changePagination({
          currentPage: currentPage + 1,
          totalPages: response?.payload.totalPages || totalPages,
        })
      );
      dispatch(
        productActions.setHasMore(
          currentPage + 1 < response?.payload?.totalPages
        )
      );
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  }, [currentPage, totalPages]);

  return (
    <Stack mt={8} alignItems="center">
      <Typography variant="h1" fontWeight={700}>
        Our Products
      </Typography>

      <Grid2 container mt={4} columnSpacing={2} rowSpacing={4} width="100%">
        {productList?.map((product, index) => (
          <Grid2 size={{ xs: 6, md: 3 }} key={index} data-aos="fade-up">
            <ProductCard data={product} />
          </Grid2>
        ))}
      </Grid2>

      {hasMore && (
        <Button
          variant="contained"
          data-aos="zoom-in"
          sx={{
            mt: 4,
            width: 202,
            height: 48,
            bgcolor: "common.white",
            borderRadius: "unset",
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
          }}
          onClick={fetchMoreProducts}
        >
          Show more
        </Button>
      )}
    </Stack>
  );
};

export default ProductSection;
