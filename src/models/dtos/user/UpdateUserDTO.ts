import z from 'zod'

export const ReqUpdateUserDTO = z.object({
  id: z
    .string({ message: 'O id é obrigatorio' })
    .uuid({ message: 'O id tem que ser no formato UUID' }),
  email: z
    .string()
    .email({ message: 'O campo email deve ser um email' })
    .optional(),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter no minimo 6 caracteres' })
    .optional(),
})

export type ReqUpdateUserDTOType = z.infer<typeof ReqUpdateUserDTO>
