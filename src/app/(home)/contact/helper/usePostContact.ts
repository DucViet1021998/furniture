import apiRequester, { ApiResponse } from "@/api/apiRequester";
import { ApiConst } from "@/const";
import { enqueueSnackbar } from "notistack";
import { IContactForm } from "../page";

export const postSchoolConfig = async ({
  body,
  onSuccess,
}: {
  body: IContactForm;
  onSuccess?: () => void;
}) => {
  try {
    const response: ApiResponse<IContactForm> = await apiRequester.post(
      ApiConst.POST_PRODUCT_HOME,
      body
    );
    if (response.status === ApiConst.STT_CREATED) {
      onSuccess?.();
      enqueueSnackbar(response.payload.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.payload.message || "error", {
        variant: "error",
      });
    }
  } catch (error: any) {
    enqueueSnackbar(error.payload.message, {
      variant: "success",
    });
  }
};
