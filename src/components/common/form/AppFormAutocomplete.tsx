"use client";

import { InputLabel, InputLabelProps, Stack, StackProps } from "@mui/material";
import { ReactNode, memo, JSX } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import AppAutoComplete, {
  AppAutoCompleteProps,
  IOption,
} from "../AppAutoComplete";

const AppFormAutocomplete = <T extends FieldValues>({
  label,
  options,
  control,
  name,
  rules,
  isMultiple = false,
  controlProps,
  labelProps,
  actionsButton,
  autocompleteProps,
  onChangeValueForm,
  direction = "column",
  ...otherProps
}: AppFormAutocompleteProps<T>) => {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      justifyContent="center"
      width="100%"
      direction={direction}
      {...otherProps}
    >
      {label && (
        <InputLabel
          required={Boolean(rules?.required)}
          {...labelProps}
          sx={{
            width: direction === "row" ? "unset" : "100%",
            ...labelProps?.sx,
          }}
        >
          {label}
        </InputLabel>
      )}
      <Stack
        alignItems="center"
        direction="row"
        flex={1}
        minHeight={0}
        minWidth={0}
        width={"100%"}
      >
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, ref, ...restField } }) => {
            return (
              <AppAutoComplete
                {...restField}
                value={value}
                disableCloseOnSelect={isMultiple}
                multiple={isMultiple}
                options={options}
                onChange={(_, data: any) => {
                  onChange(data);
                  if (onChangeValueForm instanceof Function) {
                    onChangeValueForm(data);
                  }
                }}
                {...autocompleteProps}
                textFieldProps={{
                  ...autocompleteProps?.textFieldProps,
                }}
              />
            );
          }}
          {...controlProps}
        />
        {actionsButton}
      </Stack>
    </Stack>
  );
};

export type AppFormAutocompleteProps<T extends FieldValues> = StackProps & {
  direction?: Pick<StackProps, "direction">;
  label?: string;
  options: IOption[];
  control: Control<T>;
  name: FieldPath<T>;

  isMultiple?: boolean;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  controlProps?: Omit<ControllerProps<T>, "render" | "name" | "control">;
  actionsButton?: ReactNode;

  labelProps?: InputLabelProps;
  autocompleteProps?: Omit<AppAutoCompleteProps, "options">;

  onChangeValueForm?: (data?: IOption | IOption[]) => void;
};

export default memo(AppFormAutocomplete) as <T extends FieldValues>(
  props: AppFormAutocompleteProps<T>
) => JSX.Element;
