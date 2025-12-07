import { MessageCircle, X } from 'lucide-react';
import { Message } from './types';

type ChatWindowProps = {
    messages: Message[];
    input: string;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    onClose: () => void;
    onInputChange: (value: string) => void;
    onSendMessage: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChatWindow({ 
    messages, 
    input, 
    messagesEndRef, 
    onClose, 
    onInputChange, 
    onSendMessage, 
    onKeyDown 
}: ChatWindowProps) {
    return (
        <div className="fixed bottom-4 right-4 z-50 w-[420px] h-[550px] bg-white rounded-lg shadow-2xl border border-gray-300 flex flex-col overflow-hidden">
            <div className="bg-[#394788] text-white p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                        <img src="/bot_gemini_cropped.png" alt="Bot" className="object-contain w-7 h-7" />
                    </div>
                    <span className="font-semibold">Asystent Prawny</span>
                </div>
                <button 
                    onClick={onClose}
                    className="cursor-pointer hover:bg-white/20 p-1.5 rounded transition"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm mt-12">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Kliknij na węzeł i zapytaj o szczegóły!</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] p-3 rounded-lg text-sm ${
                                msg.role === 'user'
                                    ? 'bg-[#394788] text-white rounded-br-none shadow-sm'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#394788] focus:border-transparent"
                    placeholder="Zadaj pytanie..."
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button
                    onClick={onSendMessage}
                    className="bg-[#394788] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2f3b73] transition shadow-sm"
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
}
