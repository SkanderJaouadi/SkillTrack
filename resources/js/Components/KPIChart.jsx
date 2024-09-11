import React from 'react';
import PieChart from '@/Components/PieChart';  
import BarChart from '@/Components/BarChart'; 
import ProgressChart from '@/Components/ProgressChart';  
import GaugeChart from '@/Components/GaugeChart';
import DonautChart from '@/Components/DonautChart';
import LineChart from '@/Components/LineChart';
import NumChart from '@/Components/NumChart';

export default function KPIChart({ selected_kpi }) {
    
    const renderChart = () => {
        switch (selected_kpi.kpi.nom_kpi) {
            case 'Student Success Rate':
                return <PieChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Retention Rate':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Abandonment Rate':
                return <PieChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Average Ratings':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Student Satisfaction Rate':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Class Participation Rate':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Student Progress Rate':
                return <GaugeChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Resource Use Rate':
                return <PieChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Average Study Time per Week':
                return <NumChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Late Submission Rate':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Student Motivation Index':
                return <GaugeChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Student Performance Index':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Engagement Rate in Activities':
                return <BarChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Absences':
                return <NumChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            case 'Online Success Rate':
                return <PieChart dataKpi={selected_kpi.value} nameKpi={selected_kpi.kpi.nom_kpi} />;
            default:
                return <p>No chart available for this KPI</p>;
        }
    };

    return (
        <div>
            {renderChart()}
        </div>
    );
}
