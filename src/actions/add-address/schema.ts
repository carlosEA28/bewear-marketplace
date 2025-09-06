import { z } from "zod";

export const addAddressSchema = z.object({
  email: z.string().email("Email inválido.").min(1, "Email é obrigatório."),
  fullName: z.string().min(1, "Nome completo é obrigatório."),
  cpf: z.string().min(1, "CPF é obrigatório."),
  phone: z.string().min(1, "Celular é obrigatório."),
  zipCode: z.string().min(1, "CEP é obrigatório."),
  address: z.string().min(1, "Endereço é obrigatório."),
  number: z.string().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatória."),
  state: z.string().min(1, "Estado é obrigatório."),
});
