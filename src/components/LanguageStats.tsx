import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface LanguageStatsProps {
  languageBreakdown: { [key: string]: number };
}

export function LanguageStats({ languageBreakdown }: LanguageStatsProps) {
  const data = Object.entries(languageBreakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Show top 5 languages

  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">Most Used Languages</h3>
      <div className="bg-white/5 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            >
              {data.map((_, index) => (
                <Bar 
                  key={`bar-${index}`} 
                  dataKey="value" 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {data.map((lang, index) => (
            <div 
              key={lang.name}
              className="flex items-center space-x-2"
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-gray-300 text-sm">
                {lang.name}: {lang.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}