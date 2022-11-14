import { request } from "@/libs/utils";
export default class RequestManager {
    constructor(ws, uuid) {
        this._ws = ws;
        this._uuid = uuid;
        this._timeout = 10000; // ms
        this._handlers = {};

        ws.addEventListener('message', this.responseEvent.bind(this))
    }

    request(method, params) {
        return new Promise((resolve, reject) => {
            let timeout;

            const handler = message => {
                const { type, payload } = JSON.parse(message.data)
                if (type === 'answer' && payload.method === method && payload.uuid === this._uuid) {
                    clearTimeout(timeout)
                    resolve(payload)
                    this._ws.removeEventListener('message', handler)
                }
            }
            timeout = setTimeout(() => {
                reject(new Error('timeout'))
                this._ws.removeEventListener('message', handler)
            }, this._timeout)

            request(this._ws, this._uuid, method, params)
            this._ws.addEventListener('message', handler)
        })
    }

    responseEvent(e) {
        const { data } = e
        const { type, payload } = JSON.parse(data)

        if (type !== 'event') return;

        const { event, params } = payload
        if (event in this._handlers) this._handlers[event].forEach(callback => callback(params))
    }

    addEventListener(event, callback) {
        if (event in this._handlers) {
            this._handlers[event].push(callback)
        } else {
            this._handlers[event] = [callback]
        }
    }
}
