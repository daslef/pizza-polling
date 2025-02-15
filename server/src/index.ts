import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { EventEmitter } from 'node:events'
import { streamSSE } from 'hono/streaming'

import type { Ingredient, Ingredients } from './types'

const eventEmitter = new EventEmitter()
const app = new Hono()

interface Store {
  ingredients: Ingredients,
  votes: number,
  getAverage: () => Ingredients
}

// TODO: implement Store 

app.use(cors({
  origin: '*'
}))

app.use('/votes/*', async (c, next) => {
  // TODO: implement text/event-stream without cache keep-alived connection
  return await next();
});

app.get('/votes', async (c) => {
  return streamSSE(c, async (stream) => {
    // TODO: implement sendEvent via writeSSE({ data: ... })

    // TODO: add handler to updates
    // TODO: write initial state

    while (true) {
      await stream.sleep(200);
    }
  })
})

app.post('/vote', async (c) => {
  // TODO: parse incoming data, add to store, increment counter
  // TODO: emit update event

  return c.json({ status: 201 })
})

serve({
  fetch: app.fetch,
  port: 3000
})