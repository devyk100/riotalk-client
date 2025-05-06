import { useEffect, useRef } from "react";

export default function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8090/ws");
    ws.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      const token = sessionStorage.getItem("access_token");
      socket.send(JSON.stringify({
        event: "auth",
        token,
      }));
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  return ws;
}
