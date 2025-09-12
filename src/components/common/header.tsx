"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { LogInIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/authClient";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";
import MenuOptionsComponent from "./menu-options";

// interface HeaderProps {
//   category?: (typeof categoryTable.$inferSelect)[];
// }

const Header = () => {
  const session = authClient.useSession();

  return (
    <header className="flex items-center justify-between p-5">
      <Link href={"/"}>
        <Image src={"/Logo.svg"} alt="bewear" width={100} height={26.14} />
      </Link>
      <div className="flex items-center gap-3">
        <Cart />

        <Separator
          orientation="vertical"
          className=" w-full h-5 border-[1.76px] rounded-full bg-[#656565]/10"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="cursor-pointer border-none shadow-none"
            >
              <MenuIcon color="#656565" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-5">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {session.data?.user ? (
              <div className="flex justify-between space-y-6 ">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={session.data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {session.data?.user?.name?.split(" ")[0]?.[0]}
                      {session.data?.user?.name?.split(" ")[1]?.[0] ?? ""}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{session.data?.user.name}</h3>
                    <span className="text-muted-foreground block text-xs">
                      {session.data?.user.email}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button
                  asChild
                  className="cursor-pointer rounded-full w-[114px]"
                >
                  <Link href={"/authentication"}>
                    Login
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
            <Separator
              orientation="horizontal"
              className="w-full border-[1.76px] rounded-full bg-[#EEEEEE]"
            />

            <MenuOptionsComponent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
