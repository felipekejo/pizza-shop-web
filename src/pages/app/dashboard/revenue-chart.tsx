import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '02/04', revenue: 1000 },
  { date: '03/04', revenue: 800 },
  { date: '04/04', revenue: 582 },
  { date: '05/04', revenue: 999 },
  { date: '06/04', revenue: 1300 },
  { date: '07/04', revenue: 680 },
  { date: '08/04', revenue: 990 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Revenue in the period
          </CardTitle>
          <CardDescription>Daily revenue in the period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: '12px' }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('en-AU', {
                  style: 'currency',
                  currency: 'AUD',
                })
              }
            />
            <Line
              type="linear"
              dataKey="revenue"
              strokeWidth={2}
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
