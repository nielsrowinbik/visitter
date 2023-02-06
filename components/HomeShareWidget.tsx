import { Badge } from "@/components/Badge";
import type { HTMLAttributes } from "react";
import type { Home } from "@prisma/client";
import { HomeShareCopyButton } from "@/components/HomeShareCopyButton";
import { HomeShareToggle } from "@/components/HomeShareToggle";
import { findKeysByHomeId } from "@/lib/keys";
import { get } from "lodash";
import { getClientOrigin } from "@/lib/utils";

interface HomeShareWidgetProps extends HTMLAttributes<HTMLDivElement> {
  home: Pick<Home, "id">;
}

export async function HomeShareWidget({ home }: HomeShareWidgetProps) {
  const keys = await findKeysByHomeId(home.id);

  const isShared = keys.length !== 0;
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
        <HomeShareToggle home={home} key={key} />
      </div>
    </div>
  );
}

HomeShareWidget.Skeleton = function HomeShareWidgetSkeleton() {
  return (
    <div className="section-text">
      <h3>
        Availability sharing{" "}
        <Badge className="ml-2" variant="busy">
          Loading
        </Badge>
      </h3>
      <p>
        Let others see when your vacation home is (un)available by sending them
        the unique link that is created when turning this setting on. You can
        always turn this setting back off after which a previously generated
        link stops working.
      </p>
    </div>
  );
};
