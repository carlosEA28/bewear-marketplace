"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddresses } from "@/hooks/queries/use-addresses";

import { AddAddressForm } from "./add-address-form";

const AddressesComponent = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data: addresses, isLoading } = useAddresses();

  if (isLoading) {
    return <div>Carregando endereços...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
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
      </CardContent>
    </Card>
  );
};

export default AddressesComponent;
