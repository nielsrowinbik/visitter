"use client";

import { Button } from "@/components/Button";
import { Icon } from "./Icon";
import superagent from "superagent";
import { toast } from "./Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CheckoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function goToCheckout() {
    try {
      setIsLoading(true);

      const { body } = await superagent.post(
        "/api/stripe/create-checkout-session"
      );

      // console.log(body.redirectUrl);
      window.location.href = body.redirectUrl;
    } catch (error) {
      toast.error(
        "Something went wrong",
        "We were unable to redirect you. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={goToCheckout}>
      {isLoading ? (
        <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      Add payment method
    </Button>
  );
}
