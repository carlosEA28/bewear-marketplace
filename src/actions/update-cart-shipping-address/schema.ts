import { z } from "zod";

export const updateCartShippingAddressSchema = z.object({
  cartId: z.string().uuid(),
  shippingAddressId: z.string().uuid(),
});

export type UpdateCartShippingAddressSchema = z.infer<
  typeof updateCartShippingAddressSchema
>;
