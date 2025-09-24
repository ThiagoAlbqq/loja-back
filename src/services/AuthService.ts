import { prisma } from '../database/prisma.config'
import bcrypt from 'bcryptjs'
import { ReqLoginDTOType } from '../models/dtos/auth/LoginDTO'

export class AuthService {
  async validateUser(credentials: ReqLoginDTOType) {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    if (!user) {
      throw new Error('Credenciais inválidas.')
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    )

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas.')
    }

    // Retorna o usuário sem a senha
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
