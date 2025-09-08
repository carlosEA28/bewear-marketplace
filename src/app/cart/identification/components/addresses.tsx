"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useAddresses } from "@/hooks/queries/use-addresses";
import { useCart } from "@/hooks/queries/useCard";

import { AddAddressForm } from "./add-address-form";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
}
const AddressesComponent = ({ shippingAddresses }: AddressesProps) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses } = useAddresses({
    initialData: shippingAddresses,
  });
  const { data: cart } = useCart();
  const { mutate: updateCartShippingAddress, isPending } =
    useUpdateCartShippingAddress();

  const handleUpdateCartShippingAddress = (shippingAddressId: string) => {
    if (!cart?.id) {
      toast.error("Erro", { description: "Carrinho não encontrado." });
      return;
    }

    updateCartShippingAddress(
      { cartId: cart.id, shippingAddressId },
      {
        onSuccess: () => {
          toast.success("Sucesso", {
            description: "Endereço de entrega atualizado.",
          });

          router.push("/cart/confirmation");
        },
        onError: (error) => {
          toast.error("Erro", { description: error.message });
        },
      }
    );
  };

  useEffect(() => {
    if (cart?.shippingAddress?.id) {
      setSelectedAddress(cart.shippingAddress.id);
    }
  }, [cart]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAddress}
          onValueChange={(value) => {
            setSelectedAddress(value);
          }}
        >
          {addresses?.map((address) => (
            <Card key={address.id} className="mb-4">
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label htmlFor={address.id}>
                    {`${address.recipientName}, ${address.street}, ${address.number}`}
                    {address.complement && `, ${address.complement}`}
                    {`, ${address.neighborhood}, ${address.city} - ${address.state}`}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <div className="py-5">
            <AddAddressForm />
          </div>
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="pt-5">
            <Button
              onClick={() => handleUpdateCartShippingAddress(selectedAddress)}
              disabled={isPending}
              className="w-full"
            >
              Ir para pagamento
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressesComponent;
