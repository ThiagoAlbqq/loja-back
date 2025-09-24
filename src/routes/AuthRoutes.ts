import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/AuthController'

export class AuthRoutes {
  private app: FastifyInstance
  private controller: AuthController

  constructor(app: FastifyInstance) {
    this.app = app
    // Passamos o `app` para o controller ter acesso ao `app.jwt`
    this.controller = new AuthController(app)
    this.registerRoutes()
  }

  private registerRoutes() {
    this.app.post('/login', this.controller.login)
  }
}
