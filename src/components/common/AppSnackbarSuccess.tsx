"use client";
import { forwardRef } from "react";
import AppSnackbar from "./AppSnackbar";
import { CustomContentProps } from "notistack";
import { SnackbarTypeEnum } from "@/models";

const AppSnackbarSuccess = forwardRef<
  HTMLDivElement,
  CustomContentProps & { type?: SnackbarTypeEnum }
>(({ type = SnackbarTypeEnum.Success, ...props }, ref) => {
  return <AppSnackbar {...props} type={type} ref={ref} />;
});

AppSnackbarSuccess.displayName = "AppSnackbarSuccess";
export default AppSnackbarSuccess;
