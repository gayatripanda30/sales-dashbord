"use client";

interface ChartSelectProps {
  chartType: string;
  setChartType: (type: string) => void;
}

export default function ChartSelect({ chartType, setChartType }: ChartSelectProps) {
  return (
    <>
      <button
        className={`tab-btn ${chartType === "bar" ? "active" : ""}`}
        onClick={() => setChartType("bar")}
      >
        Bar Chart
      </button>

      <button
        className={`tab-btn ${chartType === "line" ? "active" : ""}`}
        onClick={() => setChartType("line")}
      >
        Line Chart
      </button>

      <button
        className={`tab-btn ${chartType === "pie" ? "active" : ""}`}
        onClick={() => setChartType("pie")}
      >
        Pie Chart
      </button>
    </>
  );
}
