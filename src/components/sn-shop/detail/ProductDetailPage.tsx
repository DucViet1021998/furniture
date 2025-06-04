import { IProduct } from "@/models";
import { Container } from "@mui/material";
import ProductBreadcrumb from "./ProductBreadcrumb";

const ProductDetailPage = ({ data }: { data: IProduct }) => {
  return (
    <Container>
      <ProductBreadcrumb title={data?.name} />
    </Container>
  );
};

export default ProductDetailPage;
