import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICountry {
  code: string;
  name: string;
  native: string;
  phone: number[];
  continent: string;
  currency: string[];
  languages: string[];
}

export interface IProvince {
  name: string;
  code: string;
  countryCode: string;
}

export interface IPhone {
  code: string;
  phone: number[];
}

export interface IInitState {
  countries: ICountry[];
  provinces: IProvince[];
  phones: IPhone[];
  countryCode: string;
}

const initialState: IInitState = {
  countries: [],
  provinces: [],
  phones: [],
  countryCode: "",
};

const reducers = {
  getCountryList: (state: IInitState) => {},
  changeCountryCode: (state: IInitState, action: PayloadAction<string>) => {
    state.countryCode = action.payload;
  },
  changeCountries: (state: IInitState, action: PayloadAction<ICountry[]>) => {
    state.countries = action.payload;
  },
  changeProvinces: (state: IInitState, action: PayloadAction<IProvince[]>) => {
    state.provinces = action.payload;
  },
  changePhones: (state: IInitState, action: PayloadAction<IPhone[]>) => {
    state.phones = action.payload;
  },

  getPhoneList: (state: IInitState, action: PayloadAction<string>) => {},
  getProvinceList: (state: IInitState, action: PayloadAction<string>) => {},
  reset: (state: IInitState) => {
    state.countries = [];
    state.provinces = [];
    state.phones = [];
  },
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers,
});
const countryReducer = countrySlice.reducer;
export default countryReducer;
