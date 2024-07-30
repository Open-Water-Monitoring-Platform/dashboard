'use client'
import { cn } from '@/utils/utils'
import React, { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface DataGraphProps {
    graph: GraphData[],
    handleGraphChange: (type: string) => void,
}

const DataGraph = ({ graph, handleGraphChange }: DataGraphProps) => {
    const [type, setType] = useState('fr')

    return (
        <div className='bg-white border border-[#F0F0F0] rounded-2xl lg:px-2 py-5' >
            <div className='flex flex-row items-center justify-between px-4' >
                <h2>Chart</h2>
                <span className='flex flex-row items-center gap-0.5' >
                    <button onClick={() => {setType('fr'); handleGraphChange('fr')}} className={cn('hover:text-customBlue', type == 'fr' && 'text-customBlue')} >Flow rate</button>
                    <h2>|</h2>
                    <button onClick={() => {setType('depth'); handleGraphChange('depth')}} className={cn('hover:text-customBlue', type == 'depth' && 'text-customBlue')}>Depth</button>
                </span>
            </div>

            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={graph}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0000FF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#0000FF" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DataGraph