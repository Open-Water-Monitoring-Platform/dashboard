'use client'
import React, { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataGraphProps {
    graph: GraphData[],
    handleGraphChange: (type: string) => void,
}

const DataGraph = ({ graph, handleGraphChange }: DataGraphProps) => {

    const handleSelectChange = (value: string) => {
        handleGraphChange(value);
    }

    return (
        <div className='bg-white border border-[#F0F0F0] rounded-2xl lg:px-2 py-5' >
            <div className='flex flex-row items-center justify-between px-4' >
                <h2>Chart</h2>
                <Select onValueChange={handleSelectChange} defaultValue="tds">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select parameter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tds">TDS</SelectItem>
                        <SelectItem value="ph">pH</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="turbidity">Turbidity</SelectItem>
                        <SelectItem value="do">DO</SelectItem>
                        <SelectItem value="orp">ORP</SelectItem>
                        <SelectItem value="ec">EC</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={graph}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#50A0EF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#50A0EF" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DataGraph