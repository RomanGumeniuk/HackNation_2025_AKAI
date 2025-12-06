"use client"
import dynamic from 'next/dynamic';
import { Theme } from "@/lib/graphTheme"

const GraphCanvas = dynamic(
    () => import('reagraph').then((mod) => mod.GraphCanvas),
    { ssr: false }
);

const lightTheme: Theme = {
    canvas: {
        background: '#fff'
    },
    node: {
        fill: '#7CA0AB',
        activeFill: '#1DE9AC',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.2,
        label: {
            color: '#2A6475',
            stroke: '#fff',
            activeColor: '#1DE9AC'
        },
        subLabel: {
            color: '#2A6475',
            stroke: '#eee',
            activeColor: '#1DE9AC'
        }
    },
    lasso: {
        border: '1px solid #55aaff',
        background: 'rgba(75, 160, 255, 0.1)'
    },
    ring: {
        fill: '#D8E6EA',
        activeFill: '#1DE9AC'
    },
    edge: {
        fill: '#D8E6EA',
        activeFill: '#1DE9AC',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.1,
        label: {
            stroke: '#fff',
            color: '#2A6475',
            activeColor: '#1DE9AC'
        }
    },
    arrow: {
        fill: '#D8E6EA',
        activeFill: '#1DE9AC'
    },
    cluster: {
        stroke: '#D8E6EA',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.1,
        label: {
            stroke: '#fff',
            color: '#2A6475'
        }
    }
};

export default function Graph() {
    const node_infos = [
        
    ] 
    return (
        <div className='h-[400px] w-full relative border border-gray-200 rounded-lg'>
            <GraphCanvas
                
                theme={lightTheme}
                layoutType="treeLr2d"

                labelType='all'

                nodes={[
                    {
                        id: 'law-v1',
                        label: 'Draft Law #2024-01 (v1)',
                        size: 25
                    },
                    {
                        id: 'law-v2',
                        label: 'Committee Revision (v2)',
                        size: 25
                    },
                    {
                        id: 'law-final',
                        label: 'Final Resolution (Adopted)',
                        fill: '#2F855A',
                        size: 30
                    },
                ]}
                edges={[
                    {
                        id: 'v1->v2',
                        source: 'law-v1',
                        target: 'law-v2',
                    },
                    {
                        id: 'v2->final',
                        source: 'law-v2',
                        target: 'law-final',
                    },
                ]}
            />
        </div>
    )
}