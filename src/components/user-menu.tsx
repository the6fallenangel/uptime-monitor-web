"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { useLogout } from "@/hooks/use-auth";
import type { User } from "@/lib/types";
import { LogOut } from "lucide-react";

export function UserMenu({ initialUser }: { initialUser: User }) {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button
            {...props}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <UserAvatar user={initialUser} />
          </Button>
        )}
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-2 py-1">
              <UserAvatar user={initialUser} />

              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {initialUser.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {initialUser.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut className="size-4 mr-2" />
          {logout.isPending ? "Signing out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
