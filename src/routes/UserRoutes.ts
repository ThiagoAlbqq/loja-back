import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/UserController'

export class UserRoutes {
  private app: FastifyInstance
  private controller: UserController

  constructor(app: FastifyInstance) {
    this.app = app
    this.controller = new UserController()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.app.post('/users', this.controller.post)
    this.app.get('/users', this.controller.getAll)
    this.app.put('/users', this.controller.update)
    this.app.delete('/users', this.controller.delete)
  }
}
