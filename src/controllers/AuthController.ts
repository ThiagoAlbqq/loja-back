// src/controllers/AuthController.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/AuthService'
import { ReqLoginDTO, ReqLoginDTOType } from '../models/dtos/auth/LoginDTO'
import { ZodError } from 'zod'

export class AuthController {
  private service: AuthService
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.service = new AuthService()
    this.app = app
  }

  login = async (
    req: FastifyRequest<{ Body: ReqLoginDTOType }>,
    reply: FastifyReply
  ) => {
    try {
      const validatedData = ReqLoginDTO.parse(req.body)
      const user = await this.service.validateUser(validatedData)
      const userRoles = ['USER']

      const token = this.app.jwt.sign(
        {
          id: user.id,
          email: user.email,
          roles: userRoles,
        },
        {
          expiresIn: '7d',
        }
      )

      return reply.status(200).send({
        success: true,
        token,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          success: false,
          message: 'Dados inválidos.',
          errors: error.flatten().fieldErrors,
        })
      }
      if (error instanceof Error && error.message.includes('Credenciais')) {
        return reply.status(401).send({
          success: false,
          message: error.message,
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
