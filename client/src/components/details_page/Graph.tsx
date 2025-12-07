"use client"
import dynamic from 'next/dynamic';
import { GraphNode } from 'reagraph';
import { useState } from 'react';
import {graph_nodes, graph_edges} from "@/mock_data/graph"

const GraphCanvas = dynamic(
    () => import('reagraph').then((mod) => mod.GraphCanvas),
    { ssr: false }
);

type CustomData = {
    description?: string;
    date?: string;
    author?: string;
    stage?: string;
    youtube?: string;
    details?: string;
    deadline?: string;
    voting?: {
        total: number;
        present: number;
        for: number;
        against: number;
        abstain: number;
        result: string;
        votingDetails?: any;
    };
    amendments?: any[];
    newAmendments?: any[];
}

const lightTheme = {
    canvas: { background: '#fafafa' },
    node: {
        fill: '#5B8FA3',
        activeFill: '#394788',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.3,
        label: {
            color: '#000000',
            stroke: '#ffffff',
            activeColor: '#000000',
            fontSize: 14,
        },
        subLabel: {
            color: '#555555',
            stroke: 'transparent',
            activeColor: '#555555',
            fontSize: 10,
        },
    },
    lasso: {
        border: '1px solid #394788',
        background: 'rgba(57, 71, 136, 0.1)',
    },
    ring: {
        fill: '#394788',
        activeFill: '#5B8FA3',
    },
    edge: {
        fill: '#a0a0a0',
        activeFill: '#394788',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.3,
        label: {
            stroke: '#ffffff',
            color: '#555555',
            activeColor: '#394788',
            fontSize: 10,
        },
    },
    arrow: {
        fill: '#a0a0a0',
        activeFill: '#394788',
    },
    cluster: {
        stroke: '#d0d0d0',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.1,
        label: {
            stroke: '#ffffff',
            color: '#394788',
        },
    },
};

export default function Graph() {
    const [activeNode, setActiveNode] = useState<GraphNode | null>(null);

    return (
        <div className='h-[1000px] w-full relative border border-gray-200 rounded-lg bg-gray-50'>
            <GraphCanvas
                theme={lightTheme}
                layoutType="treeLr2d"
                labelType='all'
                draggable={false}
                nodes={graph_nodes}
                edges={graph_edges}
                onNodeClick={(node) => {
                    setActiveNode(node);
                }}
                onCanvasClick={() => {
                    setActiveNode(null);
                }}
            />
            {activeNode && (
                <div className="absolute top-5 right-5 w-96 max-h-[650px] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 z-10 border border-gray-300">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-[#394788] leading-tight pr-4">
                            {activeNode.label}
                        </h3>
                        <button
                            onClick={() => setActiveNode(null)}
                            className="text-gray-400 hover:text-gray-700 transition text-xl"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        {(activeNode.data as CustomData)?.stage && (
                            <div className="bg-[#394788] text-white px-3 py-1 rounded-lg text-sm font-semibold inline-block">
                                {(activeNode.data as CustomData)?.stage}
                            </div>
                        )}

                        {(activeNode.data as CustomData)?.date && (
                            <p className="text-sm">
                                <span className="font-semibold text-gray-700">Data:</span>{" "}
                                <span className="text-gray-900">{(activeNode.data as CustomData)?.date}</span>
                            </p>
                        )}

                        {(activeNode.data as CustomData)?.author && (
                            <p className="text-sm">
                                <span className="font-semibold text-gray-700">Autor:</span>{" "}
                                <span className="text-gray-900">{(activeNode.data as CustomData)?.author}</span>
                            </p>
                        )}

                        {(activeNode.data as CustomData)?.description && (
                            <p className="text-sm">
                                <span className="font-semibold text-gray-700">Opis:</span>{" "}
                                <span className="text-gray-900">{(activeNode.data as CustomData)?.description}</span>
                            </p>
                        )}

                        {(activeNode.data as CustomData)?.details && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-gray-800">
                                    {(activeNode.data as CustomData)?.details}
                                </p>
                            </div>
                        )}

                        {(activeNode.data as CustomData)?.deadline && (
                            <p className="text-sm">
                                <span className="font-semibold text-red-600">Termin:</span>{" "}
                                <span className="text-gray-900">{(activeNode.data as CustomData)?.deadline}</span>
                            </p>
                        )}

                        {(activeNode.data as CustomData)?.youtube && (
                            <a 
                                href={(activeNode.data as CustomData)?.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center transition"
                            >
                                Zobacz transmisję na YouTube
                            </a>
                        )}

                        {(activeNode.data as CustomData)?.voting && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="font-bold text-green-800 mb-2">Wyniki głosowania</h4>
                                <div className="space-y-1 text-sm">
                                    <p><span className="font-semibold">Obecnych:</span> {(activeNode.data as CustomData)?.voting?.present} / {(activeNode.data as CustomData)?.voting?.total}</p>
                                    <p className="text-green-700"><span className="font-semibold">Za:</span> {(activeNode.data as CustomData)?.voting?.for}</p>
                                    <p className="text-red-700"><span className="font-semibold">Przeciw:</span> {(activeNode.data as CustomData)?.voting?.against}</p>
                                    <p className="text-gray-600"><span className="font-semibold">Wstrzymało się:</span> {(activeNode.data as CustomData)?.voting?.abstain}</p>
                                    <p className="font-bold mt-2 text-green-800">Wynik: {(activeNode.data as CustomData)?.voting?.result}</p>
                                </div>

                                {(activeNode.data as CustomData)?.voting?.votingDetails && (
                                    <div className="mt-3 pt-3 border-t border-green-300">
                                        <h5 className="font-semibold text-sm mb-2">Głosowanie według klubów</h5>
                                        <div className="space-y-1 text-xs">
                                            {Object.entries((activeNode.data as CustomData)?.voting?.votingDetails || {}).map(([club, votes]: [string, any]) => (
                                                <p key={club}>
                                                    <span className="font-semibold">{club}:</span> Za: {votes.for}, Przeciw: {votes.against}, Wstrz.: {votes.abstain}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {(activeNode.data as CustomData)?.amendments && (activeNode.data as CustomData)?.amendments!.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-bold text-yellow-800 mb-2">Poprawki ({(activeNode.data as CustomData)?.amendments?.length})</h4>
                                <div className="space-y-3">
                                    {(activeNode.data as CustomData)?.amendments?.map((amendment: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded p-2 text-sm border border-yellow-200">
                                            <p className="font-semibold text-gray-800">{amendment.author}</p>
                                            <p className="text-gray-700 text-xs mt-1">{amendment.content}</p>
                                            <p className={`text-xs font-bold mt-1 ${amendment.status === 'Przyjęta' ? 'text-green-600' : amendment.status === 'Odrzucona' ? 'text-red-600' : 'text-orange-600'}`}>
                                                {amendment.status}
                                            </p>
                                            {amendment.votes && (
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Za: {amendment.votes.for}, Przeciw: {amendment.votes.against}, Wstrz.: {amendment.votes.abstain}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(activeNode.data as CustomData)?.newAmendments && (activeNode.data as CustomData)?.newAmendments!.length > 0 && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h4 className="font-bold text-purple-800 mb-2">Nowe poprawki</h4>
                                <div className="space-y-2">
                                    {(activeNode.data as CustomData)?.newAmendments?.map((amendment: any, idx: number) => (
                                        <div key={idx} className="bg-white rounded p-2 text-sm border border-purple-200">
                                            <p className="font-semibold text-gray-800">{amendment.author}</p>
                                            <p className="text-gray-700 text-xs mt-1">{amendment.content}</p>
                                            <p className="text-xs text-purple-600 font-semibold mt-1">{amendment.status}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
