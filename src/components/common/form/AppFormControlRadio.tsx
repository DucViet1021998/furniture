import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  Stack,
  StackProps,
} from "@mui/material";
import { RefAttributes, memo } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

const AppFormControlRadio = <T extends FieldValues>({
  control,
  name,
  radioList = [],
  controlProps,
  rules,
  helperText,
  onChangeValueForm,
  radioProps,
  defaultValue,
  label,
  radioGroupProps,
  formLabelProps,
  isDisableValue,
  ...otherProps
}: AppFormControlRadioProps<T>) => {
  return (
    <Stack {...otherProps}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange, ...otherFieldProps } }) => (
          <RadioGroup
            onChange={(_, value) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(value);
              onChange(value);
            }}
            {...otherFieldProps}
            {...radioGroupProps}
          >
            {radioList?.map((item) => {
              const isDisabled = isDisableValue?.some(
                (val) => val == item.value
              );
              return (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  disabled={isDisabled}
                  control={
                    <Radio
                      checked={otherFieldProps.value == item.value}
                      {...radioProps}
                    />
                  }
                />
              );
            })}
          </RadioGroup>
        )}
        {...controlProps}
      />
      <FormHelperText
        sx={{
          color: "red",
        }}
      >
        {helperText}
      </FormHelperText>
    </Stack>
  );
};

type RadioType = {
  value: string | number;
  label: string;
};

type AppFormControlRadioProps<T extends FieldValues> = StackProps & {
  control: any;
  name: FieldPath<T>;
  radioList: Array<RadioType>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  helperText?: React.ReactNode;

  radioProps?: RadioProps & RefAttributes<HTMLInputElement>;
  controlProps?: any;
  label?: string;
  formLabelProps?: FormLabelProps;
  radioGroupProps?: RadioGroupProps;
  onChangeValueForm?: (value?: string | number) => void;
  isDisableValue?: Array<number | string>;
};

export default memo(AppFormControlRadio);
