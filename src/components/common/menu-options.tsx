import { HouseIcon, LogOut, Truck } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/authClient";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const MenuOptionsComponent = () => {
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
        <Link className="text-sm font-medium" href={"#"}>
          Camisetas
        </Link>
        <Link className="text-sm font-medium" href={"#"}>
          Bermuda & Shorts
        </Link>
        <Link className="text-sm font-medium" href={"#"}>
          Calças
        </Link>
        <Link className="text-sm font-medium" href={"#"}>
          Jaquetas & Moletons
        </Link>
        <Link className="text-sm font-medium" href={"#"}>
          Tênis
        </Link>
        <Link className="text-sm font-medium" href={"#"}>
          Acessórios
        </Link>
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
