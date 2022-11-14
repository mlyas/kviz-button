import { encodeMessage } from "./utils.js";

export default class MessageResponder {
    constructor() {
        this._handlers = {}
    }
    addMethodHandler(method, handler) {
        if (method in this._handlers) throw new Error(`Обработчик метода "${method}" уже существует`)
        this._handlers[method] = handler
    }

    addService(service) {
        for (const key in service) {
            this.addMethodHandler(key, service[key])
        }
    }

    response(message, ws) {
        const encMessage = JSON.parse(encodeMessage(message))
        const { type, payload } = encMessage

        if (type === 'trigger') MessageResponder.triggerEvent(payload, ws)
        else if (type === 'request') this.responseRequest(payload, ws)
    }
    static triggerEvent(event, ws) {
        ws.send(JSON.stringify({type: 'event', payload: event }))
    }

    static getTrigger(ws) {
        return event => MessageResponder.triggerEvent(event, ws)
    }

    async responseRequest(payload, ws) {
        const { method, params, uuid } = payload

        if (!this._handlers[method]) return

        try {
            const data = await this._handlers[method](params, MessageResponder.getTrigger(ws))
            ws.send(JSON.stringify({ type: 'answer', payload: { method, uuid, data } }))
        } catch (err) {
            console.log(err)
            ws.send(JSON.stringify({ type: 'error', payload: err }))
        }

    }
}
