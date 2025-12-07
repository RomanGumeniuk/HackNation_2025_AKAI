import { useEffect, useRef } from 'react';
import { Message } from './types';

// Get WebSocket URL from environment variable
const getWebSocketUrl = () => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";
    // Convert HTTP URL to WebSocket URL
    return socketUrl.replace(/^http/, 'ws');
};

export function useWebSocket(
    isChatOpen: boolean,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (isChatOpen && !socketRef.current) {
            const wsUrl = getWebSocketUrl();
            const ws = new WebSocket(wsUrl);
            ws.onopen = () => console.log("Connected to Chatbot Server");
            ws.onmessage = (event) => {
                setMessages((prev) => [...prev, { role: 'bot', content: event.data }]);
            };
            ws.onerror = (error) => console.error("WebSocket error:", error);
            ws.onclose = () => console.log("Disconnected from Chatbot Server");
            socketRef.current = ws;
        }

        return () => {
            if (!isChatOpen && socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [isChatOpen, setMessages]);

    return socketRef;
}
