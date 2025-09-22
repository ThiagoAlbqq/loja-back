import { Prisma } from "@prisma/client"
import { prisma } from "../database/prisma.config"
import { ReqDeleteEnderecoDTOType } from "../models/dtos/endereco/DeleteEnderecoDTO"
import { ReqCreateEnderecoDTOtype } from "../models/dtos/endereco/CreateEnderecoDTO"

export class EnderecoService {
  async getAll() {
    try {
      const data = await prisma.endereco.findMany()
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

    async create(endereco: ReqCreateEnderecoDTOtype) {
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

      async delete(id: ReqDeleteEnderecoDTOType) {
        try {
          // Deleta o endereco
          const data = await prisma.endereco.delete({where: {...id}})
          // Retorna o endereco deletado
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