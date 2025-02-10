"use client";
import Typography from "@mui/material/Typography";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";
import { forwardRef, memo, useCallback } from "react";
import SnackbarContentCustom from "./SnackbarContentCustom";
import { SnackbarTypeEnum } from "@/models";

const AppSnackbar = forwardRef<
  HTMLDivElement,
  CustomContentProps & { type?: SnackbarTypeEnum }
>(({ id, type = SnackbarTypeEnum.ErrorServer, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleClose = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);
  return (
    <SnackbarContent ref={ref}>
      <SnackbarContentCustom
        id={id.toString()}
        title={props.action?.toString()}
        type={type}
        handleClose={handleClose}
      >
        <Typography variant="h5">{props.message}</Typography>
      </SnackbarContentCustom>
    </SnackbarContent>
  );
});

AppSnackbar.displayName = "AppSnackbar";

export default memo(AppSnackbar);
