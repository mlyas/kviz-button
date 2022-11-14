import { UUID_LOCAL_STORAGE_KEY } from "@/libs/constants";
import { v4 } from "uuid";

export function request(ws, uuid, method, params) {
    ws.send(JSON.stringify({ type: 'request', payload: { uuid, method, params } }))
}

export function getUuid() {
    let uuid = localStorage.getItem(UUID_LOCAL_STORAGE_KEY)
    if (!uuid) {
        uuid = v4()
        localStorage.setItem(UUID_LOCAL_STORAGE_KEY, uuid)
    }
    return uuid
}

export function getTeamTitle() {
    return localStorage.getItem('teamTitle') || ''
}

export function saveTeamTitle(teamTitle) {
    localStorage.setItem('teamTitle', teamTitle)
}
