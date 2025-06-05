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

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  type: string;
  image: string;
  price: number;
  description?: string;
  isNew: boolean;
  salePercent?: string;
  isShowHomePage: boolean;

  generalInfo?: {
    salesPackage?: string;
    modelNumber?: string;
    secondaryMaterial?: string;
    configuration?: string;
    upholsteryMaterial?: string;
    upholsteryColor?: string;
  };

  productInfo?: {
    fillingMaterial?: string;
    finishType?: string;
    adjustableHeadrest?: boolean;
    maxLoadCapacityKg?: number;
    originCountry?: string;
  };

  dimensions?: {
    widthCm?: number;
    heightCm?: number;
    depthCm?: number;
    weightKg?: number;
    seatHeightCm?: number;
    legHeightCm?: number;
  };

  warrantyInfo?: {
    warrantySummary?: string;
    warrantyServiceType?: string;
    warrantyCoveredIn?: string;
    warrantyNotCoveredIn?: string;
    domesticWarrantyMonths?: number;
  };
}

export interface IPaginationList<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
