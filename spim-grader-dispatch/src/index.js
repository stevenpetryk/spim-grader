const PORT = process.env.PORT || 8000;

const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const nodeCleanup = require('node-cleanup')

const Connection = require('./Connection')

const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const connections = []

wss.on('connection', (ws, req) => {
  const connection = new Connection(ws)
  connection.start()
  connections.push(connection)

  connection.on('containerKilled', () => {
    const thisIndex = connections.indexOf(connection)
    connections.splice(thisIndex, 1)
  })
})

server.listen(PORT, () => {
  console.log('Listening on %d', server.address().port)
})

nodeCleanup((exitCode, signal) => {
  console.log('Killing %d remaining containers...', connections.length)
  connections.forEach((connection) => connection.killContainer())
})
