import { IProduct } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitState {
  productList: IProduct[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

const initialState: IInitState = {
  productList: [],
  currentPage: 0,
  totalPages: 0,
  hasMore: false,
};

const reducers = {
  changePagination: (
    state: IInitState,
    action: PayloadAction<{ currentPage: number; totalPages: number }>
  ) => {
    state.currentPage = action.payload.currentPage;
    state.totalPages = action.payload.totalPages;
  },

  changeMoreProductList: (
    state: IInitState,
    action: PayloadAction<IProduct[]>
  ) => {
    state.productList = [...state.productList, ...action.payload];
  },

  changeProductList: (state: IInitState, action: PayloadAction<IProduct[]>) => {
    state.productList = action.payload;
  },

  setHasMore: (state: IInitState, action: PayloadAction<boolean>) => {
    state.hasMore = action.payload;
  },

  reset: (state: IInitState) => {
    state.productList = [];
    state.currentPage = 0;
    state.totalPages = 0;
    state.hasMore = false;
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers,
});
const productReducer = productSlice.reducer;
export default productReducer;
