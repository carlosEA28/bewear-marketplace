import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCents } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  imageUrl: string;
  productVariantTotalPriceInCents: number;
  quantity: number;
}

const CartItemComponent = ({
  id,
  imageUrl,
  productName,
  productVariantName,
  productVariantTotalPriceInCents,
  quantity,
}: CartItemProps) => {
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
            <Button className="h-4 w-4" variant={"ghost"} onClick={() => {}}>
              <MinusIcon />
            </Button>

            <p className="text-xs">{quantity}</p>

            <Button className="h-4 w-4" variant={"ghost"} onClick={() => {}}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end gap-2 ">
        <Button variant={"outline"} size={"icon"}>
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
