import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef, memo } from "react";

const AppTextField = forwardRef(
  (
    {
      isDecimal,
      sx,
      type,
      inputProps,
      InputProps,
      slotProps,
      onInput,
      ...otherProps
    }: AppTextFieldProps,
    ref
  ) => {
    const hasStartAdornment = Boolean(InputProps?.startAdornment);

    const isNumberType = type === "number";

    // Chỉ parse min/max/step nếu là number
    const { min, max } = isNumberType
      ? (slotProps?.htmlInput as SlotExtend) || {}
      : {};

    const numericMin = min !== undefined ? parseFloat(min) : undefined;
    const numericMax = max !== undefined ? parseFloat(max) : undefined;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNumberType) return;

      const value = parseFloat(e.target.value);
      if (isNaN(value)) return;

      if (numericMin !== undefined && value < numericMin) {
        e.target.value = numericMin.toString();
      }

      if (numericMax !== undefined && value > numericMax) {
        e.target.value = numericMax.toString();
      }

      onInput?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isNumberType) {
        setTimeout(() => {
          e.target.select();
        }, 0);
      }
    };

    return (
      <TextField
        sx={{
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "border.main",
          },
          ".MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "error.main",
            },
          "& .MuiInputBase-root": {
            backgroundColor: "common.white",
            borderRadius: "4px",
            pl: hasStartAdornment ? 0 : "6px",
            "&.Mui-disabled": {
              backgroundColor: "#f3f4f6",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.350",
              },
            },
          },
          "& .MuiFormLabel-root, & .MuiInputLabel-shrink": {
            fontWeight: "400 !important",
          },
          textarea: {
            pl: 1,
          },
          input: {
            height: "1.3575em",
            px: 1,
            borderRadius: "4px",
            boxShadow: "0 0 0 1000px white inset !important",
            "&.Mui-disabled": {
              boxShadow: "0 0 0 1000px #f3f4f6 inset !important",
            },
            "&:-webkit-autofill": {
              boxShadow: "0 0 0 1000px white inset !important",
              WebkitTextFillColor: "#333333 !important",
              caretColor: "#333333 !important",
            },
          },
          ...sx,
        }}
        size="small"
        fullWidth
        inputRef={ref}
        InputProps={InputProps}
        slotProps={slotProps}
        onFocus={handleFocus}
        type={type}
        onKeyDown={
          isNumberType ? (e) => handleKeyDown(e, isDecimal) : undefined
        }
        onInput={isNumberType ? handleInput : onInput}
        inputProps={inputProps}
        {...otherProps}
      />
    );
  }
);

export type AppTextFieldProps = TextFieldProps & {
  isDecimal?: boolean;
};
type SlotExtend = {
  min?: string;
  max?: string;
  step?: string;
};

AppTextField.displayName = "AppTextField";
export default memo(AppTextField);

const handleKeyDown = (e: React.KeyboardEvent, isDecimal?: boolean) => {
  const blockKeys = ["e", "E", "ê", "Ê", "+", "_"];
  if (!isDecimal) blockKeys.push(".");

  if (blockKeys.includes(e.key)) {
    e.preventDefault();
  }
};
