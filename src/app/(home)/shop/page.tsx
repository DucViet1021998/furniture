import apiRequester from "@/api/apiRequester";
import { AppBreadCrumb } from "@/components/common";
import {
  FilterSection,
  ProductSection,
  ServiceSection,
} from "@/components/sn-shop";
import { ApiConst, AppConstant } from "@/const";
import { IPaginationList, IProduct } from "@/models";
import { Stack } from "@mui/material";

async function fetchData(): Promise<{
  productResponse: IPaginationList<IProduct>;
}> {
  try {
    const prouductlistResponse = await apiRequester.get<
      IPaginationList<IProduct>
    >(ApiConst.GET_PRODUCT_LIST, {
      page: AppConstant.DEFAULT_PAGE,
      size: AppConstant.DEFAULT_SIZE,
    });

    return {
      productResponse: prouductlistResponse?.payload,
    };
  } catch (error) {
    return {
      productResponse: {} as IPaginationList<IProduct>,
    };
  }
}

const ShopPage = async () => {
  const { productResponse } = await fetchData();

  return (
    <Stack>
      <AppBreadCrumb />
      <FilterSection data={productResponse} />
      <ProductSection data={productResponse} />
      <ServiceSection />
    </Stack>
  );
};

export default ShopPage;
