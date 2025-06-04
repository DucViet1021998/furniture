import apiRequester, { IApiResponsePagination } from "@/api/apiRequester";
import {
  ProductSection,
  RoomSection,
  SlideSection,
  WallPaper,
} from "@/components/sn-home";
import { ApiConst, AppConstant } from "@/const";
import { IProduct } from "@/models";
import { Container, Stack } from "@mui/material";

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

export default async function Home() {
  const productListResponse = await fetchData();

  return (
    <Stack>
      <WallPaper />
      <Container>
        <RoomSection />
        <ProductSection data={productListResponse} />
      </Container>
      <SlideSection />
    </Stack>
  );
}
