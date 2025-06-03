import { Box, Stack, Typography } from "@mui/material";

const SERVICES = [
  {
    icon: "/images/service-1.svg",
    title: "High Quality",
    subtitle: "crafted from top materials",
  },
  {
    icon: "/images/service-2.svg",
    title: "Warranty Protection",
    subtitle: "Over 2 years",
  },
  {
    icon: "/images/service-3.svg",
    title: "Free Shipping",
    subtitle: "Order over 150 $",
  },
  {
    icon: "/images/service-4.svg",
    title: "24 / 7 Support",
    subtitle: "Dedicated support",
  },
];

const ServiceSection = () => {
  return (
    <Stack bgcolor="#FAF3EA" height={200} mt={8} justifyContent="center">
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        px={4}
        flexWrap="wrap"
      >
        {SERVICES.map((item, idx) => (
          <Stack
            key={idx}
            direction="row"
            alignItems="center"
            spacing={2}
            width={{ xs: "100%", sm: "auto" }}
            my={1}
          >
            <Box
              component="img"
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
            />
            <Box>
              <Typography fontWeight={600} fontSize={18}>
                {item.title}
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                {item.subtitle}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ServiceSection;
