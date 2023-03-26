"use client";

import { SessionProvider, useSession } from "next-auth/react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { Home } from "@prisma/client";
import Link from "next/link";

function Banner({ home }: { home: Home }) {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user.id === home.ownerId) {
    return (
      <Card variant="info">
        <Card.Content>
          <h3>Availability sharing is turned on</h3>
          <p>
            You have turned on availability sharing for your vacation home and
            have opened the unique link that was generated as a result. Anyone
            you share this link with will be able to see everything on this
            page, with the exception of this banner.
          </p>
          <p className="mb-0">
            If you no longer wish to share your vacation home&apos;
            availability, simply turn off availability sharing from the
            home&apos;s overview.
          </p>
        </Card.Content>
        <Card.Action>
          <Link href={`/home/${home.id}`}>
            <Button>Change settings</Button>
          </Link>
        </Card.Action>
      </Card>
    );
  }

  return null;
}

export function UserHomeBanner({ home }: { home: Home }) {
  return (
    <SessionProvider>
      <Banner home={home} />
    </SessionProvider>
  );
}
