import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

export default function RadarChart({ dataKpi, nameKpi }) {
    const RadarData = {
        labels: ['Skill A', 'Skill B', 'Skill C', 'Skill D', 'Skill E'], // Example labels
        datasets: [
            {
                label: nameKpi,
                data: dataKpi, // Example: [85, 90, 80, 75, 95]
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: '#36A2EB',
                pointBackgroundColor: '#36A2EB',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return <Radar data={RadarData} options={options} />;
}
