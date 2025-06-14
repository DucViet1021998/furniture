import { SvgIconProps } from "@mui/material";
import { ReactNode } from "react";

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}

export enum SnackbarTypeEnum {
  ErrorServer,
  Warning,
  Success,
}

export type ContentServerProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  type: SnackbarTypeEnum;
};

export interface IMenuItemModel {
  name: React.ReactElement | string;
  icon?: React.ReactElement;
  href: string;
}

export interface IAlbumItem {
  fileId: string;
  originName: string;
  url: string;
}

export interface IGeneralInfo {
  salesPackage?: string;
  modelNumber?: string;
  secondaryMaterial?: string;
  configuration?: string;
  upholsteryMaterial?: string;
  upholsteryColor?: string;
}

export interface IProductInfo {
  fillingMaterial?: string;
  finishType?: string;
  adjustableHeadrest?: boolean;
  maxLoadCapacityKg?: number;
  originCountry?: string;
}

export interface IDimensions {
  widthCm?: number;
  heightCm?: number;
  depthCm?: number;
  weightKg?: number;
  seatHeightCm?: number;
  legHeightCm?: number;
}

export interface IWarrantyInfo {
  warrantySummary?: string;
  warrantyServiceType?: string;
  warrantyCoveredIn?: string;
  warrantyNotCoveredIn?: string;
  domesticWarrantyMonths?: number;
}

export interface IProduct {
  slug: string;
  _id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  description?: string;
  isNew: boolean;
  salePercent?: number;
  isShowHomePage: boolean;
  content?: string;
  colors: string[];

  albumItems: IAlbumItem[];

  generalInfo?: IGeneralInfo;
  productInfo?: IProductInfo;
  dimensions?: IDimensions;
  warrantyInfo?: IWarrantyInfo;
}

export interface IPaginationList<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export enum PaymentMethodEnum {
  DirectBankTransfer = 1,
  CashOnDelivery = 2,
}

export interface CreateCheckoutModel {
  firstname: string;
  lastname: string;
  companyName?: string;
  countryCode: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  total: number;
  paymentMethod: PaymentMethodEnum;
  products: CheckoutProductModel[];
}

export interface CheckoutProductModel {
  productId: string;
  quantity: number;
}
