import { ApiResponse } from "@/api/apiRequester";
import { CreateCheckoutModel } from "@/models";
import { checkoutActions } from "@/redux-store";
import { CheckoutService } from "@/service";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

export function* postCheckoutSaga(action: PayloadAction<CreateCheckoutModel>) {
  try {
    const response: ApiResponse<any> = yield call(
      CheckoutService.checkout,
      action.payload
    );
    if (response.status === 201) {
      yield put(checkoutActions.changeOrder(response.payload));
    }
  } catch (error: any) {}
}

export function* watchCheckoutSaga() {
  yield takeLatest(checkoutActions.placeOrder.type, postCheckoutSaga);
}
