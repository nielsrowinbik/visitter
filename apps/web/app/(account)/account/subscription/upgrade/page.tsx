import { CheckoutButton } from "@/components/CheckoutButton";
import { getCurrentUser } from "@/lib/session";

export default async function BillingUpgradePage() {
  const user = await getCurrentUser();

  return (
    <div className="section-text">
      <h1>Upgrade to Visitter Premium</h1>
      <CheckoutButton />
    </div>
  );
}
