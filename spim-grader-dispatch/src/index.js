const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const Connection = require('./Connection')

const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws, req) => {
  new Connection(ws).start()
})

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port)
})
