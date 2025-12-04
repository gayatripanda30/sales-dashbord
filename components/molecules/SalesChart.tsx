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
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc"];



import { TooltipProps } from "recharts";

type SalesData = { year?: number; product?: string; sales: number };

interface SalesChartProps {
  data: SalesData[];
  chartType: "bar" | "line" | "pie";
}

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload, label } = props as any;
  if (active && payload && payload.length) {
    const source = payload[0]?.payload ?? {};
    const itemLabel = source.product ?? source.year ?? label;
    return (
      <div className="custom-tooltip">
        <div className="label">{itemLabel}</div>
        <div className="value">sales : {payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data, chartType }: SalesChartProps) {
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const item = data[index];
    const labelText = item?.product ?? item?.year ?? "";
    return (
      <text x={x} y={y} fill="#fff" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {labelText}
      </text>
    );
  };
  return (
    <>
      {chartType === "bar" && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
            <Bar dataKey="sales" fill="#818cf8" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === "line" && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
            <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chartType === "pie" && (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={data} dataKey="sales" nameKey={data[0]?.product ? "product" : "year"} cx="50%" cy="50%" outerRadius={110} label={renderCustomizedLabel}>
              {data.map((_, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
