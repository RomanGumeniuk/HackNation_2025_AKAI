import { useEffect, useRef } from 'react';
import { Message } from './types';

export function useWebSocket(
    isChatOpen: boolean,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (isChatOpen && !socketRef.current) {
            const ws = new WebSocket("ws://localhost:8080");
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
