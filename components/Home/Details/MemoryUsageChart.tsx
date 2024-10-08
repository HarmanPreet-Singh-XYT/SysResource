// components/MemoryUsageChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MemoryUsageChart = ({memoryData,labels,maxValue}:{memoryData:number[],labels:string[],maxValue:number}) => {
  

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: memoryData,
        borderColor: 'rgba(0, 0, 0, 1)', // Black line color
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Optional: semi-transparent black background for the area under the line
        borderWidth: 2,
        tension: 0.3, // Smoother line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: maxValue, // Assuming maximum memory in MB (adjust based on actual data)
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation:{
      duration:0
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default MemoryUsageChart;
