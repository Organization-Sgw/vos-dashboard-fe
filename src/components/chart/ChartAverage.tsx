import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { type ChartRow, extractGateways } from '@/hooks/useChart'

interface AverageChartProps {
  data: ChartRow[]
}

export const AverageChart: React.FC<AverageChartProps> = ({ data }) => {
  const gateways = extractGateways(data)

  return (
    <Card className="w-full shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Average Conversation Time
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            className="dark:text-black"
            data={data}
            margin={{ top: 15, right: 20, left: 0 }}
          >
            <XAxis dataKey="time" />
            <YAxis allowDecimals />
            <Tooltip />
            <Legend />

            {gateways.map((gw, idx) => (
              <Area
                key={gw}
                type="monotone"
                dataKey={gw}
                stroke={`hsl(${idx * 50}, 70%, 50%)`}
                fill={`hsl(${idx * 50}, 70%, 50%, 0.15)`}
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
