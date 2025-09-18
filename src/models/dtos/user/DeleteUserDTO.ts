import z from 'zod'

export const ReqDeleteUserDTO = z.object({
  id: z
    .string({ message: 'O id é obrigatorio' })
    .uuid({ message: 'O id tem que ser no formato UUID' })
    .optional(),
  email: z
    .string()
    .email({ message: 'O campo email deve ser um email' })
    .optional(),
})

export type ReqDeleteUserDTOType = z.infer<typeof ReqDeleteUserDTO>
