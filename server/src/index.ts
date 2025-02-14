import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { EventEmitter } from 'node:events'
import { streamSSE } from 'hono/streaming'

import type { Ingredient, Ingredients } from './types'

const eventEmitter = new EventEmitter()
const app = new Hono()


const store = {
  ingredients: {
    basil: 0,
    mushroom: 0,
    olive: 0,
    pineapple: 0,
    tomato: 0,
    cheese: 0,
  },
  votes: 0,
  getAverage: function () {
    return Object.entries(this.ingredients).reduce((acc, [ingredient, value]) => {
      const averageValue = isNaN(value / this.votes) ? 0 : Math.floor(value / this.votes)
      return { ...acc, [ingredient]: averageValue }
    }, {})
  }
}

app.use(cors({
  origin: '*'
}))

app.use('/votes/*', async (c, next) => {
  c.header('Content-Type', 'text/event-stream');
  c.header('Cache-Control', 'no-cache');
  c.header('Connection', 'keep-alive');

  return await next();
});

app.get('/votes', async (c) => {
  return streamSSE(c, async (stream) => {
    const sendEventToClient = async () => {
      await stream.writeSSE({ data: JSON.stringify({ results: store.getAverage() }) });
    };

    eventEmitter.on("votesUpdated", sendEventToClient);

    stream.writeSSE({ data: JSON.stringify({ results: store.getAverage() }) });

    stream.onAbort(() => {
      eventEmitter.off("message", sendEventToClient);
    });

    while (true) {
      await stream.sleep(200);
    }
  })
})

app.post('/vote', async (c) => {
  const voteData: Ingredients = await c.req.json()

  for (const ingredient in voteData) {
    store.ingredients[ingredient as Ingredient] += voteData[ingredient as Ingredient]
  }

  store.votes++

  eventEmitter.emit("votesUpdated");

  return c.json({ status: 201 })
})

serve({
  fetch: app.fetch,
  port: 3000
})