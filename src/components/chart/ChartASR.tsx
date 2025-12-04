import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { extractGateways, type ChartRow } from '@/hooks/useChart'

interface ASRChartProps {
  data: ChartRow[] 
}

export const ASRChart: React.FC<ASRChartProps> = ({ data }) => {
  const gateways = extractGateways(data)

  return (
    <Card className="w-full shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          ASR
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart className='dark:text-black' data={data} margin={{ top: 15, right: 20, left: 0 }}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />

            {gateways.map((gw, idx) => (
              <Area
                key={gw}
                type="monotone"
                dataKey={gw}
                stroke={`hsl(${idx * 50}, 70%, 50%)`}
                fillOpacity={0.15}
                fill={`hsl(${idx * 50}, 70%, 50%)`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
