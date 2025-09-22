import { FastifyInstance } from "fastify"

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
    }

}