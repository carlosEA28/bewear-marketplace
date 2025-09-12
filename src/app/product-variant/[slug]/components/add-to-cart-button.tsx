"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { addProductToCart } from "@/actions/add-product-to-cart";
import SignInFormComponet from "@/app/authentication/components/sign-in-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/authClient";

import LoginDialogComponent from "./login-dialog";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButtonComponent = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const session = authClient.useSession();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleClick = () => {
    if (!session.data?.user) {
      setOpen(true);
      return;
    }

    mutate();
  };

  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        disabled={isPending}
        onClick={handleClick}
      >
        {isPending ? (
          <Loader2 className="animate-spin mr-1" />
        ) : (
          "Adicionar à sacola"
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fazer login</DialogTitle>
            <DialogDescription>
              Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
              veste com personalidade.
            </DialogDescription>
          </DialogHeader>

          {/* Seu componente de login real */}
          <SignInFormComponet />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToCartButtonComponent;
