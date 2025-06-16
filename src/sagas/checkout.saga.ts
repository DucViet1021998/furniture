import { ApiResponse } from "@/api/apiRequester";
import { STT_CREATED } from "@/const/api.const";
import { CreateCheckoutModel } from "@/models";
import { checkoutActions } from "@/redux-store";
import { CheckoutService } from "@/service";
import { PayloadAction } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { call, put, takeLatest } from "redux-saga/effects";

export function* postCheckoutSaga(
  action: PayloadAction<{
    payload: CreateCheckoutModel;
    onSuccess: () => void;
  }>
) {
  try {
    const response: ApiResponse<any> = yield call(
      CheckoutService.checkout,
      action.payload.payload
    );

    if (response.status === STT_CREATED) {
      yield put(action.payload.onSuccess);
      enqueueSnackbar("Order payment successful!", {
        variant: "success",
      });
    } else {
      const apiError = response?.payload.data;

      if (apiError?.errors && Array.isArray(apiError.errors)) {
        apiError.errors.forEach((err: { field: string; errors: string[] }) => {
          err.errors.forEach((msg: string) => {
            enqueueSnackbar(`${err.field}: ${msg}`, { variant: "error" });
          });
        });
      } else if (apiError?.message) {
        enqueueSnackbar(apiError.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", {
          variant: "error",
        });
      }
    }
  } catch (error: any) {
    enqueueSnackbar("Network or unexpected error occurred.", {
      variant: "error",
    });
  }
}

export function* watchCheckoutSaga() {
  yield takeLatest(checkoutActions.placeOrder.type, postCheckoutSaga);
}
