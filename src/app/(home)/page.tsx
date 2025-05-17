import apiRequester from "@/api/apiRequester";
import {
  ProductSection,
  RoomSection,
  SlideSection,
  WallPaper,
} from "@/components/sn-home";
import { ApiConst, AppConstant } from "@/const";
import { IPaginationList, IProduct } from "@/models";
import { Container, Stack } from "@mui/material";

async function fetchData(): Promise<{
  productResponse: IPaginationList<IProduct>;
}> {
  try {
    const prouductlistResponse = await apiRequester.get<
      IPaginationList<IProduct>
    >(ApiConst.GET_PRODUCT_HOME, {
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

export default async function Home() {
  const { productResponse } = await fetchData();

  return (
    <Stack>
      <WallPaper />
      <Container>
        <RoomSection />
        <ProductSection data={productResponse} />
      </Container>
      <SlideSection />
    </Stack>
  );
}
