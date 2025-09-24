// src/handlers/authHandler.ts
import { FastifyReply, FastifyRequest } from 'fastify'

// Este é o nosso "middleware" de proteção
export async function protect(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (err) {
    reply.code(401).send({ success: false, message: 'Não autorizado.' })
  }
}
