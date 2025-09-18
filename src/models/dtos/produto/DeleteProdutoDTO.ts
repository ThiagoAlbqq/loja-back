import z from 'zod'

export const ReqDeleteProdutoDTO = z.object({
  id: z
    .string({ message: 'O id é obrigatorio' })
    .uuid({ message: 'O id tem que ser no formato UUID' })
    .optional(),
})

export type ReqDeleteProdutoDTOType = z.infer<typeof ReqDeleteProdutoDTO>
