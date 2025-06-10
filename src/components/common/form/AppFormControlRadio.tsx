import {
  FormControlLabel,
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
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

const AppFormControlRadio = <T extends FieldValues>({
  control,
  name,
  radioList = [],
  controlProps,
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
        name={name}
        control={control}
        render={({ field: { onChange, ...otherFieldProps } }) => (
          <RadioGroup
            row
            onChange={(_, value) => {
              if (onChangeValueForm instanceof Function)
                onChangeValueForm(value);
              onChange(value);
            }}
            {...otherFieldProps}
            {...radioGroupProps}
          >
            {radioList.map((item) => {
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
    </Stack>
  );
};

type RadioType = {
  value: string | number;
  label: string;
};

type AppFormControlRadioProps<T extends FieldValues> = StackProps & {
  control: Control<any, object>;
  name: FieldPath<T>;
  radioList: Array<RadioType>;

  radioProps?: RadioProps & RefAttributes<HTMLInputElement>;
  controlProps?: Omit<ControllerProps, "render" | "name" | "control">;
  label?: string;
  formLabelProps?: FormLabelProps;
  radioGroupProps?: RadioGroupProps;
  onChangeValueForm?: (value?: string | number) => void;
  isDisableValue?: Array<number | string>;
};

export default memo(AppFormControlRadio);
