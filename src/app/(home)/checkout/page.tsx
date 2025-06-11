"use client";
import { IOption } from "@/components/common/AppAutoComplete";
import AppFormAutocomplete from "@/components/common/form/AppFormAutocomplete";
import AppFormControlRadio from "@/components/common/form/AppFormControlRadio";
import AppFormPhone from "@/components/common/form/AppFormPhone";
import AppFormTextField from "@/components/common/form/AppFormTextField";
import { getDiscountedPrice } from "@/components/sn-common/ShoppingCart";
import { AppConstant } from "@/const";
import {
  CheckoutProductModel,
  CreateCheckoutModel,
  PaymentMethodEnum,
} from "@/models";
import {
  checkoutActions,
  countryActions,
  useAppDispatch,
  useAppSelector,
} from "@/redux-store";
import { ICartItem } from "@/redux-store/cart.slice";
import { FormatUtils } from "@/utils";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { CountryCode } from "libphonenumber-js/core";

const CONTENT_TYPE_LIST = [
  {
    value: PaymentMethodEnum.DirectBankTransfer,
    label: "Direct Bank Transfer",
  },
  {
    value: PaymentMethodEnum.CashOnDelivery,
    label: "Cash On Delivery",
  },
];

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [defaultCountry, setDefaultCountry] = useState<CountryCode>("VN");
  const { countries, provinces, phones, cartItems } = useAppSelector(
    (state) => ({
      countries: state.countryReducer.countries,
      provinces: state.countryReducer.provinces,
      phones: state.countryReducer.phones,
      cartItems: state.cartReducer.cartItems,
    }),
    shallowEqual
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: undefined, // hoặc { code: "VN", label: "Vietnam" } nếu bạn muốn chọn sẵn
      streetAddress: "",
      city: "",
      province: undefined,
      zipCode: "",
      phone: "",
      phoneCode: { code: "+84", label: "+84" },
      emailAddress: "",
      additionalInformation: "",
      paymentMethod: PaymentMethodEnum.DirectBankTransfer,
    },
  });

  const handleSubmitData = (valueForm: any) => {
    const payload: CreateCheckoutModel = {
      firstname: valueForm.firstName,
      lastname: valueForm.lastName,
      companyName: valueForm.companyName,
      countryCode: valueForm.country.code,
      streetAddress: valueForm.streetAddress,
      city: valueForm.city,
      province: valueForm.province.code,
      zipCode: valueForm.zipCode,
      phone: valueForm.phone,
      email: valueForm.emailAddress,
      total: subtotal,
      paymentMethod: valueForm.paymentMethod,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })) as CheckoutProductModel[],
    };
    console.log(payload);
    // dispatch(checkoutActions.placeOrder(payload));
  };

  useEffect(() => {
    dispatch(countryActions.getCountryList());

    return () => {
      dispatch(countryActions.reset());
    };
  }, []);

  const handleChangeCountry = (data?: IOption | IOption[]) => {
    const castedData = data as IOption | undefined;
    dispatch(countryActions.getProvinceList(castedData?.code as string));

    if (castedData?.code) {
      setDefaultCountry(castedData.code as CountryCode);
    }
    // dispatch(countryActions.getPhoneList(castedData?.code as string));
  };

  const subtotalItem = (cartItem: ICartItem) =>
    getDiscountedPrice(cartItem.price, cartItem.salePercent) *
    cartItem.quantity;

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const discounted = getDiscountedPrice(item.price, item.salePercent);
      return total + discounted * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <Stack
      height={"1114px"}
      paddingX={"100px"}
      paddingY={"40px"}
      width={"100%"}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitData)}
      direction={"row"}
    >
      {/* Billing Details */}
      <Stack width={"50%"}>
        <Typography fontWeight={600} fontSize={"36px"} lineHeight={"100%"}>
          Billing Details
        </Typography>
        <Stack direction={"row"} paddingBottom={2}>
          <AppFormTextField
            width={"50%"}
            label={"First Name"}
            sx={{
              paddingRight: "10px",
            }}
            control={control}
            name={"firstName"}
            rules={{
              required: "First Name is required",
            }}
            textfieldProps={{
              helperText: errors?.firstName?.message as string,
            }}
          />
          <AppFormTextField
            width={"50%"}
            label={"Last Name"}
            control={control}
            name={"lastName"}
            rules={{
              required: "Last Name is required",
            }}
            textfieldProps={{
              helperText: errors?.lastName?.message as string,
            }}
          />
        </Stack>
        <AppFormTextField
          control={control}
          name={"companyName"}
          label={"Company Name (Optional)"}
          sx={{
            paddingBottom: 2,
          }}
        />
        <AppFormAutocomplete
          label={"Country / Region"}
          options={
            countries.map((country) => ({
              code: country.code,
              label: country.name,
            })) as IOption[]
          }
          control={control}
          name={"country"}
          sx={{
            paddingBottom: 2,
          }}
          onChangeValueForm={(data) => handleChangeCountry(data)}
          rules={{
            required: "Country is required",
          }}
          autocompleteProps={{
            textFieldProps: {
              helperText: errors?.country?.message as string,
            },
          }}
        />
        <AppFormTextField
          control={control}
          name={"streetAddress"}
          label={"Street address"}
          sx={{
            paddingBottom: 2,
          }}
          rules={{
            required: "Street Address is required",
          }}
          textfieldProps={{
            helperText: errors?.streetAddress?.message as string,
          }}
        />
        <AppFormTextField
          label={"Town / City"}
          control={control}
          name={"city"}
          sx={{
            paddingBottom: 2,
          }}
          rules={{
            required: "City / Town is required",
          }}
          textfieldProps={{
            helperText: errors?.city?.message as string,
          }}
        />
        <AppFormAutocomplete
          label={"Province"}
          options={
            provinces.map((province) => ({
              code: province.code,
              label: province.name,
            })) as IOption[]
          }
          control={control}
          name={"province"}
          sx={{
            paddingBottom: 2,
          }}
          rules={{
            required: "Province is required",
          }}
          autocompleteProps={{
            textFieldProps: {
              helperText: errors?.province?.message as string,
            },
          }}
        />
        <AppFormTextField
          control={control}
          name={"zipCode"}
          label={"ZIP code"}
          sx={{
            paddingBottom: 2,
          }}
          rules={{
            required: "ZIP code is required",
          }}
          textfieldProps={{
            helperText: errors?.zipCode?.message as string,
          }}
        />
        <Stack direction={"row"}>
          {/* <AppFormAutocomplete
            width={"12%"}
            label={"Phone"}
            options={
              phones
                .map((item) => item.phone)
                .flat()
                .map((phone) => ({
                  code: phone,
                  label: phone.toString(),
                })) as IOption[]
            }
            control={control}
            name={"phoneCode"}
            sx={{
              paddingBottom: 2,
            }}
            rules={{
              required: "Phone code is required",
            }}
            autocompleteProps={{
              textFieldProps: {
                helperText: errors?.phoneCode?.message as string,
              },
            }}
          />
          <AppFormTextField
            marginTop={"27px"}
            width={"88%"}
            control={control}
            name={"phone"}
            sx={{
              paddingBottom: 2,
            }}
            rules={{
              required: "Vui lòng nhập số điện thoại",
              validate: (value) => {
                return (
                  !value ||
                  [AppConstant.PHONE_REGEX].every((pattern) =>
                    pattern.test(value)
                  ) ||
                  "Sai định dạng số điện thoại!"
                );
              },
            }}
            textfieldProps={{
              helperText: errors?.phone?.message as string,
            }}
          /> */}
          <AppFormPhone
            control={control}
            label="phone"
            name="phone"
            defaultCountry={defaultCountry}
          />
        </Stack>
        <AppFormTextField
          control={control}
          name={"emailAddress"}
          label={"Email address"}
          sx={{
            paddingBottom: 2,
          }}
          rules={{
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:
                "Email must contains the @ symbol. Ex: example@gmail.com",
            },
          }}
          textfieldProps={{
            helperText: errors?.emailAddress?.message as string,
          }}
        />
        <AppFormTextField
          control={control}
          name={"additionalInformation"}
          label={"Additional information"}
          sx={{
            paddingBottom: 2,
          }}
        />
      </Stack>
      <Stack
        width={"50%"}
        paddingX={"100px"}
        paddingY={"40px"}
        direction={"column"}
      >
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={3}
        >
          <Typography fontSize={"24px"} fontWeight={500} lineHeight={"100%"}>
            Product
          </Typography>
          <Typography fontSize={"24px"} fontWeight={500} lineHeight={"100%"}>
            Subtotal
          </Typography>
        </Stack>
        {cartItems.map((item) => (
          <Stack
            key={item._id}
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            marginBottom={3}
          >
            <Stack direction={"row"} spacing={0.5}>
              <Typography
                fontSize={"16px"}
                fontWeight={400}
                lineHeight={"100%"}
                color="#9F9F9F"
              >
                {item.name}
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={400}
                lineHeight={"100%"}
              >
                X {item.quantity}
              </Typography>
            </Stack>
            <Typography fontSize={"16px"} fontWeight={300} lineHeight={"100%"}>
              {FormatUtils.formatNumber(subtotalItem(item))} $
            </Typography>
          </Stack>
        ))}

        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={3}
        >
          <Typography fontSize={"16px"} fontWeight={400} lineHeight={"100%"}>
            Subtotal
          </Typography>
          <Typography fontSize={"16px"} fontWeight={300} lineHeight={"100%"}>
            {FormatUtils.formatNumber(subtotal)} $
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={3}
        >
          <Typography fontSize={"16px"} fontWeight={400} lineHeight={"100%"}>
            Total
          </Typography>
          <Typography
            fontSize={"16px"}
            fontWeight={700}
            lineHeight={"100%"}
            color="primary.main"
          >
            {FormatUtils.formatNumber(subtotal)} $
          </Typography>
        </Stack>

        <Divider />
        <Typography
          fontSize={"16px"}
          fontWeight={300}
          lineHeight={"100%"}
          color="#9F9F9F"
          marginY={3}
        >
          Make your payment directly into our bank account. Please use your
          Order ID as the payment reference. Your order will not be shipped
          until the funds have cleared in our account.
        </Typography>
        <AppFormControlRadio
          radioList={CONTENT_TYPE_LIST}
          control={control}
          name="paymentMethod"
          marginBottom={3}
          radioGroupProps={{
            defaultValue: CONTENT_TYPE_LIST[0].value,
            value: CONTENT_TYPE_LIST[0].value,
          }}
          rules={{
            required: "Payment method is required",
          }}
          helperText={errors?.paymentMethod?.message as string}
        />
        <Typography
          fontSize={"16px"}
          fontWeight={300}
          lineHeight={"100%"}
          marginBottom={3}
        >
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our <strong>privacy policy.</strong>
        </Typography>
        <Stack marginX={"auto"}>
          <Button
            type="submit"
            sx={{
              borderRadius: "15px",
            }}
            variant="outlined"
          >
            Place order
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutPage;
