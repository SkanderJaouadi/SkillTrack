import React, { useState } from "react";
import { Head, router } from '@inertiajs/react';
import { Typography, Card, Alert } from "@material-tailwind/react";
import SideBar from '@/Components/SideBar';
import KPIchart from '@/Components/KPIChart';  
import CombinedKPIChart from "@/Components/CombinedKPIChart";
import PrimaryButton from "@/Components/PrimaryButton";
import NotificationMenu from "@/Components/NotificationMenu";

export default function Dashboard({ selected_kpis, evaluation, courses, rattrapages }) {
    const TABLE_HEAD = ["Course Name", "Type", "Date of Evaluation"];
    console.log(rattrapages);

    
    const TABLE_ROWS = (evaluation || []).map((evalItem, index) => ({
        key: index, 
        course_name: courses[evalItem.cour_id] || 'N/A', 
        type: evalItem.type_evaluation,
        date: evalItem.date_evaluation,
    }));

   
    const formatNumber = (number) => {
        if (typeof number === 'number') {
            return number.toFixed(2);
        }
        return '0.00';
    };

    const [kpis, setKpis] = useState(selected_kpis.map(kpi => ({
        ...kpi,
        value: formatNumber(kpi.value) // Format the value here
    })));
    const [message, setMessage] = useState(null);

    const handleDelete = () => {
        router.delete(route('dash.destroy', { dash: 0 }), {
            preserveScroll: true,
            onSuccess: () => {
                setKpis([]); 
                setMessage('KPIs have been successfully reset!'); 
                setTimeout(() => setMessage(null), 5000); 
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const kpiGroups = kpis.reduce((acc, kpi) => {
        const key = kpi.kpi.id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(kpi);
        return acc;
    }, {});

    const multiCourseGroups = Object.values(kpiGroups).filter(group => group.length > 1);
    const singleCourseKpis = kpis.filter(kpi => !multiCourseGroups.flat().includes(kpi));

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <div className="w-1/5 min-h-screen bg-gray-100 text-black p-4 rounded-r-lg">
                    <SideBar active={"dashboard"} />
                </div>

                <div className="w-4/5 p-8">
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <Typography variant="h2" color="black" className="text-center">
                                Student Dashboard
                            </Typography>
                            <NotificationMenu rattrapages={rattrapages} />
                        </div>

                        <PrimaryButton 
                            onClick={handleDelete} 
                            className="absolute top-8 right-8"
                        >
                            Reset
                        </PrimaryButton>
                    </div>

                    {message && (
                        <div className="fixed top-4 right-4 z-50">
                            <Alert color="green" className="mb-4">
                                {message}
                            </Alert>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 sm:grid-cols-3 mt-16">
                        {multiCourseGroups.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {multiCourseGroups.map((group, index) => (
                                    <CombinedKPIChart key={index} selectedKpis={group} />
                                ))}
                            </div>
                        )}

                        {singleCourseKpis.length > 0 && singleCourseKpis.map((selected_kpi, index) => (
                            <div key={index} className="flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                                <div className="p-6">
                                    <Typography variant="h6" color="black">
                                        {selected_kpi.kpi ? selected_kpi.kpi.nom_kpi : 'KPI not found'}
                                        {selected_kpi.cour && (
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({selected_kpi.cour.nom_cour}) 
                                            </span>
                                        )}
                                    </Typography>
                                    <KPIchart selected_kpi={selected_kpi} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-8 border-gray-300" />

                    <div>
                        <Typography variant="h4" color="black" className="text-left mb-4">
                            Upcoming
                        </Typography>
                        <Card className="h-full w-full overflow-scroll p-4">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {TABLE_ROWS.length > 0 ? (
                                        TABLE_ROWS.map(({ key, course_name, type, date }) => (
                                            <tr key={key} className="even:bg-blue-gray-50/50">
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {course_name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {type}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {date}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                                                No upcoming evaluations
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
