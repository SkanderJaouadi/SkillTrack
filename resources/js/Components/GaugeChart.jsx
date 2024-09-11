import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function GaugeChart({ dataKpi, nameKpi }) {
    const GaugeData = {
        labels: [nameKpi],
        datasets: [
            {
                label: nameKpi,
                data: [dataKpi],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',  // Horizontal bar
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return <Bar data={GaugeData} options={options} />;
}
