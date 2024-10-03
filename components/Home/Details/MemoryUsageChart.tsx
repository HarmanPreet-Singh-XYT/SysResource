// components/MemoryUsageChart.tsx
import React, { useState, useEffect } from 'react';
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

const MemoryUsageChart = () => {
  const [memoryData, setMemoryData] = useState<number[]>([500, 600, 550, 700, 800, 750, 850]); // Initial Memory Usage in MB
  const [labels, setLabels] = useState<string[]>(['1s', '2s', '3s', '4s', '5s', '6s', '7s']); // Initial Labels

  // Simulate live data update every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const newMemoryUsage = Math.floor(Math.random() * 1000); // Mock Memory usage value in MB
      setMemoryData((prevData) => [...prevData.slice(1), newMemoryUsage]);
      setLabels((prevLabels) => [
        ...prevLabels.slice(1),
        `${parseInt(prevLabels[prevLabels.length - 1]) + 1}s`
      ]);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
        max: 1000, // Assuming maximum memory in MB (adjust based on actual data)
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
