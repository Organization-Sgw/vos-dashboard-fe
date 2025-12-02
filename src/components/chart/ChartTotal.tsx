import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { ECdr } from '@/types/EcdrType'
import { transformTotalCalls, type MultiGatewayPoint } from '@/utils/DataTotalChart'

interface TotalCallsChartProps {
  startDate: string
  endDate: string
  data?: ECdr[]
}

export const TotalCallsChart: React.FC<TotalCallsChartProps> = ({ startDate, endDate, data }) => {
  const chartData: MultiGatewayPoint[] = transformTotalCalls(data ?? [], startDate, endDate)

  const gateways = Array.from(
    new Set(chartData.flatMap((point) => Object.keys(point).filter((k) => k !== 'time')))
  )

  return (
    <Card className="w-full shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Total Calls by Gateway
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 15, right: 20, left: 0 }}>
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            {gateways.map((gateway, idx) => (
              <Area
                key={gateway}
                type="monotone"
                dataKey={gateway}
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
