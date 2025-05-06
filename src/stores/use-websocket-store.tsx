import { create } from 'zustand'

type WebSocketStore = {
  socket: WebSocket | null
  connect: () => void
  disconnect: () => void
  send: (data: any) => void
  setOnMessage: (callback: (event: MessageEvent) => void) => void
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,

  connect: () => {
    if (get().socket) return // Already connected

    const socket = new WebSocket('ws://localhost:8090/ws')

    socket.onopen = () => {
      console.log('WebSocket connected')
      const token = sessionStorage.getItem('access_token')
      socket.send(JSON.stringify({ event: 'auth', token }))
    }

    socket.onclose = () => {
      console.log('WebSocket closed')
      set({ socket: null })
    }

    socket.onerror = (err) => {
      console.error('WebSocket error:', err)
    }

    set({ socket })
  },

  disconnect: () => {
    const socket = get().socket
    if (socket) {
      socket.close()
      set({ socket: null })
    }
  },

  send: (data: any) => {
    const socket = get().socket
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket is not open. Cannot send:', data)
    }
  },

  setOnMessage: (callback) => {
    const socket = get().socket
    if (socket) {
      socket.onmessage = callback
    } else {
      console.warn('WebSocket not initialized yet')
    }
  },
}))
