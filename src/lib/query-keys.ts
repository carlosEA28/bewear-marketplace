export const getCartQueryKey = () => ["cart"];
export const getCartProductsByCartIdQueryKey = (cartId: string) => [
  "use-find-cart-products-by-cart-id",
  cartId,
];

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];

export const getUpdateCartShippingAddressQueryKey = () => [
  "update-cart-shipping-address",
];
