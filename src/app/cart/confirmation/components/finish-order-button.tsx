"use client";

import { Link, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButtonComponent = () => {
  const [sucessDialogIsOpen, setSucessDialogIsOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();

  const handleFinishOrder = () => {
    finishOrderMutation.mutate();
    setSucessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size={"lg"}
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Finalizar compra"
        )}
      </Button>

      <Dialog open={sucessDialogIsOpen} onOpenChange={setSucessDialogIsOpen}>
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
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Ver meus pedidos
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButtonComponent;
