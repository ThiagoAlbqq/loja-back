import { Prisma } from '@prisma/client'
import { prisma } from '../database/prisma.config'
import { ReqDeleteEnderecoDTOType } from '../models/dtos/endereco/DeleteEnderecoDTO'
import { ReqCreateEnderecoDTOtype } from '../models/dtos/endereco/CreateEnderecoDTO'
import { ReqUpdateEnderecoDTOType } from '../models/dtos/endereco/UpdateEnderecoDTO'

export class EnderecoService {
  async getAll() {
    try {
      const data = await prisma.endereco.findMany()
      return data
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          `Error at update endereco: Prisma error code ${error.code} - ${error.message}`
        )
      }
      throw new Error(
        `Error at update endereco: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  async create(userId: string, endereco: ReqCreateEnderecoDTOtype) {
    try {
      //criando o endereco
      const data = await prisma.endereco.create({
        data: {
          userId,
          ...endereco,
        },
      })
      return data
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          `Error at update endereco: Prisma error code ${error.code} - ${error.message}`
        )
      }
      throw new Error(
        `Error at update endereco: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  async update(id: string, endereco: ReqUpdateEnderecoDTOType) {
    try {
      const data = await prisma.endereco.update({
        where: { id: endereco.id },
        data: {
          ...(endereco.cep && { cep: endereco.cep }),
          ...(endereco.complemento && { complemento: endereco.complemento }),
          ...(endereco.numCasa && { numCasa: endereco.numCasa }),
          ...(endereco.rua && { rua: endereco.numCasa }),
        },
      })

      return data
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          `Error at update endereco: Prisma error code ${error.code} - ${error.message}`
        )
      }
      throw new Error(
        `Error at update endereco: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  async delete(id: ReqDeleteEnderecoDTOType) {
    try {
      // Deleta o endereco
      const data = await prisma.endereco.delete({ where: { ...id } })
      // Retorna o endereco deletado
      return data
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          `Error at update endereco: Prisma error code ${error.code} - ${error.message}`
        )
      }
      throw new Error(
        `Error at update endereco: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }
}
