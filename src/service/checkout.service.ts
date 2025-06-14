import apiRequester, { ApiResponse } from "@/api/apiRequester";
import { ApiConst } from "@/const";
import { CreateCheckoutModel } from "@/models";

export async function checkout(
  payload: CreateCheckoutModel
): Promise<ApiResponse<any>> {
  try {
    const response = await apiRequester.post<any>(
      ApiConst.POST_CHECKOUT,
      payload
    );

    return response;
  } catch (error) {
    console.error("Error checkout order:", error);
    return {} as ApiResponse<any>;
  }
}
