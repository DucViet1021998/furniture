import apiRequester, { ApiResponse } from "@/api/apiRequester";
import { ApiConst } from "@/const";
import { ICountry, IPhone, IProvince } from "@/redux-store/country.slice";

export async function fetchCountryList(): Promise<ApiResponse<ICountry[]>> {
  try {
    const response = await apiRequester.get<ICountry[]>(
      ApiConst.GET_COUNTRY_LIST
    );

    return response;
  } catch (error) {
    console.error("Error fetching more products:", error);
    return {} as ApiResponse<ICountry[]>;
  }
}

export async function fetchProvinceList(
  countryCode: string
): Promise<ApiResponse<IProvince[]>> {
  try {
    const response = await apiRequester.get<IProvince[]>(
      ApiConst.GET_PROVINCE_LIST,
      { countryCode: countryCode }
    );

    return response;
  } catch (error) {
    console.error("Error fetching more products:", error);
    return {} as ApiResponse<IProvince[]>;
  }
}

export async function fetchPhoneList(
  countryCode: string
): Promise<ApiResponse<IPhone[]>> {
  try {
    const response = await apiRequester.get<IPhone[]>(ApiConst.GET_PHONE_LIST, {
      codes: countryCode,
    });

    return response;
  } catch (error) {
    console.error("Error fetching more products:", error);
    return {} as ApiResponse<IPhone[]>;
  }
}
