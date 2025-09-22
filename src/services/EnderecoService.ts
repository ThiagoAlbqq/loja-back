import { Prisma } from "@prisma/client"
import { prisma } from "../database/prisma.config"
import { ReqCreateEnderecoDTOype } from "../models/dtos/endereco/CreateEnderecoDTO"

export class EnderecoService {

    async create(endereco: ReqCreateEnderecoDTOype) {
        try {
        //criando o endereco
          const data = await prisma.endereco.create({
            data: {
              ...endereco
            },
          })
          return data
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error(
              `Error at update user: Prisma error code ${error.code} - ${error.message}`
            )
          }
          throw new Error(
            `Error at update user: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          )
        }
      }

}