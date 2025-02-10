"use client";
import { forwardRef } from "react";
import AppSnackbar from "./AppSnackbar";
import { CustomContentProps } from "notistack";
import { SnackbarTypeEnum } from "@/models";

const AppSnackbarWarning = forwardRef<
  HTMLDivElement,
  CustomContentProps & { type?: SnackbarTypeEnum }
>(({ type = SnackbarTypeEnum.Warning, ...props }, ref) => {
  return <AppSnackbar {...props} type={type} ref={ref} />;
});

AppSnackbarWarning.displayName = "AppSnackbarWarning";
export default AppSnackbarWarning;
