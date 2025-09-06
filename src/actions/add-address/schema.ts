import { z } from "zod";

export const addAddressSchema = z.object({
  email: z.string().email("Email inválido.").min(1, "Email é obrigatório."),
  fullName: z.string().min(1, "Nome completo é obrigatório."),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório.")
    .refine((cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf), "CPF inválido."),
  phone: z
    .string()
    .min(1, "Celular é obrigatório.")
    .refine(
      (phone) => /^\(\d{2}\)\s\d{5}-\d{4}$/.test(phone),
      "Celular inválido."
    ),
  zipCode: z
    .string()
    .min(1, "CEP é obrigatório.")
    .refine((zip) => /^\d{5}-\d{3}$/.test(zip), "CEP inválido."),
  address: z.string().min(1, "Endereço é obrigatório."),
  number: z.string().min(1, "Número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório."),
  city: z.string().min(1, "Cidade é obrigatória."),
  state: z.string().min(1, "Estado é obrigatório."),
});
