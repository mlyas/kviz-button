export function encodeMessage(message) {
    return message?.byteLength ? new TextDecoder().decode(message) : message
}
