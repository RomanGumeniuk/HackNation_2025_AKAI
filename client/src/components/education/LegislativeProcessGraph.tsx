"use client"
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect } from 'react';
import { lightTheme } from './graphTheme';
import { nodeInfos } from './nodeData';
import { nodes, edges } from './graphConfig';
import { NodeInfo, Message } from './types';
import NodeInfoPanel from './NodeInfoPanel';
import ChatWindow from './ChatWindow';
import { useWebSocket } from './useWebSocket';

const GraphCanvas = dynamic(
    () => import('reagraph').then((mod) => mod.GraphCanvas),
    { ssr: false }
);

export default function LegislativeProcessGraph() {
    const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const socketRef = useWebSocket(isChatOpen, setMessages);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleNodeClick = (nodeId: string) => {
        const nodeInfo = nodeInfos.find(n => n.id === nodeId);
        if (nodeInfo) {
            setSelectedNode(nodeInfo);
        }
    };

    const handleAskAgent = () => {
        if (!selectedNode) return;
        setIsChatOpen(true);
        
        const contextMessage = `Powiedz mi więcej o etapie: ${selectedNode.title}. ${selectedNode.context}`;
        
        setTimeout(() => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                const userMsg: Message = { role: 'user', content: contextMessage };
                setMessages((prev) => [...prev, userMsg]);
                socketRef.current.send(contextMessage);
            }
        }, 500);
    };

    const handleSendMessage = () => {
        if (!input.trim() || !socketRef.current) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMsg]);

        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(input);
        }
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className='relative w-full h-full'>
            <div className='w-full h-full relative'>
                <GraphCanvas
                    theme={lightTheme}
                    layoutType="treeTd2d"
                    labelType='all'
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
