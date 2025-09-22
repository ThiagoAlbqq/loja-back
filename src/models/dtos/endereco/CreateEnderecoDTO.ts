import { z } from 'zod'

// Validador
export const ReqCreateEnderecoDTO = z.object({
  cep: z.string({ message: 'O cep é obrigatorio' }),
  rua: z.string({ message: 'A rua é obrigatoria' }),
  numCasa: z.string({ message: 'O numero da casa é obrigatorio' }),
  complemento: z.string({ message: 'O complemento é obrigatorio' }),
})

// Criando o tipo
export type ReqCreateEnderecoDTOype = z.infer<typeof ReqCreateEnderecoDTO>
