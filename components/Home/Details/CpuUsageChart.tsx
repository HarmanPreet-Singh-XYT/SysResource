// components/CpuUsageChart.tsx
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

const CpuUsageChart = () => {
  const [cpuData, setCpuData] = useState<number[]>([30, 40, 20, 50, 60, 45, 70]); // Initial Data
  const [labels, setLabels] = useState<string[]>(['1s', '2s', '3s', '4s', '5s', '6s', '7s']); // Initial Labels

  // Simulate live data update every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuUsage = Math.floor(Math.random() * 100); // Mock CPU usage value
      setCpuData((prevData) => [...prevData.slice(1), newCpuUsage]);
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
        label: 'CPU Usage (%)',
        data: cpuData,
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
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation:{
      duration: 0,
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default CpuUsageChart;
