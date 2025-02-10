import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const footerLinks = [
  {
    title: "Links",
    items: ["Home", "Shop", "About", "Contact"],
  },
  {
    title: "Help",
    items: ["Payment Options", "Returns", "Privacy Policies"],
  },
];

const Footer = () => (
  <Container>
    <Stack height={505}>
      <Stack pt={6} direction="row" justifyContent="space-between">
        <Stack spacing={7}>
          <Typography fontWeight={700} variant="h1">
            Funiro.
          </Typography>
          <Typography color="text.darkGrey2" maxWidth={285}>
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </Typography>
        </Stack>

        {footerLinks.map((section) => (
          <Stack key={section.title} spacing={7}>
            <Typography fontWeight={500} color="text.darkGrey2">
              {section.title}
            </Typography>
            <Stack spacing={6}>
              {section.items.map((item) => (
                <Typography fontWeight={500} key={item} color="text.black">
                  {item}
                </Typography>
              ))}
            </Stack>
          </Stack>
        ))}

        <Stack spacing={7}>
          <Typography fontWeight={500} color="text.darkGrey2">
            Newsletter
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{
                "& .MuiInput-root": {
                  height: 40,
                },
              }}
              placeholder="Enter Your Email Address"
              variant="standard"
            />
            <Button
              variant="text"
              sx={{
                height: 40,
                borderBottom: "1px solid",
                borderColor: "primary.main",
                borderRadius: 0,
              }}
            >
              SUBSCRIBE
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ bgcolor: "primary.main", my: 5 }} />
      <Typography color="text.black">
        2023 Funiro. All rights reserved
      </Typography>
    </Stack>
  </Container>
);

export default Footer;
