// AverageChart.tsx

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import type { ASRItem } from '@/hooks/useASR'
import { transformAverageBuckets } from '@/utils/DataAverage'

interface AverageChartProps {
  startDate: string
  endDate: string
  data?: ASRItem[]
}

export const AverageChart: React.FC<AverageChartProps> = ({ startDate, endDate, data }) => {
  const chartData = transformAverageBuckets(data ?? [], startDate, endDate)

  const gateways = Array.from(
    new Set(chartData.flatMap((d) => Object.keys(d).filter((k) => k !== 'time')))
  )

  return (
    <Card className="w-full shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Average Conversation Time
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 15, right: 20, left: 0 }}>
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
