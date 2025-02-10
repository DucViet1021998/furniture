import { AppBreadCrumb } from "@/components/common";
import { FilterSection, ProductSection } from "@/components/sn-shop";
import { Stack } from "@mui/material";

const ShopPage = () => {
  return (
    <Stack>
      <AppBreadCrumb />
      <FilterSection />
      <ProductSection />
    </Stack>
  );
};

export default ShopPage;
