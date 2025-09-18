import z from 'zod'

export const ReplyProdutoDTO = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  valor: z.number(),
})

export const ReplyProdutoDTOArray = z.array(ReplyProdutoDTO)

export type ReplyProdutoDTOType = z.infer<typeof ReplyProdutoDTO>
export type ReplyProdutoDTOArrayType = z.infer<typeof ReplyProdutoDTOArray>
