import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import SideBar from '@/Components/SideBar';
import { Typography } from '@material-tailwind/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, Option } from '@material-tailwind/react';
import axios from 'axios';

export default function Predict({ courses, details }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filteredDetails, setFilteredDetails] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [forecast, setForecast] = useState(null);
    const colors = ['#8884d8', '#ff7300']; 

    const handleCourseChange = async (value) => {
        
        const selected = courses.find(course => course.nom_cour === value);
        setSelectedCourse(value);
        setCourseName(value);
        setCourseCode(selected ? selected.code : "");

        if (selected) {
            const updatedDetails = details
                .filter(detail => detail.cour_id === selected.id)
                .map(detail => ({
                    Date: new Date(detail.created_at).toISOString().split('T')[0],
                    Grade: parseFloat(detail.grade.toFixed(2))
                }))
                .sort((a, b) => new Date(a.Date) - new Date(b.Date)); 

            setFilteredDetails(updatedDetails);

           
            await fetchPrediction(updatedDetails);
        } else {
            setFilteredDetails([]);
            setData([]);
            setForecast(null);
        }
    };

    const fetchPrediction = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { data });
            setForecast(response.data.forecast);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

   
    const forecastData = forecast ? forecast.map((grade, index) => {
        const lastDate = new Date(filteredDetails[filteredDetails.length - 1].Date);
        
        return {
            Date: `Next Exam ${index + 1}`,
            Forecast: parseFloat(grade.toFixed(2)) 
        };
    }) : [];

    
    const chartData = [...filteredDetails, ...forecastData];

    return (
        <>
            <Head title="Prediction Grades" />
            <div className="flex">
                <div className="w-1/5 min-h-screen bg-gray-100 text-black p-4 rounded-r-lg">
                    <SideBar active={'pred'} />
                </div>
                <div className="flex flex-col w-4/5 p-6">
                <div className="flex justify-between items-center mb-11 mt-7">
                        <Typography variant="h2" color="black">
                            Prediction for {courseName}
                        </Typography>

                        <div className="w-1/3">
                            <Select
                                label="Select Course"
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                className="text-sm"
                            >
                                {courses.map((course) => (
                                    <Option key={course.id} value={course.nom_cour}>
                                        {course.nom_cour} - {course.code}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="mb-4">
                        {selectedCourse && filteredDetails.length > 0 ? (
                            <>
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Date" />
                                        <YAxis tickFormatter={(value) => value.toFixed(2)} /> {/* Format Y axis */}
                                        <Tooltip formatter={(value) => value.toFixed(2)} /> {/* Format Tooltip */}
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="Grade"
                                            stroke={colors[0]}
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="Forecast"
                                            stroke={colors[1]}
                                            dot={false}
                                            isAnimationActive={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
