import { type ASRItem } from '@/hooks/useASR'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { transformChartDataDynamic } from '@/utils/Chart'

interface ASRChartProps {
  startDate: string
  endDate: string
  data: ASRItem[]
}

export const ASRChart: React.FC<ASRChartProps> = ({ startDate, endDate, data }) => {
  const filteredData = data?.filter((d) => d.calling_gateway && d.calling_gateway.trim() !== '')

  const chartData = transformChartDataDynamic(filteredData, startDate, endDate)

  const gateways = Array.from(new Set(filteredData.map((d) => d.calling_gateway)))

  return (
    <Card className="w-full shadow-sm border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          ASR
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 15, right: 20, left: 0 }}>
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: 'var(--tooltip-bg, #fff)',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
            <Legend />

            {gateways.map((gateway, idx) => (
              <Line
                key={gateway}
                type="monotone"
                dataKey={gateway}
                stroke={`hsl(${idx * 50}, 70%, 50%)`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
