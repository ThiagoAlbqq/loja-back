import z from 'zod'

export const ReplyUserDTO = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

export const ReplyUserDTOArray = z.array(ReplyUserDTO)

export type ReplyUserDTOType = z.infer<typeof ReplyUserDTO>
export type ReplyUserDTOArrayType = z.infer<typeof ReplyUserDTOArray>
