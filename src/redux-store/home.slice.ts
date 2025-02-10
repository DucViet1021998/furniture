import { createSlice } from "@reduxjs/toolkit";

export interface IHomeState {}

const initialState: IHomeState = {};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    reset: (state) => {},
  },
});
const homeReducer = homeSlice.reducer;
export default homeReducer;
