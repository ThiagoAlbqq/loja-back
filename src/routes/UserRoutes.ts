import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/UserController'
import { protect } from '../handlers/authHandler'
import { authorize } from '../handlers/authorizartionHandler'
import { MANAGEMENT_ROLES } from '../models/enums/PerfilEnum'

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
    this.app.get(
      '/users',
      {
        preHandler: [protect, authorize(MANAGEMENT_ROLES)],
      },
      this.controller.getAll
    )
    this.app.put('/users', this.controller.update)
    this.app.delete('/users', this.controller.delete)
  }
}
