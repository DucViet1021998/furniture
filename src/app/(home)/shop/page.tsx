import apiRequester, { IApiResponsePagination } from "@/api/apiRequester";
import { AppBreadCrumb } from "@/components/common";
import {
  FilterSection,
  ProductSection,
  ServiceSection,
} from "@/components/sn-shop";
import { ApiConst, AppConstant } from "@/const";
import { IProduct } from "@/models";
import { Stack } from "@mui/material";

async function fetchData(): Promise<IApiResponsePagination<IProduct>> {
  try {
    const prouductlistResponse = await apiRequester.getPaging<IProduct>(
      ApiConst.GET_PRODUCT_HOME,
      {
        page: AppConstant.DEFAULT_PAGE,
        size: AppConstant.DEFAULT_SIZE,
      }
    );

    return prouductlistResponse;
  } catch (error) {
    return {} as IApiResponsePagination<IProduct>;
  }
}

const ShopPage = async () => {
  const productListResponse = await fetchData();

  return (
    <Stack>
      <AppBreadCrumb />
      <FilterSection data={productListResponse} />
      <ProductSection data={productListResponse} />
      <ServiceSection />
    </Stack>
  );
};

export default ShopPage;
