import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/UserService'
import {
  ReqCreateUserDTO,
  ReqCreateUserDTOType,
} from '../models/dtos/user/CreateUserDTO'
import { ZodError } from 'zod'
import {
  ReqUpdateUserDTO,
  ReqUpdateUserDTOType,
} from '../models/dtos/user/UpdateUserDTO'
import {
  ReqDeleteUserDTO,
  ReqDeleteUserDTOType,
} from '../models/dtos/user/DeleteUserDTO'
import {
  ReplyUserDTO,
  ReplyUserDTOArray,
} from '../models/dtos/user/ReplyUserDTO'

export class UserController {
  private service: UserService

  constructor() {
    this.service = new UserService()
  }

  getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await this.service.getAll()
      return reply.status(200).send({
        success: true,
        data: ReplyUserDTOArray.parse(data),
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
    req: FastifyRequest<{ Body: ReqCreateUserDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqCreateUserDTO.parse(req.body)
      const data = await this.service.create(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyUserDTO.parse(data),
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
    req: FastifyRequest<{ Body: ReqUpdateUserDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqUpdateUserDTO.parse(req.body)
      const data = await this.service.put(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyUserDTO.parse(data),
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
    req: FastifyRequest<{ Body: ReqDeleteUserDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqDeleteUserDTO.parse(req.body)
      const data = await this.service.delete(validatedData)
      return reply.status(200).send({
        success: true,
        data: ReplyUserDTO.parse(data),
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
