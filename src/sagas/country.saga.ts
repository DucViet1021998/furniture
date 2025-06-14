import { ApiResponse } from "@/api/apiRequester";
import { countryActions } from "@/redux-store";
import { ICountry, IPhone, IProvince } from "@/redux-store/country.slice";
import { CountryService } from "@/service";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

export function* getCountryListSaga() {
  try {
    const response: ApiResponse<ICountry[]> = yield call(
      CountryService.fetchCountryList
    );
    yield put(countryActions.changeCountries(response.payload.data));
  } catch (error: any) {}
}

export function* getProvinceListSaga(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<IProvince[]> = yield call(
      CountryService.fetchProvinceList,
      action.payload
    );
    yield put(countryActions.changeProvinces(response.payload.data));
  } catch (error: any) {}
}

export function* getPhoneListSaga(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<IPhone[]> = yield call(
      CountryService.fetchPhoneList,
      action.payload
    );
    if (response.status === 200) {
      yield put(countryActions.changePhones(response.payload.data));
    }
  } catch (error: any) {}
}

export function* watchCountrySaga() {
  yield takeLatest(countryActions.getCountryList.type, getCountryListSaga);
  yield takeLatest(countryActions.getProvinceList.type, getProvinceListSaga);
  yield takeLatest(countryActions.getPhoneList.type, getPhoneListSaga);
}
