"use client"
import dynamic from 'next/dynamic';
import { GraphEdge, GraphNode, lightTheme } from 'reagraph';
import { useState } from 'react';
import {graph_nodes, graph_edges} from "@/mock_data/graph"
const GraphCanvas = dynamic(
    () => import('reagraph').then((mod) => mod.GraphCanvas),
    { ssr: false }
);

interface CustomData {
    description: string;
    date: string;
    author: string;
}
// 00FF00 -> green
// FF0000 -> red

export default function Graph() {
    const [activeNode, setActiveNode] = useState<GraphNode | null>(null);
    // const graph_nodes: GraphNode[] = [
    //     {
    //         id: "1",
    //         label: "Uchwała dotycząca pomocy społecznej",
    //         fill: "#00FF00",
    //         data: {
    //             description: "Jeden",
    //             date: "2023-10-12",
    //             author: "Admin"
    //         }
    //     },
    //     {
    //         id: "2",
    //         label: "Projekt ustawy o ochronie danych osobowych",
    //         fill: "#FF0000",
    //         data: {
    //             description: "Dwa",
    //             date: "2023-10-12",
    //             author: "Admin"
    //         }
    //     },
    //     {
    //         id: "3",
    //         label: "Lorem ipsum blabla",
    //         fill: "#00FF00",
    //         data: {
    //             description: "Trzy",
    //             date: "2023-10-12",
    //             author: "Admin"
    //         }
    //     },
    //     {
    //         id: "4",
    //         label: "Cos tam czwartego beka",
    //         data: {
    //             description: "Cztery",
    //             date: "2023-10-12",
    //             author: "Admin"
    //         }
    //     },
    // ];
    // const graph_edges: GraphEdge[] = [
    //     { id: "e1-2", source: "1", target: "2" },
    //     { id: "e1-3", source: "1", target: "3" },
    //     { id: "e2-4", source: "2", target: "4" },
    //     { id: "e3-4", source: "3", target: "4" },
    // ];



    return (
        <div className='h-[400px] w-full relative border border-gray-200 rounded-lg'>
            <GraphCanvas
                layoutType="treeLr2d"
                labelType='all'
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
                <div
                    className="absolute top-5 right-5 w-72 bg-white rounded-xl shadow-xl p-5 z-10 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold leading-tight">
                            {activeNode.label}
                        </h3>

                        <button
                            onClick={() => setActiveNode(null)}
                            className="text-gray-500 hover:text-black transition"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium text-gray-700">Author:</span>{" "}
                            {(activeNode.data as CustomData)?.author}
                        </p>

                        <p>
                            <span className="font-medium text-gray-700">Date:</span>{" "}
                            {(activeNode.data as CustomData)?.date}
                        </p>
                        
                        <p>
                            <span className="font-medium text-gray-700">Description:</span>{" "}
                            {(activeNode.data as CustomData)?.description}
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}