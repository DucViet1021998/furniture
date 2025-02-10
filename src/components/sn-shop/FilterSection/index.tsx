import { FilterIcon, FourDotIcon, ViewIcon } from "@/components/icons";
import {
  Container,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

const FilterSection = () => {
  return (
    <Stack height={100} bgcolor="#F9F1E7">
      <Container>
        <Stack
          py={4}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Stack direction="row" spacing={3}>
            <Stack
              direction="row"
              color="text.black"
              spacing={1.5}
              alignItems="center"
            >
              <FilterIcon sx={{ fontSize: 25 }} />
              <Typography variant="h3">Filter</Typography>
            </Stack>

            <FourDotIcon sx={{ fontSize: 28 }} />
            <ViewIcon sx={{ fontSize: 28 }} />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ bgcolor: "primary.main", my: 5 }}
              flexItem
            />
            <Typography color="text.black">
              Showing 1–16 of 32 results
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography color="text.black">Show</Typography>
              <TextField
                value={16}
                sx={{
                  height: 55,
                  width: 55,
                }}
              />
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography color="text.black">Short by</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label=""
                sx={{
                  ".MuiSelect-icon": {
                    display: "none",
                  },
                }}
              >
                <MenuItem value={10}>Default</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default FilterSection;
