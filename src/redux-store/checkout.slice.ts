import { CreateCheckoutModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IInitState {
  order: any;
}

const initialState: IInitState = {
  order: {},
};

const reducers = {
  placeOrder: (
    state: IInitState,
    action: PayloadAction<CreateCheckoutModel>
  ) => {},
  changeOrder: (state: IInitState, action: PayloadAction<any>) => {
    state.order = action.payload;
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers,
});
const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
