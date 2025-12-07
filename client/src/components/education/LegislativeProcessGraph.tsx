"use client"
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useContext } from 'react';
import { lightTheme } from './graphTheme';
import { nodeInfos } from './nodeData';
import { nodes, edges } from './graphConfig';
import { NodeInfo, Message } from './types';
import NodeInfoPanel from './NodeInfoPanel';
import ChatWindow from './ChatWindow';
import { SocketContext } from '@/contexts/SocketContext';
import { composeMessage } from '@/socket';

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

    const socket = useContext(SocketContext);

    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    // useEffect(() => {
    //     if (isChatOpen) {
    //         socket.on('response', (data: any) => {
    //             setMessages((prev) => [...prev, { role: 'bot', content: data.response || data }]);
    //         });
    //     }

    //     return () => {
    //         if (isChatOpen) {
    //             socket.off('response');
    //         }
    //     };
    // }, [isChatOpen, socket]);

    const handleNodeClick = (nodeId: string) => {
        const nodeInfo = nodeInfos.find(n => n.id === nodeId);
        if (nodeInfo) {
            setSelectedNode(nodeInfo);
        }
    };

    const handleAskAgent = async () => {
        if (!selectedNode) return;
        setIsChatOpen(true);
        
        const content = selectedNode.context;
        // answer
        const prompt = `Powiedz mi więcej o etapie: ${selectedNode.title}`; //  tutaj wpierdalam to co napisze
        
        setTimeout(async () => {
            const userMsg: Message = { role: 'user', content: prompt };
            setMessages((prev) => [...prev, userMsg]);
            
            const message = composeMessage('answer', content, prompt);
            socket.emit('ask', message);
        }, 500);
    };

    // const handleSendMessage = async () => {
    //     if (!input.trim()) return;

    //     const userMsg: Message = { role: 'user', content: input };
    //     setMessages((prev) => [...prev, userMsg]);

    //     const content = selectedNode ? `${selectedNode.title}\n\n${selectedNode.description}\n\n${selectedNode.context}` : undefined;
    //     const message = composeMessage('answer', content, input);
    //     socket.emit('ask', message);
        
    //     setInput("");
    // };

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') handleSendMessage();
    // };

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
