/*
 * @Author: oneWafer
 * @Date: 2023-01-18 11:35:09
 * @LastEditors: zhencheng.hu
 * @LastEditTime: 2023-12-26 15:35:08
 * @Description: file content
 */
import io from './socket.io'
import { useState, useEffect } from 'react'

const sockets = {}

const close = (socket, url) => {
    socket?.removeAllListeners()
    socket?.close()
    delete sockets?.url
}

export const useSocket = (url, event_key, data) => {
    const { protocol, hostname, port } = window?.location || {},
        [last_message, setLatestMessage] = useState(void 0),
        token = localStorage.getItem('web_token'),
        res_url = hostname === 'localhost' ? `http://172.16.20.181:19102/${url}` : `${protocol}//${hostname}:${port}/${url}`

    useEffect(() => {
        if (!token) return
        const socket = sockets?.url ? sockets?.url : io(res_url)
        if (!sockets?.url) {
            socket?.on(event_key, msg => setLatestMessage(msg?.data))
            sockets[url] = socket
            socket.emit('auth', {
                token: token
            })
        }

        return () => {
            if (!!socket) close(socket, url)
        }
    }, [url])

    return [last_message]
}

export const clearSocket = () => {
    const urls = Object.keys(sockets)
    urls.forEach(url => {
        const socket = sockets?.[url]
        if (!!socket) close(socket, url)
    })
}

export const sendRequest = (url, request, name) => {
    const socket = sockets?.[url]
    if (!!socket) socket.emit(name ? name : 'message', request)
}
