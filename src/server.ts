import Fastify from 'fastify'
import { ProdutoRoutes } from './routes/ProdutoRoutes'
import { UserRoutes } from './routes/UserRoutes'

const app = Fastify({
  logger: false,
})

new ProdutoRoutes(app)
new UserRoutes(app)

app.get('/', async () => {
  return { message: 'Hello Fastify + TS + Prisma!' }
})

const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('🚀 Server running on http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
