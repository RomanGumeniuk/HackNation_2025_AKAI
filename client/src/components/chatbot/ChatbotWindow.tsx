"use client"

import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "@/contexts/SocketContext";
import { composeMessage } from "@/socket";

interface IMessage {
  role: "user" | "bot";
  content: string;
}

export default function ChatbotWindow(props: {
  isClosed: boolean;
  closeChatWindow: MouseEventHandler<HTMLDivElement>;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useContext(SocketContext);

  // 1. Initialize WebSocket Connection
  useEffect(() => {
    if (props.isClosed) {
      socket.on("response", (evData) => {
        const data = evData.content;
        const botMsg: IMessage = { role: "bot", content: data };
        setMessages((prev) => [...prev, botMsg]);
      });
    }
  }, [props.isClosed]);

  // 2. Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !socket.connected) return;

    const userMsg: IMessage = { role: "user", content: input };
    const askBody = composeMessage(
      "answer",
      undefined,
      input,
      messages.length == 0 ? true : false
    );
    setMessages((prev) => [...prev, userMsg]);

    socket.emit("query", askBody);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {props.isClosed && (
        // Changed size: Reduced width and height
        <div className="fixed bottom-4 right-4 z-50 w-[300px] h-[400px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* --- Header --- */}
          {/* Changed color: bg-[#394788] */}
          <div className="bg-[#394788] text-white p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full">
                <img
                  src="/bot_gemini_cropped.png"
                  alt="Bot"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-semibold text-sm">Assistant</span>
            </div>
            {/* Changed hover color for better contrast */}
            <div
              onClick={props.closeChatWindow}
              className="cursor-pointer hover:bg-white/20 p-1 rounded transition"
            >
              <img src="/x.svg" alt="Close" className="w-4 h-4 invert" />
            </div>
          </div>

          {/* --- Chat Body --- */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 text-xs mt-8">
                How can I help you today?
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  // Reduced padding and font size
                  className={`max-w-[85%] p-2 rounded-lg text-xs ${
                    msg.role === "user"
                      ? // Changed color: bg-[#394788]
                        "bg-[#394788] text-white rounded-br-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* --- Input Area --- */}
          <div className="p-2 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              // Changed focus ring color and reduced font size
              className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#394788] focus:border-[#394788]"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendMessage}
              // Changed bg color and added a slightly darker hover state
              className="bg-[#394788] text-white px-3 py-1.5 rounded-md text-xs hover:bg-[#2f3b73] transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}