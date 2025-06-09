"use client";

import { Button } from "@mui/material";

const Test = () => {
  const handlePay = async () => {
    const res = await fetch("http://localhost:3096/paypal/create-order", {
      method: "POST",
      body: JSON.stringify({
        total: "1", // <-- truyền động theo giỏ hàng
        returnUrl: `${window.location.origin}/test/payment-success`,
        cancelUrl: `${window.location.origin}/test/payment-cancel`,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    const approvalUrl = data.links.find(
      (link: any) => link.rel === "approve"
    )?.href;
    if (approvalUrl) {
      window.location.href = approvalUrl;
    } else {
      alert("Không tìm thấy liên kết phê duyệt PayPal.");
    }
  };

  return <Button onClick={handlePay}>Thanh toán bằng PayPal</Button>;
};

export default Test;
