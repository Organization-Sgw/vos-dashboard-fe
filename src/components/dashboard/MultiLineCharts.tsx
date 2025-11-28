import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type ChartPoint = {
  label: string // contoh: tanggal atau jam
  lineA: number // contoh: ASR
  lineB: number // contoh: ACD
}

interface MultiLineChartCardProps {
  title?: string
  data: ChartPoint[]
  lineALabel?: string
  lineBLabel?: string
}

export default function MultiLineChartCard({
  title = 'Traffic Overview',
  data,
  lineALabel = 'ASR',
  lineBLabel = 'ACD',
}: MultiLineChartCardProps) {
  return (
    <Card className="w-full h-72 mb-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} className="mt-4 border-black border-2">
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <div>
                <Line
                  type="monotone"
                  dataKey="lineA"
                  name={lineALabel}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lineB"
                  name={lineBLabel}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
              </div>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
