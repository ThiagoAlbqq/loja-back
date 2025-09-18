import { z } from 'zod'

export const ReqCreateUserDTO = z.object({
  email: z.string().email({ message: 'O campo email é obrigatorio' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter no minimo 6 caracteres' }),
})

export type ReqCreateUserDTOType = z.infer<typeof ReqCreateUserDTO>
