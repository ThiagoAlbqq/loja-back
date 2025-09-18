import { FastifyInstance } from 'fastify'
import { ProdutoController } from '../controllers/ProdutoController'

export class ProdutoRoutes {
  private app: FastifyInstance
  private controller: ProdutoController

  constructor(app: FastifyInstance) {
    this.app = app
    this.controller = new ProdutoController()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.app.post('/produto', this.controller.post)
    this.app.get('/produto', this.controller.getAll)
    this.app.put('/produto', this.controller.update)
    this.app.delete('/produto', this.controller.delete)
  }
}
