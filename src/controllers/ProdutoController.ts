import { FastifyReply, FastifyRequest } from 'fastify'
import { ProdutoService } from '../services/ProdutoService'
import {
  ReqCreateProdutoDTO,
  ReqCreateProdutoDTOType,
} from '../models/dtos/produto/CreateProdutoDTO'
import {
  ReplyProdutoDTO,
  ReplyProdutoDTOArray,
} from '../models/dtos/produto/ReplyProdutoDTO'
import { ZodError } from 'zod'
import {
  ReqUpdateProdutoDTO,
  ReqUpdateProdutoDTOType,
} from '../models/dtos/produto/UpdateProdutoDTO'
import {
  ReqDeleteProdutoDTO,
  ReqDeleteProdutoDTOType,
} from '../models/dtos/produto/DeleteProdutoDTO'

export class ProdutoController {
  private service: ProdutoService

  constructor() {
    this.service = new ProdutoService()
  }

  getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await this.service.getAll()
      return reply.status(200).send({
        success: true,
        data: ReplyProdutoDTOArray.parse(data),
      })
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }

  post = async (
    req: FastifyRequest<{ Body: ReqCreateProdutoDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqCreateProdutoDTO.parse(req.body)
      const data = await this.service.create(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyProdutoDTO.parse(data),
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos.',
          errors: error.flatten().fieldErrors,
        })
      }
      return reply.status(500).send({
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }

  update = async (
    req: FastifyRequest<{ Body: ReqUpdateProdutoDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqUpdateProdutoDTO.parse(req.body)
      const data = await this.service.put(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyProdutoDTO.parse(data),
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos.',
          errors: error.flatten().fieldErrors,
        })
      }
      return reply.status(500).send({
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }

  delete = async (
    req: FastifyRequest<{ Body: ReqDeleteProdutoDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqDeleteProdutoDTO.parse(req.body)
      const data = await this.service.delete(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyProdutoDTO.parse(data),
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos.',
          errors: error.flatten().fieldErrors,
        })
      }
      return reply.status(500).send({
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }
}
