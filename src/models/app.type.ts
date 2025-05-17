import { SvgIconProps } from "@mui/material";
import { ReactNode } from "react";

export interface IIconProps extends SvgIconProps {
  sx?: object;
  className?: string;
}

export interface DataResponseModel<T> {
  data: T;
  status: number;
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
  name: string;
  type: number;
  image: string;
  price: number;
  description: string;
  salePercent: string;
  isNew: boolean;
  isShowHomePage: boolean;
}

export interface IPaginationList<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
