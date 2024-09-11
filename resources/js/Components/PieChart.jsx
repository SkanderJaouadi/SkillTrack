import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register plugins and chart types only once, outside of the component
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

export default function PieChart({ title, dataKpi , nameKpi}) {
    // Ensure dataKpi is a number
    const value = typeof dataKpi === 'number' ? dataKpi : parseFloat(dataKpi);
    const other = 100 - value; 

    const pieChartData = {
        labels: [ nameKpi, 'Other'], 
        datasets: [
            {
                label: 'Performance',
                data: [value, other], 
                backgroundColor: ['#36A2EB', '#FFCE56'], 
                hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    padding: 15,
                    color: '#000',
                },
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                color: '#000',
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                anchor: 'center',
                align: 'center',
                font: {
                    weight: 'bold',
                    size: 14,
                },
            },
        },
    };

    return (
        <div>
            {title && <h2>{title}</h2>}
            <Pie data={pieChartData} options={options} />
        </div>
    );
}
