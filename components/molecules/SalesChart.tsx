"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc"];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

interface SalesChartProps {
  data: Array<{ year: number; sales: number }>;
  chartType: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="label">{label}</div>
        <div className="value">sales : {payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data, chartType }: SalesChartProps) {
  return (
    <>
      {chartType === "bar" && (
        <BarChart width={600} height={350} data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sales" fill="#818cf8" />
        </BarChart>
      )}

      {chartType === "line" && (
        <LineChart width={600} height={350} data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      )}

      {chartType === "pie" && (
        <PieChart width={600} height={350}>
          <Pie
            data={data}
            dataKey="sales"
            nameKey="year"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      )}
    </>
  );
}
