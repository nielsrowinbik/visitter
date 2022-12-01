import { Icon } from "@/components/Icon";
import Image from "next/image";
import type { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "image" | "name">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <div className="flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
      {user.image && <Image alt="Profile picture" src={user.image} />}
      {!user.image && (
        <div>
          <span className="sr-only">{user.name}</span>
          <Icon.User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
