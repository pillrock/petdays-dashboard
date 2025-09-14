"use client";

import React, { useRef, useEffect } from "react";
import { Chart, ChartConfiguration, ChartType, registerables } from "chart.js";
import { formatCurrency } from "@/utils";
Chart.register(...registerables);

interface ProfitChartProps {
  partnerProfit: number;
  petdaysProfit: number;
}

export const ProfitChart: React.FC<ProfitChartProps> = ({
  partnerProfit,
  petdaysProfit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<ChartType> = {
      type: "bar",
      data: {
        labels: ["Lợi nhuận của bạn", "Lợi nhuận Petdays"],
        datasets: [
          {
            label: "Phân chia lợi nhuận",
            data: [partnerProfit, petdaysProfit],
            backgroundColor: ["#10B981", "#F59E0B"],
            borderColor: ["#059669", "#D97706"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => formatCurrency(Number(context.raw)),
            },
          },
          title: {
            display: true,
            text: "So sánh lợi nhuận trên mỗi sản phẩm",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => formatCurrency(Number(value)),
            },
          },
        },
      },
    };

    chartRef.current = new Chart(ctx, config);

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [partnerProfit, petdaysProfit]);

  return (
    <div className="chart-container w-1/2 h-[300px]">
      <canvas ref={canvasRef} />
    </div>
  );
};
