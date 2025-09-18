import { prisma } from '../database/prisma.config'
import { Prisma } from '@prisma/client'

import { ReqCreateProdutoDTOType } from '../models/dtos/produto/CreateProdutoDTO'
import { ReqUpdateProdutoDTOType } from '../models/dtos/produto/UpdateProdutoDTO'
import { ReqDeleteProdutoDTOType } from '../models/dtos/produto/DeleteProdutoDTO'

export class ProdutoService {
  async getAll() {
    try {
      const data = await prisma.produtos.findMany()
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

  async create(produto: ReqCreateProdutoDTOType) {
    try {
      const data = await prisma.produtos.create({
        data: {
          nome: produto.nome,
          valor: produto.valor,
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

  async put(produto: ReqUpdateProdutoDTOType) {
    try {
      const data = await prisma.produtos.update({
        where: { id: produto.id },
        data: {
          ...(produto.nome && { nome: produto.nome }),
          ...(produto.valor && { valor: produto.valor }),
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

  async delete(user: ReqDeleteProdutoDTOType) {
    try {
      const data = await prisma.produtos.delete({
        where: {
          id: user.id,
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
