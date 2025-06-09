"use client";

import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 10,
        textAlign: "center",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Thanh toán đã bị hủy
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Bạn đã hủy quá trình thanh toán. Nếu muốn tiếp tục mua hàng, vui lòng
        thử lại.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/cart")}
      >
        Quay lại giỏ hàng
      </Button>
    </Box>
  );
}
