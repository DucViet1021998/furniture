"use client";

import { AppConstant } from "@/const";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const NavSection = () => {
  const router = usePathname();
  const [value, setValue] = useState(router);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {AppConstant.routes.map((item, index) => (
          <BottomNavigationAction
            key={index}
            component={Link}
            href={item.path}
            sx={{
              fontWeight: 600,
              color: "text.black",
            }}
            label={item.label}
            value={item.path}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default NavSection;
