"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogoutButton from "./LogoutButton";

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer" size="lg">
          <AvatarImage src={session?.user?.image || ""} alt="@user" />
          <AvatarFallback className="font-bold">
            {session?.user?.name?.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5 flex flex-col gap-1">
        <div className="px-4 py-2 text-sm border-b">
          <p className="font-medium">
            <span className="block">Welcom</span>{" "}
            {session?.user?.name?.split(" ")[0]}
          </p>
          <p className="truncate">{session?.user?.email}</p>
        </div>
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
