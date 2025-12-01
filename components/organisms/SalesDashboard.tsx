"use client";

import { useState } from "react";
import ChartSelect from "@/components/molecules/ChartSelector";
import SalesChart from "@/components/molecules/SalesChart";
import Input from "@/components/atoms/Input";

const initialData = [
  { year: 2022, sales: 50000 },
  { year: 2023, sales: 75000 },
  { year: 2024, sales: 90000 },
];

export default function SalesDashboard() {
  const [chartType, setChartType] = useState("bar");
  const [threshold, setThreshold] = useState("");

  const filteredData = threshold
    ? initialData.filter((d) => d.sales >= Number(threshold))
    : initialData;

  return (
    <div>
      <h1 className="dashboard-title">Sales Dashboard</h1>

      <div className="dashboard-controls">
        <Input
          placeholder="Enter sales threshold"
          value={threshold}
          onChange={(value) => setThreshold(value)}
        />

        <ChartSelect chartType={chartType} setChartType={setChartType} />
      </div>

      <div className="chart-wrapper">
        <SalesChart data={filteredData} chartType={chartType} />
      </div>
    </div>
  );
}
