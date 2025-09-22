import z from 'zod'

// Mascara de retorno
export const ReplyEnderecoDTO = z.object({
  id: z.string().uuid(),
  cep: z.string(),
    rua: z.string(),
    numCasa: z.string(),
    complemento: z.string(),
})

// Esse retorno com um ARRAY
export const ReplyEnderecoDTOArray = z.array(ReplyEnderecoDTO)

// Tipos
export type ReplyEnderecoDTOType = z.infer<typeof ReplyEnderecoDTO>
export type ReplyEnderecoDTOArrayType = z.infer<typeof ReplyEnderecoDTOArray>
