"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { addAddressSchema } from "./schema";

export async function addAddress(input: z.infer<typeof addAddressSchema>) {
  try {
    const data = addAddressSchema.parse(input);

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const [shippingAddress] = await db
      .insert(shippingAddressTable)
      .values({
        userId: session.user.id,
        recipientName: data.fullName,
        street: data.address,
        number: data.number,
        complement: data.complement || null,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        zipCode: data.zipCode,
        country: "Brasil",
        phone: data.phone,
        email: data.email,
        cpfOrCnpj: data.cpf,
      })
      .returning();

    revalidatePath("/cart/identification");

    return shippingAddress;
  } catch (error) {
    console.error("Erro ao adicionar endereço:", error);
    return {
      success: false,
      message: "Erro ao adicionar endereço.",
    };
  }
}
