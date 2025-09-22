import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod";
import { ReqCreateEnderecoDTO, ReqCreateEnderecoDTOype } from "../models/dtos/endereco/CreateEnderecoDTO";
import { ReplyEnderecoDTO } from "../models/dtos/endereco/ReplyEnderecoDTO";

export class EnderecoController {

    private service: EnderecoService
    
    constructor() {
        this.service = new EnderecoService()
    }

    create = async (req: FastifyRequest<{Body: ReqCreateEnderecoDTOype}>, reply: FastifyReply) => {
        try {
            // Valida os dados recebidos
            const validatedData = ReqCreateEnderecoDTO.parse(req.body)
            // Tenta criar o endereco
            const data = await this.service.create(validatedData)
            // Se der certo, retorna status 200 e os dados do endereco criado
            return reply.status(200).send({
            success: true,
            data: ReplyEnderecoDTO.parse(data),
            })
        } catch (error) {
            // DEU ERRO - NA HORA DE VALIDAR
            if (error instanceof ZodError) {
                // Retornar sucess false e status 400, além dos dados invalidos
                return reply.status(400).send({
                    success: false,
                    message: 'Dados inválidos.',
                    errors: error.flatten().fieldErrors,
                })
            }
            // Retorna o erro
            return reply.status(500).send({
            success: false,
            message:
                error instanceof Error ? error.message : 'An unknown error occurred',
            })
        }
    }

}