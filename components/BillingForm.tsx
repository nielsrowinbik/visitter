"use client";

import type { FormEvent, HTMLAttributes } from "react";
import { cn, formatDate } from "@/lib/utils";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { UserSubscriptionPlan } from "types";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useState } from "react";

interface BillingFormProps extends HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { redirectUrl } = await (
        await superagent.get("/api/users/stripe")
      ).body;

      window.location.href = redirectUrl;
    } catch (error) {
      return toast.error(
        "Something went wrong.",
        "Please refresh the page and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card variant="info">
        <Card.Content>
          <h3>You are currently on the {subscriptionPlan.name} plan</h3>
          <p className="mb-0">
            {subscriptionPlan.description}{" "}
            {subscriptionPlan.isPremium ? (
              <span>
                {subscriptionPlan.isCanceled
                  ? "Your plan will be canceled on "
                  : "Your plan renews on "}
                {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
              </span>
            ) : null}
          </p>
        </Card.Content>
        <Card.Action>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPremium ? "Manage subscription" : "Upgrade"}
          </Button>
        </Card.Action>
      </Card>
    </form>
  );
}
