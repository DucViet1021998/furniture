import {
  AccountIcon,
  CartIcon,
  HeartIcon,
  SearchIcon,
} from "@/components/icons";
import { Box, Stack } from "@mui/material";

const icons = [AccountIcon, SearchIcon, HeartIcon, CartIcon];

const IconSection = () => {
  return (
    <Stack direction="row" spacing={6} fontSize={28}>
      {icons.map((Icon, index) => (
        <Box key={index} className="cursor-pointer">
          <Icon />
        </Box>
      ))}
    </Stack>
  );
};

export default IconSection;
