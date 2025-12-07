import { MessageCircle, X } from 'lucide-react';
import { NodeInfo } from './types';

type NodeInfoPanelProps = {
    selectedNode: NodeInfo;
    onClose: () => void;
    onAskAgent: () => void;
}

export default function NodeInfoPanel({ selectedNode, onClose, onAskAgent }: NodeInfoPanelProps) {
    return (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl border border-gray-200 p-5 max-w-md z-10">
            <button 
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
                <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-xl text-[#394788] mb-2 pr-8">{selectedNode.title}</h3>
            <p className="text-sm text-gray-600 mb-3 font-medium">{selectedNode.description}</p>
            <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded border border-gray-100 leading-relaxed">
                {selectedNode.context}
            </p>
            
            <button
                onClick={onAskAgent}
                className="w-full bg-[#394788] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2f3b73] transition flex items-center justify-center gap-2 shadow-sm"
            >
                <MessageCircle className="w-4 h-4" />
                Zapytaj asystenta o ten etap
            </button>
        </div>
    );
}
