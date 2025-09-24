import { z } from 'zod'

export const ReqLoginDTO = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type ReqLoginDTOType = z.infer<typeof ReqLoginDTO>
