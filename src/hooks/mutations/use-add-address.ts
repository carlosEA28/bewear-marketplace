import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addAddress } from "@/actions/add-address";

export const getAddAddressMutationKey = () => ["add-address"] as const;

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getAddAddressMutationKey(),
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Endereço adicionado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
