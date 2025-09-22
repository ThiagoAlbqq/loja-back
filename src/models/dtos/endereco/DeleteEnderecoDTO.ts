import z from "zod";

export const ReqDeleteEnderecoDTO = z.object({
    id: z.string({message: "O campo id é obrigatorio"}).uuid({message: "O formato deve ser um UUID"})
})

export type ReqDeleteEnderecoDTOType = z.infer<typeof ReqDeleteEnderecoDTO>