import React from 'react';
// Import Recharts components
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export type VisualBlockProps = {
  type: 'pie' | 'bar' | 'line' | 'scatter' | 'table';
  data: any;
  config?: any;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function VisualBlock({ type, data, config }: VisualBlockProps) {
  if (type === 'pie') {
    return (
      <PieChart width={220} height={180}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
          {data.map((entry: any, idx: number) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }
  if (type === 'bar') {
    return (
      <BarChart width={220} height={180} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    );
  }
  if (type === 'line') {
    return (
      <LineChart width={220} height={180} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  }
  if (type === 'scatter') {
    return (
      <ScatterChart width={220} height={180}>
        <CartesianGrid />
        <XAxis dataKey="x" name="X" />
        <YAxis dataKey="y" name="Y" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Data" data={data} fill="#8884d8" />
      </ScatterChart>
    );
  }
  if (type === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-[200px] border text-xs">
          <thead>
            <tr>
              {data.columns.map((col: string) => (
                <th key={col} className="border px-2 py-1 bg-gray-100">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: any, idx: number) => (
              <tr key={idx}>
                {row.map((cell: any, cidx: number) => (
                  <td key={cidx} className="border px-2 py-1">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
} 