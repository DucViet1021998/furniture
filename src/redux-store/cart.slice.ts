import { IProduct } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  productId: string;
  quantity: number;
  name: string;
  type: string;
  image: string;
  price: number;
  description?: string;
  isNew: boolean;
  salePercent?: string;
  isShowHomePage: boolean;
}

export interface IInitState {
  cartItems: ICartItem[];
  isShowCart: boolean;
}

const initialState: IInitState = {
  cartItems: [],
  isShowCart: false,
};

const reducers = {
  initCartItemsFromLocalStorage: (
    state: IInitState,
    action: PayloadAction<ICartItem[]>
  ) => {
    state.cartItems = action.payload;
  },
  addProductToCart: (state: IInitState, action: PayloadAction<IProduct>) => {
    const isExistItem: boolean = state.cartItems.find(
      (item) => item.productId === action.payload._id
    )
      ? true
      : false;

    if (isExistItem) {
      state.cartItems = state.cartItems.map((item) =>
        item.productId === action.payload._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      return;
    }

    const newItem: ICartItem = {
      productId: action.payload._id,
      quantity: 1,
      ...action.payload,
    };
    state.cartItems.push(newItem);
  },
  subProductToCart: (state: IInitState, action: PayloadAction<IProduct>) => {
    state.cartItems = state.cartItems.map((item) =>
      item.productId === action.payload._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  },
  removeCartItem: (state: IInitState, action: PayloadAction<ICartItem>) => {
    state.cartItems = state.cartItems.filter(
      (item) => item.productId !== action.payload.productId
    );
  },
  isShowCart: (state: IInitState, action: PayloadAction<boolean>) => {
    state.isShowCart = action.payload;
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers,
});
const cartReducer = cartSlice.reducer;
export default cartReducer;
