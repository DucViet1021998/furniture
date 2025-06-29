import { EnvConstant } from "@/const";
import rootSaga from "@/sagas";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import createSagaMiddleware from "redux-saga";
import cartReducer, { cartSlice } from "./cart.slice";
import checkoutReducer, { checkoutSlice } from "./checkout.slice";
import countryReducer, { countrySlice } from "./country.slice";
import homeReducer from "./home.slice";
import productReducer, { productSlice } from "./product.slice";

/* ------------- Assemble The Actions ------------- */
export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export const countryActions = countrySlice.actions;
export const checkoutActions = checkoutSlice.actions;

/* ------------- Assemble The Reducers ------------- */
const reducer = {
  homeReducer,
  productReducer,
  cartReducer,
  countryReducer,
  checkoutReducer,
};

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
    devTools: EnvConstant.IS_DEV,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
