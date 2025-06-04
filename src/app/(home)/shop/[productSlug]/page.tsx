import apiRequester from "@/api/apiRequester";
import ProductDetailPage from "@/components/sn-shop/detail/ProductDetailPage";
import { GET_PRODUCT_DETAIL, STT_OK } from "@/const/api.const";
import { IProduct } from "@/models";
import { notFound } from "next/navigation";
import stringFormat from "string-format";

type PageProps = {
  params: Promise<{ productSlug: string }>;
};

async function fetchData(productSlug: string) {
  try {
    const response = await apiRequester.get<IProduct>(
      stringFormat(GET_PRODUCT_DETAIL, { slug: productSlug })
    );

    return response.status === STT_OK ? response?.payload : null;
  } catch (error) {
    return null;
  }
}

const ProductDetail = async ({ params }: PageProps) => {
  const { productSlug } = await params;
  const data = await fetchData(productSlug);

  if (!data) {
    notFound();
  }

  return <ProductDetailPage data={data.data} />;
};

export default ProductDetail;
