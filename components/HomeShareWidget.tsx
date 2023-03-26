"use client";

import type { Home, ShareKey } from "@prisma/client";

import { Badge } from "@/components/Badge";
import { HomeShareCopyButton } from "@/components/HomeShareCopyButton";
import { HomeShareToggle } from "@/components/HomeShareToggle";
import { fetcher } from "@/lib/fetcher";
import { get } from "lodash";
import { getClientOrigin } from "@/lib/utils";
import useSWR from "swr";

type HomeShareWidgetProps = {
  fallbackData: ShareKey[];
  homeId: Home["id"];
};

export function HomeShareWidget({
  fallbackData,
  homeId,
}: HomeShareWidgetProps) {
  const { data: keys } = useSWR<ShareKey[]>(
    `/api/homes/${homeId}/keys`,
    fetcher,
    { fallbackData }
  );

  const isShared = keys?.length !== 0;
  const key: string | undefined = get(keys, "[0].id");
  const url = `${getClientOrigin()}/availability/${key}`;

  return (
    <div className="section-text">
      <h3>
        Availability sharing{" "}
        <Badge className="ml-2" variant={isShared ? "success" : "default"}>
          {isShared ? "Enabled" : "Disabled"}
        </Badge>
      </h3>
      <p>
        Let others see when your vacation home is (un)available by sending them
        the unique link that is created when turning this setting on. You can
        always turn this setting back off after which a previously generated
        link stops working.
      </p>
      <div className="not-prose flex space-x-3">
        {isShared ? <HomeShareCopyButton url={url} /> : null}
        <HomeShareToggle homeId={homeId} shareKey={key} />
      </div>
    </div>
  );
}
