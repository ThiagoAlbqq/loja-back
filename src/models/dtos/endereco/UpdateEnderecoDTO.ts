import z from 'zod'

export const ReqUpdateEnderecoDTO = z.object({
  id: z
    .string({ message: 'O id é obrigatorio' })
    .uuid({ message: 'O id tem que ser no formato UUID' }),
  cep: z.string({ message: 'O cep deve ser uma string' }).optional(),
  rua: z.string({ message: 'A rua deve ser uma string' }).optional(),
  numCasa: z
    .string({ message: 'O numero da casa deve ser uma string' })
    .optional(),
  complemento: z
    .string({ message: 'O complemento deve ser uma string' })
    .optional(),
})

export type ReqUpdateEnderecoDTOType = z.infer<typeof ReqUpdateEnderecoDTO>
