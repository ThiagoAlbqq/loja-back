import { FastifyInstance } from 'fastify'
import { EnderecoController } from '../controllers/EnderecoController'

export class EnderecoRoutes {
  private app: FastifyInstance
  private controller: EnderecoController

  constructor(app: FastifyInstance) {
    this.app = app
    this.controller = new EnderecoController()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.app.post('/endereco', this.controller.post)
    this.app.get('/endereco', this.controller.getAll)
    this.app.put('/endereco', this.controller.update)
    this.app.delete('/endereco', this.controller.delete)
  }
}
