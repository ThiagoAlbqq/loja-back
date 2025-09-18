import { prisma } from '../database/prisma.config'
import bcrypt from 'bcryptjs'
import { ReqCreateUserDTOType } from '../models/dtos/user/CreateUserDTO'
import { ReqUpdateUserDTOType } from '../models/dtos/user/UpdateUserDTO'
import { Prisma } from '@prisma/client'
import { ReqDeleteUserDTOType } from '../models/dtos/user/DeleteUserDTO'

export class UserService {
  async getAll() {
    try {
      const data = await prisma.user.findMany()
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

  async getByIdOrEmail(id?: string, email?: string) {
    try {
      const data = await prisma.user.findFirst({
        where: {
          OR: [id ? { id } : undefined, email ? { email } : undefined].filter(
            Boolean
          ) as any[],
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

  async create(user: ReqCreateUserDTOType) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const data = await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          Carrinhos: {
            create: {},
          },
        },
        include: {
          Carrinhos: true,
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

  async put(user: ReqUpdateUserDTOType) {
    try {
      if (user.email) {
        const isNotUniqueEmail = await prisma.user.findFirst({
          where: {
            email: user.email,
            NOT: { id: user.id },
          },
        })

        if (isNotUniqueEmail) {
          throw new Error('Email already exists!')
        }
      }

      const data = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(user.email && { email: user.email }),
          ...(user.password && {
            password: await bcrypt.hash(user.password, 10),
          }),
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

  async delete(user: ReqDeleteUserDTOType) {
    try {
      const data = await prisma.user.delete({
        where: {
          id: user.id,
          email: user.email,
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
