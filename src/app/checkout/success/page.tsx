"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src={"/illustration.svg"}
          alt="Success illustration"
          width={300}
          height={300}
          className="mx-auto"
        />
        <DialogTitle className="text-2xl mt-4">Pedido Efetuado</DialogTitle>
        <DialogDescription className="font-medium">
          Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na
          seção de “Meus Pedidos”.
        </DialogDescription>

        <DialogFooter>
          <Button className="rounded-full" size="lg">
            <Link href="/my-orders">ver meus pedidos</Link>
          </Button>
          <Button className="rounded-full" variant="outline" size="lg" asChild>
            <Link href="/">Voltar para a loja</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutSuccessPage;
