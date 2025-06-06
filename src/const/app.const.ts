import {
  ABOUT_PAGE,
  CART_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  SHOP_PAGE,
} from "./path.const";

export const routes = [
  {
    label: "Home",
    path: HOME_PAGE,
  },
  {
    label: "Shop",
    path: SHOP_PAGE,
  },
  {
    label: "About",
    path: ABOUT_PAGE,
  },
  {
    label: "Contact",
    path: CONTACT_PAGE,
  },
  {
    label: "Cart",
    path: CART_PAGE,
  },
];

export const DEBOUNCE_TIME_IN_MILLISECOND = 500;

export const VALUE_SELECT_ALL = "-9999";
export const ALL_OPTIONS = {
  value: VALUE_SELECT_ALL,
  label: "-- All options --",
};

export enum BooleanTypeEnum {
  False,
  True,
}

export const ACCEPT_IMAGE = {
  "image/png": [".png"],
  "image/jpeg": [".jpeg", ".jpg"],
  "image/gif": [".gif"],
};
export const IMAGE_RATIO = 16 / 9;

export const HEADER_DEFAULT = {
  // "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

export const TIMEOUT = 1800000;

//Regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

export const PAGE_SIZE_OPTIONS = [50, 100, 150, 200];
export const DEFAULT_PAGINATION_SKIP_TAKE = {
  skip: 0,
  take: PAGE_SIZE_OPTIONS[0],
};

export const DEFAULT_PAGINATION = {
  page: 1,
  size: PAGE_SIZE_OPTIONS[0],
};

export const DEFAULT_SIZE = 4;
export const DEFAULT_PAGE = 1;
