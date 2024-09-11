import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const KPIGroupChart = ({ kpiGroup }) => {
    if (!Array.isArray(kpiGroup) || kpiGroup.length === 0) {
        return <p>No data available for this KPI group.</p>;
    }

    const courses = [...new Set(kpiGroup.flatMap(kpi => kpi.cour?.nom_cour))];
    const kpiLabel = kpiGroup[0]?.kpi?.nom_kpi || 'KPI';

    const chartData = {
        labels: courses,
        datasets: [{
            label: kpiLabel,
            data: courses.map(course => {
                const kpi = kpiGroup.find(item => item.cour?.nom_cour === course);
                return kpi ? kpi.value : 0;
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="mb-8">
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display:false,
                            position: 'top',
                        },
                        tooltip: {
                            enabled:false,
                            callbacks: {
                                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                           
                        },
                        y: {
                            
                            beginAtZero: true,
                            
                        },
                    },
                }}
            />
        </div>
    );
};

export default KPIGroupChart;
