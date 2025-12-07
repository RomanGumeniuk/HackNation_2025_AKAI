"use client"
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useContext } from "react";
import { lightTheme } from "./graphTheme";
import { nodeInfos } from "./nodeData";
import { nodes, edges } from "./graphConfig";
import { NodeInfo, Message } from "./types";
import NodeInfoPanel from "./NodeInfoPanel";
import ChatWindow from "./ChatWindow";
import { useWebSocket } from "./useWebSocket";
import { SocketContext } from "@/contexts/SocketContext";
import { composeMessage } from "@/socket";

const GraphCanvas = dynamic(
  () => import("reagraph").then((mod) => mod.GraphCanvas),
  { ssr: false }
);

export default function LegislativeProcessGraph() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNodeClick = (nodeId: string) => {
    const nodeInfo = nodeInfos.find((n) => n.id === nodeId);
    if (nodeInfo) {
      setSelectedNode(nodeInfo);
    }
  };

  const handleAskAgent = () => {
    if (!selectedNode) return;
    setIsChatOpen(true);
    handleSendMessage();
  };

  const handleSendMessage = () => {
    const userMsg: Message = {
      role: "user",
      content:
        messages.length == 0
          ? `Powiedz mi więcej o etapie: ${selectedNode?.title}. ${selectedNode?.context}`
          : input,
    };
    setMessages((prev) => [...prev, userMsg]);
    socket.emit(
      "query",
      composeMessage(
        "answer",
        messages.length == 0
          ? `${selectedNode?.title}. ${selectedNode?.context}`
          : undefined,
        messages.length == 0
          ? `Powiedz mi więcej o etapie: ${selectedNode?.title}. ${selectedNode?.context}`
          : input,
        messages.length == 0 ? true : false
      )
    );

    socket.on("response", (ev) => {
      const botMsg: Message = { role: "bot", content: ev.response.content };
      setMessages((prev) => [...prev, botMsg]);
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full relative">
        <GraphCanvas
          theme={lightTheme}
          layoutType="treeTd2d"
          labelType="all"
          draggable={false}
          onNodeClick={(node) => handleNodeClick(node.id)}
          nodes={nodes}
          edges={edges}
        />
      </div>

      {selectedNode && (
        <NodeInfoPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
          onAskAgent={handleAskAgent}
        />
      )}

      {isChatOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          messagesEndRef={messagesEndRef}
          onClose={() => setIsChatOpen(false)}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}
