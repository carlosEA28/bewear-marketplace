"use client";

import { HouseIcon, LogOut, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GetAllCategories } from "@/actions/get-all-categories";
import { authClient } from "@/lib/authClient";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

// interface MenuOptionsProps {
//   categories?: (typeof categoryTable.$inferSelect)[];
// }
interface Category {
  id: string;
  name: string;
  slug: string;
}

const MenuOptionsComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    GetAllCategories().then(setCategories).catch(console.error);
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-4">
        <Link
          href={"/"}
          className="text-sm font-medium flex items-center gap-3"
        >
          <HouseIcon size={16} />
          Início
        </Link>
        <Link
          href={"/my-orders"}
          className="text-sm font-medium flex items-center gap-3"
        >
          <Truck size={16} />
          Meus Pedidos
        </Link>
      </div>

      <Separator
        orientation="horizontal"
        className="w-full border-[1.76px] rounded-full bg-[#EEEEEE]"
      />

      <div className="flex flex-col space-y-5 ">
        {categories?.map((category) => (
          <Link
            key={category.id}
            className="text-sm font-medium"
            href={`/category/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <Separator
        orientation="horizontal"
        className="w-full border-[1.76px] rounded-full bg-[#EEEEEE]"
      />

      <Button
        variant={"outline"}
        className="text-[#656565] border-none shadow-none justify-start"
        onClick={() => authClient.signOut()}
      >
        <LogOut />
        Sair da conta
      </Button>
    </>
  );
};

export default MenuOptionsComponent;
