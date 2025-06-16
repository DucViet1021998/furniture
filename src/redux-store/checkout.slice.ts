import { CreateCheckoutModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitState {}

const initialState: IInitState = {};

const reducers = {
  placeOrder: (
    state: IInitState,
    action: PayloadAction<{
      payload: CreateCheckoutModel;
      onSuccess: () => void;
    }>
  ) => {},
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers,
});
const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
