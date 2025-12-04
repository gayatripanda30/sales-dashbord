"use client";


import { useState } from "react";
import ChartSelect from "@/components/molecules/ChartSelector";
import SalesChart from "@/components/molecules/SalesChart";

const initialData = [
  { year: 2022, sales: 50000 },
  { year: 2023, sales: 75000 },
  { year: 2024, sales: 90000 },
];

function getTotalSales(data: typeof initialData) {
  return data.reduce((sum, d) => sum + d.sales, 0);
}

function getGrowth(data: typeof initialData) {
  if (data.length < 2) return 0;
  const prev = data[data.length - 2].sales;
  const curr = data[data.length - 1].sales;
  return prev ? (((curr - prev) / prev) * 100).toFixed(1) : 0;
}

type ChartType = "bar" | "line" | "pie";
export default function SalesDashboard() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState("");
  const products = ["All Products", "Product A", "Product B", "Product C"];
  const [selectedProduct, setSelectedProduct] = useState<string>(products[0]);

  // Per-product yearly sales (example data)
  const productSales: Record<string, { year: number; sales: number }[]> = {
    "Product A": [
      { year: 2022, sales: 22000 },
      { year: 2023, sales: 30000 },
      { year: 2024, sales: 33000 },
    ],
    "Product B": [
      { year: 2022, sales: 15000 },
      { year: 2023, sales: 25000 },
      { year: 2024, sales: 20000 },
    ],
    "Product C": [
      { year: 2022, sales: 13000 },
      { year: 2023, sales: 20000 },
      { year: 2024, sales: 37000 },
    ],
  };

  // Aggregate total per product for pie when 'All Products' selected
  const productTotals = Object.entries(productSales).map(([product, arr]) => ({
    product,
    sales: arr.reduce((s, x) => s + x.sales, 0),
  }));

  const filteredData = threshold
    ? initialData.filter((d) => d.sales >= Number(threshold))
    : initialData;

  // Choose data to show based on selection and chart type
  let dataToShow: any[] = filteredData;
  if (selectedProduct === "All Products") {
    dataToShow = chartType === "pie" ? productTotals : filteredData;
  } else {
    dataToShow = productSales[selectedProduct] ?? filteredData;
    if (threshold) dataToShow = dataToShow.filter((d) => d.sales >= Number(threshold));
  }

  const totalSales = getTotalSales(dataToShow as any);
  const growth = getGrowth(dataToShow as any);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sales Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-label">Total Sales</div>
          <div className="summary-value">${totalSales.toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Growth (YoY)</div>
          <div className={`summary-value ${Number(growth) >= 0 ? "positive" : "negative"}`}>
            {growth}%
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Years</div>
          <div className="summary-value">{filteredData.map((d) => d.year).join(", ")}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Selected Product</div>
          <div className="summary-value">{selectedProduct}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="dashboard-controls">
        <input
          className="input"
          aria-label="sales threshold"
          placeholder="Enter sales threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <select className="input" aria-label="select product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          {products.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <ChartSelect chartType={chartType} setChartType={setChartType} />
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        <SalesChart data={dataToShow} chartType={chartType} />
      </div>
    </div>
  );
}
