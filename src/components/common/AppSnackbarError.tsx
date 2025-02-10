"use client";
import { forwardRef } from "react";
import { CustomContentProps } from "notistack";
import AppSnackbar from "./AppSnackbar";
import { SnackbarTypeEnum } from "@/models";

const AppSnackbarError = forwardRef<
  HTMLDivElement,
  CustomContentProps & { type?: SnackbarTypeEnum }
>(({ type = SnackbarTypeEnum.ErrorServer, ...props }, ref) => {
  return <AppSnackbar {...props} type={type} ref={ref} />;
});

AppSnackbarError.displayName = "AppSnackbarError";
export default AppSnackbarError;
