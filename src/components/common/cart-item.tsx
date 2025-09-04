import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-product-to-cart";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCents } from "@/helpers/money";

import { decreaseProductFromCart } from "../../actions/decrease-product-quantity/index";
import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  imageUrl: string;
  productVariantTotalPriceInCents: number;
  quantity: number;
  productVariantId: string;
}

const CartItemComponent = ({
  id,
  imageUrl,
  productVariantId,
  productName,
  productVariantName,
  productVariantTotalPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseCartProductMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const increaseCartProductMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.error("Erro ao deletar produto do carrinho");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductMutation.mutate(undefined);
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductMutation.mutate();
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">{productName}</p>
          <p className="text-xs font-medium text-muted-foreground">
            {productVariantName}
          </p>
          <div className="flex items-center p-1 border justify-between w-[100px] rounded-lg">
            <Button
              className="h-4 w-4"
              variant={"ghost"}
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>

            <p className="text-xs">{quantity}</p>

            <Button
              className="h-4 w-4"
              variant={"ghost"}
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end gap-2 ">
        <Button variant={"outline"} size={"icon"} onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCents(productVariantTotalPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItemComponent;
