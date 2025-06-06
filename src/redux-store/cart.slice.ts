import { IProduct } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem extends IProduct {
  quantity: number;
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
    const isExistItem = state.cartItems.find(
      (item) => item._id === action.payload._id
    );

    if (isExistItem) {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
      return;
    }

    const newItem: ICartItem = {
      quantity: 1,
      ...action.payload,
    };
    state.cartItems.push(newItem);
  },
  subProductToCart: (state: IInitState, action: PayloadAction<IProduct>) => {
    state.cartItems = state.cartItems.map((item) =>
      item._id === action.payload._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  },
  removeCartItem: (state: IInitState, action: PayloadAction<ICartItem>) => {
    state.cartItems = state.cartItems.filter(
      (item) => item._id !== action.payload._id
    );
  },
  isShowCart: (state: IInitState, action: PayloadAction<boolean>) => {
    state.isShowCart = action.payload;
  },
  changeQuantity: (state: IInitState, action: PayloadAction<ICartItem>) => {
    state.cartItems = state.cartItems.map((item) =>
      item._id === action.payload._id ? { ...action.payload } : item
    );
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers,
});
const cartReducer = cartSlice.reducer;
export default cartReducer;
