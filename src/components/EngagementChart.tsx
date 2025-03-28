import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface DataPoint {
  label: string;
  engagement: number;
  previousEngagement?: number;
}

interface EngagementChartProps {
  data: DataPoint[];
  title: string;
  description: string;
  recommendation: string;
  icon: React.ElementType;
  showPreviousPeriod?: boolean;
}

export default function EngagementChart({
  data,
  title,
  description,
  recommendation,
  icon: Icon,
  showPreviousPeriod = false,
}: EngagementChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-primary-600">
            Engagement: {payload[0].value}%
          </p>
          {showPreviousPeriod && payload[1] && (
            <p className="text-sm text-gray-500">
              Previous: {payload[1].value}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Icon className="w-5 h-5 mr-2 text-primary-600" />
        {title}
      </h3>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="label"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#357A21"
                fill="url(#colorEngagement)"
                strokeWidth={2}
              />
              {showPreviousPeriod && (
                <Area
                  type="monotone"
                  dataKey="previousEngagement"
                  stroke="#9CA3AF"
                  fill="url(#colorPrevious)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              )}
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#357A21" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#357A21" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{description}</span>
          </div>
          <div className="flex items-center space-x-2 text-primary-600 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{recommendation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}