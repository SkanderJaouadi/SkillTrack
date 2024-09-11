import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function DonutChart({ dataKpi, nameKpi }) {
    const DonutData = {
        labels: [nameKpi, 'Other'],
        datasets: [
            {
                label: nameKpi,
                data: [dataKpi, 100 - dataKpi],
                backgroundColor: ['rgba(75, 192, 192, 0.6)','#FFCE56'],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return <Doughnut data={DonutData} options={options} />;
}
