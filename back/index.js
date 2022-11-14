import express from 'express'
import http from 'http'
import {WebSocketServer} from "ws";
import MessageResponder from "./message-responder/MessageResponder.js";
import KVIZService from "./services/kviz.js";

const PORT = process.env.PORT || 9001

const app = express()
const server = http.createServer(app)
const webSocketServer = new WebSocketServer({ server })

const messageResponder = new MessageResponder()
messageResponder.addService(KVIZService)

webSocketServer.on('connection', ws => {
    ws.on('message', message => messageResponder.response(message, ws))
})

server.listen(PORT, () => {
    console.log(`SERVER STARTING ON PORT ${PORT}`)
})
