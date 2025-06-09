"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("token");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!orderId) return;
      const res = await fetch("http://localhost:3096/paypal/capture-order", {
        method: "POST",
        body: JSON.stringify({ orderId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Payment Success:", data);
    };

    confirmPayment();
  }, [orderId]);

  return <div>Thanh toán thành công! Cảm ơn bạn.</div>;
}
