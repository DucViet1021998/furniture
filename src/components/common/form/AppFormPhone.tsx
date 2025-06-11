"use client";

import { InputLabel, InputLabelProps, Stack, StackProps } from "@mui/material";
import React, { JSX, memo } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Đảm bảo style được import
import { CountryCode, E164Number } from "libphonenumber-js/core";

const AppFormPhone = <T extends FieldValues>({
  label,
  control,
  name,
  rules,
  controlProps,
  labelProps,
  textfieldProps,
  onChangeValueForm,
  direction = "column",
  defaultCountry,
  ...otherProps
}: AppFormPhoneProps<T>): JSX.Element => {
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
        name={name}
        control={control}
        rules={rules}
        {...controlProps}
        render={({ field: { onChange, value, ref } }) => (
          <PhoneInput
            defaultCountry={defaultCountry}
            id={name}
            value={typeof value === "string" ? value : value?.toString?.()}
            onChange={(phone) => {
              onChange(phone); //
              onChangeValueForm?.(phone);
            }}
            {...textfieldProps}
            inputRef={ref}
          />
        )}
      />
    </Stack>
  );
};

export type AppFormPhoneProps<T extends FieldValues> = StackProps & {
  label?: string;
  control: Control<T>;
  name: FieldPath<T>;
  controlProps?: Omit<ControllerProps<T>, "render" | "name" | "control">;
  labelProps?: InputLabelProps;
  defaultCountry?: CountryCode;
  textfieldProps?: Omit<
    React.ComponentPropsWithoutRef<typeof PhoneInput>,
    "value" | "onChange" | "defaultCountry" | "inputComponent"
  >;
  onChangeValueForm?: (value?: E164Number) => void;
} & Pick<ControllerProps<T>, "rules">;

export default memo(AppFormPhone) as <T extends FieldValues>(
  props: AppFormPhoneProps<T>
) => JSX.Element;
