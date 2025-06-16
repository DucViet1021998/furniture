"use client";
import { IOption } from "@/components/common/AppAutoComplete";
import AppFormAutocomplete from "@/components/common/form/AppFormAutocomplete";
import AppFormControlRadio from "@/components/common/form/AppFormControlRadio";
import AppFormPhone from "@/components/common/form/AppFormPhone";
import AppFormTextField from "@/components/common/form/AppFormTextField";
import { getDiscountedPrice } from "@/components/sn-common/ShoppingCart";
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
import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { CountryCode } from "libphonenumber-js/core";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";

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
  const { countries, provinces, cartItems } = useAppSelector(
    (state) => ({
      countries: state.countryReducer.countries,
      provinces: state.countryReducer.provinces,
      cartItems: state.cartReducer.cartItems,
    }),
    shallowEqual
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: INIT_VALUE,
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
      products: cartItems?.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })) as CheckoutProductModel[],
    };
    dispatch(
      checkoutActions.placeOrder({
        payload,
        onSuccess: () => {
          reset(INIT_VALUE);
        },
      })
    );
  };

  useEffect(() => {
    dispatch(countryActions.getCountryList());

    return () => {
      dispatch(countryActions.reset());
    };
  }, []);

  const handleChangeCountry = (data?: IOption | IOption[]) => {
    const castedData = data as IOption | undefined;
    setValue("province", undefined);
    dispatch(countryActions.getProvinceList(castedData?.code as string));

    if (castedData?.code) {
      setDefaultCountry(castedData.code as CountryCode);
    }
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
      paddingX={"100px"}
      paddingY={"40px"}
      width={"100%"}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitData)}
      direction={"row"}
    >
      {/* Billing Details */}
      <Grid2 container columnSpacing={4} rowSpacing={3} width="50%">
        <Grid2 size={12}>
          <Typography
            fontWeight={600}
            fontSize={"36px"}
            pb={2}
            lineHeight={"100%"}
          >
            Billing Details
          </Typography>
        </Grid2>

        <Grid2 size={6}>
          <AppFormTextField
            label="First Name"
            control={control}
            name="firstName"
            rules={{ required: "First Name is required" }}
            textfieldProps={{
              helperText: errors?.firstName?.message as string,
            }}
          />
        </Grid2>
        <Grid2 size={6}>
          <AppFormTextField
            label="Last Name"
            control={control}
            name="lastName"
            rules={{ required: "Last Name is required" }}
            textfieldProps={{
              helperText: errors?.lastName?.message as string,
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            control={control}
            name="companyName"
            label="Company Name (Optional)"
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormAutocomplete
            label="Country / Region"
            options={
              countries?.map((c) => ({
                code: c.code,
                label: c.name,
              })) as IOption[]
            }
            control={control}
            name="country"
            onChangeValueForm={(data) => handleChangeCountry(data)}
            rules={{ required: "Country is required" }}
            autocompleteProps={{
              textFieldProps: {
                helperText: errors?.country?.message as string,
              },
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            control={control}
            name="streetAddress"
            label="Street address"
            rules={{ required: "Street Address is required" }}
            textfieldProps={{
              helperText: errors?.streetAddress?.message as string,
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            label="Town / City"
            control={control}
            name="city"
            rules={{ required: "City / Town is required" }}
            textfieldProps={{
              helperText: errors?.city?.message as string,
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormAutocomplete
            label="Province"
            options={
              provinces?.map((p) => ({
                code: p.code,
                label: p.name,
              })) as IOption[]
            }
            control={control}
            name="province"
            rules={{ required: "Province is required" }}
            autocompleteProps={{
              textFieldProps: {
                helperText: errors?.province?.message as string,
              },
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            control={control}
            name="zipCode"
            label="ZIP code"
            rules={{ required: "ZIP code is required" }}
            textfieldProps={{
              helperText: errors?.zipCode?.message as string,
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormPhone
            control={control}
            label="Phone"
            name="phone"
            defaultCountry={defaultCountry}
          />
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            control={control}
            name="emailAddress"
            label="Email address"
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
        </Grid2>

        <Grid2 size={12}>
          <AppFormTextField
            control={control}
            name="additionalInformation"
            label="Additional information"
          />
        </Grid2>
      </Grid2>
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
        {cartItems?.map((item) => (
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

const INIT_VALUE = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: undefined,
  streetAddress: "",
  city: "",
  province: undefined,
  zipCode: "",
  phone: "",
  phoneCode: { code: "+84", label: "+84" },
  emailAddress: "",
  additionalInformation: "",
  paymentMethod: PaymentMethodEnum.DirectBankTransfer,
};
