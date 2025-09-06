import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import {
  getCartQueryKey,
  getUpdateCartShippingAddressMutationKey,
} from "@/lib/query-keys";

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: updateCartShippingAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCartQueryKey(),
      });
    },
  });
};
