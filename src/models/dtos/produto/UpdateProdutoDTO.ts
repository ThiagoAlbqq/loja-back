import z from 'zod'

export const ReqUpdateProdutoDTO = z.object({
  id: z
    .string({ message: 'O id é obrigatorio' })
    .uuid({ message: 'O id tem que ser no formato UUID' }),
  nome: z.string({ message: 'O nome deve ser uma string' }).optional(),
  valor: z.number({ message: 'O valor deve ser um numero' }).optional(),
})

export type ReqUpdateProdutoDTOType = z.infer<typeof ReqUpdateProdutoDTO>
