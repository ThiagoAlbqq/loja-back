import { z } from 'zod'

export const ReqCreateProdutoDTO = z.object({
  nome: z.string({ message: 'O nome é obrigatorio' }),
  valor: z.number({ message: 'O valor é obrigatorio' }),
})

export type ReqCreateProdutoDTOType = z.infer<typeof ReqCreateProdutoDTO>
