import { Form, useNavigation } from "@remix-run/react";

import { Badge } from "~/components/Badge";
import { Button } from "~/components/Button";
import { CopyButton } from "~/components/CopyButton";
import type { ShareKey } from "@prisma/client";

type ShareToggleProps = {
  baseUrl: string;
  shareKey: ShareKey | null;
};

export function ShareToggle({ baseUrl, shareKey }: ShareToggleProps) {
  const { state, formMethod } = useNavigation();
  const isShared = !!shareKey;

  const isBusy = state !== "idle" && formMethod === "POST";

  return (
    <Form className="section-text" method="POST">
      <h3>
        Availability sharing
        <Badge className="ml-2" variant={isShared ? "success" : "default"}>
          {isShared ? "Enabled" : "Disabled"}
        </Badge>
      </h3>
      <p>
        Let others see when your vacation home is (un)available by sending them
        the unique link that is created when turning this setting on.
      </p>
      {/* <p>
        You can always turn this setting back off after which a previously
        generated link stops working.
      </p> */}
      <div className="not-prose flex space-x-3">
        {isShared && (
          <CopyButton value={`${baseUrl}/availability/${shareKey.id}`}>
            {({ copy, copied }) => (
              <Button
                onClick={copy}
                size="compact"
                type="button"
                variant="outline"
              >
                {copied ? "Link copied!" : "Copy unique link"}
              </Button>
            )}
          </CopyButton>
        )}
        {isShared && (
          <Button
            loading={isBusy}
            size="compact"
            type="submit"
            variant="danger"
          >
            Disable sharing
          </Button>
        )}
        {!isShared && (
          <Button
            loading={isBusy}
            size="compact"
            type="submit"
            variant="outline"
          >
            Enable sharing
          </Button>
        )}
      </div>
    </Form>
  );
}
