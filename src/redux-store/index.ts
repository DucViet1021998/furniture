import { EnvConstant } from "@/const";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import homeReducer from "./home.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/sagas";
import productReducer, { productSlice } from "./product.slice";

/* ------------- Assemble The Actions ------------- */
export const productActions = productSlice.actions;

/* ------------- Assemble The Reducers ------------- */
const reducer = {
  homeReducer,
  productReducer,
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
