import React from 'react';
import KPIGroupChart from './KPIGroupChart';

const CombinedKPIChart = ({ selectedKpis }) => {
    if (!Array.isArray(selectedKpis) || selectedKpis.length === 0) {
        return <p>No KPIs available to display.</p>;
    }

    
    const kpiGroups = selectedKpis.reduce((acc, kpi) => {
        if (!kpi.kpi || !kpi.kpi.id || !kpi.cour || !kpi.cour.nom_cour || typeof kpi.value === 'undefined') {
            console.error('KPI item missing required properties:', kpi);
            return acc;
        }

        const key = kpi.kpi.id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(kpi);
        return acc;
    }, {});

    return (
        <div className="flex flex-wrap gap-4">
            {Object.entries(kpiGroups).map(([kpiId, kpiGroup]) => (
                <div key={kpiId} className="flex flex-col mt-6 text-black bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <h3 className="text-lg font-semibold text-black text-center">
                        {kpiGroup[0]?.kpi?.nom_kpi || `KPI ${kpiId}`}
                    </h3>
                    <KPIGroupChart kpiGroup={kpiGroup} />
                </div>
            ))}
        </div>
    );
};

export default CombinedKPIChart;
