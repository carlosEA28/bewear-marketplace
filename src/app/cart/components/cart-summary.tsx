import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCents } from "@/helpers/money";

interface CartSummaryProps {
  subTotalInCents: number;
  totalInCents: number;
  product: Array<{
    id: string;
    productName: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummaryComponent = ({
  subTotalInCents,
  totalInCents,
  product,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-sm font-semibold">
            {formatCents(subTotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Transporte e Manuseio</p>
          <p className="text-sm font-semibold">GRÁTIS</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Taxa Estimada</p>
          <p className="text-sm font-semibold">-</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-sm font-semibold">{formatCents(totalInCents)}</p>
        </div>

        <div className="py-3">
          <Separator />
        </div>
        <div className="flex flex-col gap-4">
          {product.map((productItem) => (
            <div
              className="flex items-center justify-between"
              key={productItem.id}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={productItem.imageUrl}
                  alt={productItem.variantName}
                  width={78}
                  height={78}
                  className="rounded-lg"
                />

                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold">
                    {productItem.productName}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {productItem.variantName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {productItem.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-2 ">
                <p className="text-sm font-bold">
                  {formatCents(productItem.priceInCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummaryComponent;
