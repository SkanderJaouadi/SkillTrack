import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import SideBar from '@/Components/SideBar';
import { Typography, Textarea, Select, Option } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 

export default function Recommendations({ courses, details, bestcourse, StudentName }) {
    const [recommendation, setRecommendation] = useState('');
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const { props } = usePage(); 

    useEffect(() => {
        if (props.flash) {
            if (props.flash.success) {
                setMessage(props.flash.success);
                setMessageType('success');
            } else if (props.flash.error) {
                setMessage(props.flash.error);
                setMessageType('error');
            }

            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [props.flash]);
    
    const handleCourseChange = (value) => {
        const selected = courses.find(course => course.nom_cour === value);

        if (!selected) {
            console.error('Selected course not found.');
            return;
        }

        setSelectedCourse(value);

        router.post(route('reco.store'), {
            course_id: selected.id,
        })
        setExpanded1(false);
        setSelectedCourse("");
    };

    const handleRecommendationChange = (e) => {
        setRecommendation(e.target.value);
    };

    return (
        <>
            <Head title="Recommendations" />
            <div className="flex">
                <div className="w-1/5 min-h-screen bg-gray-100 text-black p-4 rounded-r-lg">
                    <SideBar active={'rec'} />
                </div>
                <div className="flex flex-col w-4/5 p-6">
                    <Typography variant="h4" className="mb-4 text-center">
                        Recommendation
                    </Typography>
                    <Typography>
                        {StudentName.map((student, index) => (
                            <p key={index} className="pb-6">
                                <span className="font-bold text-lg"> {student.nom} {student.prenom}</span> has demonstrated exceptional performance in the  
                                <span className="font-bold text-blue-600"> {bestcourse.nom_cour}</span> lecture series. This outstanding achievement suggests 
                                a strong aptitude and interest in the field of <span className="font-bold text-blue-600"> {bestcourse.nom_cour}</span> and related technologies.
                                To further develop and capitalize on these strengths, it is recommended that 
                                <span className="font-bold text-lg"> {student.nom} {student.prenom}</span> consider pursuing an engineering path with a focus on 
                                <span className="font-bold text-blue-600"> {bestcourse.nom_cour}</span> and related disciplines.
                            </p>
                        ))}
                    </Typography>

                    <div className="border rounded-lg p-4 mb-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpanded1(!expanded1)}
                        >
                            <Typography className="text-lg font-medium">
                                Ask for Catching up Courses
                            </Typography>
                            <ChevronDownIcon
                                className={`w-6 h-6 transition-transform ${expanded1 ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {expanded1 && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <Typography className="text-gray-500" variant='h7'>
                                        Action: Select the Course
                                    </Typography>
                                    <div className='w-1/3'>
                                        <Select
                                            label="Select Course"
                                            value={selectedCourse}
                                            onChange={handleCourseChange}
                                            className=" text-sm"
                                        >
                                            {courses.map((course) => (
                                                <Option key={course.id} value={course.nom_cour}>
                                                    {course.nom_cour} - {course.code}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {message && (
                        <div className={`p-4 mb-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <Typography>{message}</Typography>
                        </div>
                    )}

                    <div className="border rounded-lg p-4 mb-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpanded2(!expanded2)}
                        >
                            <Typography className="text-lg font-medium">
                                Participate in Projects and Competitions:
                            </Typography>
                            <ChevronDownIcon
                                className={`w-6 h-6 transition-transform ${expanded2 ? 'rotate-180' : ''}`}
                            />
                        </div>
                        {expanded2 && (
                            <div className="mt-4">
                                <Typography className="text-gray-500 " variant='h7'>
                                    Action: Research and join relevant student clubs
                                    and register for upcoming competitions
                                </Typography>
                            </div>
                        )}
                    </div>

                    <div className="border rounded-lg p-4 mb-4">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setExpanded3(!expanded3)}
                        >
                            <Typography className="text-lg font-medium">
                                Internships and Research:
                            </Typography>
                            <ChevronDownIcon
                                className={`w-6 h-6 transition-transform ${expanded3 ? 'rotate-180' : ''}`}
                            />
                        </div>
                        {expanded3 && (
                            <div className="mt-4">
                                <Typography className="text-gray-500 " variant='h7'>
                                    Action: Prepare a resume and cover letter highlighting {bestcourse.nom_cour}-related achievements and apply to relevant internships and research positions
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
