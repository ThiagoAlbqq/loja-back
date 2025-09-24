// src/handlers/authorizationHandler.ts
import { FastifyReply, FastifyRequest } from 'fastify'

// Tipagem para o nosso usuário que vem do token
interface AuthenticatedUser {
  id: string
  email: string
  roles: string[] // O payload do token agora tem as roles
  iat: number
  exp: number
}

/**
 * Factory Function que cria um preHandler para verificar as roles do usuário.
 * @param allowedRoles - Um array de strings com as roles permitidas para a rota.
 */
export function authorize(allowedRoles: string[]) {
  // A função retornada é o nosso preHandler
  return async (req: FastifyRequest, reply: FastifyReply) => {
    // O handler `protect` já deve ter sido executado, então `req.user` deve existir.
    if (!req.user) {
      return reply.code(500).send({ message: 'Erro de autenticação interno.' })
    }

    const user = req.user as AuthenticatedUser
    const userRoles = user.roles || []
    console.log(userRoles)

    // Verifica se o usuário tem pelo menos uma das roles permitidas.
    const hasPermission = userRoles.some((role) => allowedRoles.includes(role))

    if (!hasPermission) {
      // O usuário está autenticado, mas não tem permissão. O código correto é 403 Forbidden.
      return reply.code(403).send({
        success: false,
        message: 'Acesso negado. Você não tem permissão para este recurso.',
      })
    }

    // Se chegou até aqui, o usuário tem permissão e a requisição pode continuar.
  }
}
