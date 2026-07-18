import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@/lib/types";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="size-8">
      <AvatarFallback className="text-xs font-medium">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}
