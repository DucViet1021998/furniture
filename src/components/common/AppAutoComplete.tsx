import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  Checkbox,
  MenuItem,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { forwardRef, memo } from "react";
import AppTextField from "./AppTextField";

const AppAutoComplete = forwardRef(
  (
    {
      sx,
      label,
      textFieldProps,
      options,
      multiple,
      ...otherProps
    }: AppAutoCompleteProps,
    ref
  ) => {
    const handleCustomIsValue = (option: IOption, valueObj: IOption) => {
      if (valueObj?.id) {
        return option?.id === valueObj?.id;
      } else if (valueObj?.code) {
        return option?.code === valueObj?.code;
      } else {
        return option?.label === valueObj?.label;
      }
    };

    return (
      <Autocomplete
        options={options}
        ref={ref}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option.toString();

          if (
            typeof option === "object" &&
            options.find(
              (item) =>
                item.id === option.id ||
                item.code === option.code ||
                item._id === option._id
            )
          ) {
            return option.label || "";
          }

          return "";
        }}
        isOptionEqualToValue={handleCustomIsValue}
        fullWidth
        size="small"
        loadingText="Đang tải..."
        noOptionsText="Không có dữ liệu"
        clearText="Xóa"
        closeText="Đóng"
        classes={{
          listbox: "custom-scrollbar",
        }}
        sx={{
          "& .MuiInputBase-root": {
            py: "0 !important",
            minHeight: 60,
            height: "fit-content !important",
          },
          "&.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root.MuiInputBase-sizeSmall":
            {
              paddingRight: "50px",
            },
          "&&& .MuiInputBase-input": {
            py: "0",
            minWidth: 5,
          },
          "&& .MuiAutocomplete-endAdornment": {
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            "& .MuiAutocomplete-clearIndicator svg": {
              fontSize: 14,
            },
          },
          "&+.MuiAutocomplete-popper": {
            "& .MuiAutocomplete-paper": {
              minWidth: "fit-content",
              "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
                whiteSpace: "nowrap",
                "&.MuiAutocomplete-option[aria-selected='true']": {
                  color: "primary.main",
                  fontWeight: 500,
                },
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "common.white",
                },
              },
            },
          },
          "& .MuiAutocomplete-tag": {
            maxWidth: "calc(100% - 43px)",
          },
          ...sx,
        }}
        disableCloseOnSelect={multiple}
        multiple={multiple}
        renderInput={(params) => (
          <AppTextField {...params} label={label} {...textFieldProps} />
        )}
        renderOption={multiple ? renderOptionMultiType : renderOption}
        {...otherProps}
      />
    );
  }
);

export interface IOption {
  code?: number | string | null;
  id: string | number;
  _id?: string | number;
  label: string;
  [x: string]: any;
}

export const DEFAULT_UNIX = "id";

AppAutoComplete.displayName = "AppAutoComplete";

export type AppAutoCompleteProps = Omit<
  AutocompleteProps<
    IOption,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  "renderInput" | "renderOption"
> & {
  label?: string;
  textFieldProps?: TextFieldProps;
};

const renderOption = (
  props: React.HTMLAttributes<HTMLLIElement> & {
    key: any;
  },
  option: IOption
) => {
  return (
    <MenuItem
      {...props}
      key={[option?.id, option?.code, option?.value].filter(Boolean).join("_")}
    >
      {option?.label}
    </MenuItem>
  );
};

const renderOptionMultiType = (
  props: React.HTMLAttributes<HTMLLIElement> & {
    key: any;
  },
  option: IOption,
  { selected }: AutocompleteRenderOptionState
) => {
  const { key, ...otherProps } = props;

  return (
    <li key={option.id} {...otherProps}>
      <Checkbox sx={{ mr: 1, width: 24, height: 24 }} checked={selected} />
      <Typography>{option.label}</Typography>
    </li>
  );
};

export const getOptionId = (option?: IOption | null | number) =>
  ((option as IOption)?.id as number) ?? null;
export const getOptionCode = (option?: IOption | null | number) =>
  (option as IOption)?.code ?? "";
export const getOptionLabel = (option?: IOption | null | number) =>
  (option as IOption)?.label ?? "";
export const toOption = (id?: number | null, label?: string): IOption | null =>
  id != null ? { id, label: label ?? "" } : null;
export const mapIdsToOptions = (
  ids: (number | string)[] = [],
  source: IOption[] = []
) =>
  ids
    ?.map((id) => source.find((opt) => opt.id === id))
    .filter((opt): opt is IOption => Boolean(opt));

export default memo(AppAutoComplete);
