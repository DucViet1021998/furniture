"use client";

import { InputLabel, InputLabelProps, Stack, StackProps } from "@mui/material";
import React, { memo, JSX } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import AppTextField, { AppTextFieldProps } from "../AppTextField";

const AppFormTextField = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  controlProps,
  labelProps,
  textfieldProps,
  onChangeValueForm,
  direction = "column",
  ...otherProps
}: AppFormTextFieldProps<T>): JSX.Element => {
  return (
    <Stack
      spacing={0.5}
      alignItems={"center"}
      direction={direction}
      {...otherProps}
    >
      {label && (
        <InputLabel
          required={Boolean(rules?.required)}
          htmlFor={name}
          {...labelProps}
          sx={{
            width: direction === "row" ? "unset" : "100%",
            ...labelProps?.sx,
          }}
        >
          {label}
        </InputLabel>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...controlProps}
        render={({ field: { onChange, ...restField } }) => (
          <AppTextField
            id={name}
            onChange={(event) => {
              onChange(event);
              onChangeValueForm?.(event);
            }}
            {...restField}
            {...textfieldProps}
          />
        )}
      />
    </Stack>
  );
};

export type AppFormTextFieldProps<T extends FieldValues> = StackProps & {
  label?: string;
  control: Control<T>;
  name: FieldPath<T>;
  controlProps?: Omit<ControllerProps<T>, "render" | "name" | "control">;
  labelProps?: InputLabelProps;
  textfieldProps?: AppTextFieldProps;
  onChangeValueForm?: (
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} & Pick<ControllerProps<T>, "rules">;

export default memo(AppFormTextField) as <T extends FieldValues>(
  props: AppFormTextFieldProps<T>
) => JSX.Element;
