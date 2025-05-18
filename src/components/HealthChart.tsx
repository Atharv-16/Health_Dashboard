import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HealthData } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthChartProps {
  data: HealthData[];
  metric: keyof Omit<HealthData, 'date'>;
  title: string;
  color: string;
  yAxisLabel: string;
}

export const HealthChart: React.FC<HealthChartProps> = ({
  data,
  metric,
  title,
  color,
  yAxisLabel,
}) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: title,
        data: data.map((d) => d[metric]),
        borderColor: color,
        backgroundColor: color + '40',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return <Line data={chartData} options={options} />;
}; 