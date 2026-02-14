"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur support-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="contianer mx-auto flex h-16 items-center justify-between px-4 ">
        <div className="w-full flex justify-between items-center gap-2">
          <Link
            href="/"
            className="fonet-bold text-xl tracking-tight text-gray-900"
          >
            Wikimaters
          </Link>
          <NavigationMenu>
            {session ? (
              <UserProfile />
            ) : (
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button asChild variant="outline">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            )}
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
