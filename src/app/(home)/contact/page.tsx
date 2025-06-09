"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { AppBreadCrumb, AppFormTextField } from "@/components/common";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { postSchoolConfig } from "./helper/usePostContact";
import { LocationIcon, PhoneIcon, WorkIcon } from "@/components/icons";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { control, reset, handleSubmit } = useForm<IContactForm>({
    defaultValues: INIT_VALUE,
  });

  const handleSubmitData = async (valueForm: IContactForm) => {
    setLoading(true);
    await postSchoolConfig({
      body: valueForm,
      onSuccess: () => {
        reset();
      },
    });
    setLoading(false);
  };

  return (
    <>
      <AppBreadCrumb />

      <Container>
        <Typography
          mt={8}
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          fontSize={36}
        >
          Get In Touch With Us
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          maxWidth={600}
          mx="auto"
          mb={10}
        >
          For more information about our product & services, please feel free to
          drop us an email. Our staff always be there to help you out. Do not
          hesitate!
        </Typography>

        <Grid2
          container
          onSubmit={handleSubmit(handleSubmitData)}
          component="form"
          spacing={4}
        >
          {/* Left Side - Contact Info */}
          <Grid2 size={6}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationIcon
                  sx={{
                    fontSize: 25,
                  }}
                />
                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Address
                  </Typography>
                  <Typography variant="body2">
                    236 5th SE Avenue, New York NY10000, United States
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon
                  sx={{
                    fontSize: 25,
                  }}
                />
                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Phone
                  </Typography>
                  <Typography variant="body2">
                    Mobile: (+84) 546-6789
                  </Typography>
                  <Typography variant="body2">
                    Hotline: (+84) 456-6789
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <WorkIcon
                  sx={{
                    fontSize: 25,
                  }}
                />
                <Box>
                  <Typography fontWeight={600} mb={1}>
                    Working Time
                  </Typography>
                  <Typography variant="body2">
                    Monday–Friday: 9:00 – 22:00
                  </Typography>
                  <Typography variant="body2">
                    Saturday–Sunday: 9:00 – 21:00
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid2>

          {/* Right Side - Contact Form */}
          <Grid2 size={6}>
            <Stack spacing={3}>
              <AppFormTextField
                label="Your name"
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                }}
              />

              <AppFormTextField
                label="Email address"
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                }}
              />

              <AppFormTextField
                label="Subject"
                name="subject"
                control={control}
              />

              <AppFormTextField
                control={control}
                label="Message"
                name="message"
                textfieldProps={{
                  multiline: true,
                  rows: 4,
                }}
              />

              <Box textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Contact;

export interface IContactForm {
  name: string;
  message: string;
  subject: string;
  email: string;
}

const INIT_VALUE: IContactForm = {
  name: "",
  message: "",
  subject: "",
  email: "",
};
