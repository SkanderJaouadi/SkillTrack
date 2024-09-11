import React, { useState, useEffect } from 'react';
import SideBar from '@/Components/SideBar';
import { Head, router } from '@inertiajs/react';
import { Typography, Card, Select, Option } from '@material-tailwind/react';
import { Box, Grid, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CourDetail({ courses, details, ratedDetails }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleCourseChange = (value) => {
        const selected = courses.find(course => course.nom_cour === value);
        setSelectedCourse(value);
        setCourseName(value);
        setCourseCode(selected ? selected.code : "");

        const detailsForSelectedCourse = details
            .filter(detail => detail.cour_id === selected?.id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 

        setSelectedDetails(detailsForSelectedCourse.length > 0 ? detailsForSelectedCourse[0] : null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (rate) => {
        if (!selectedDetails) return;
        
        router.post(route('courDetail.store'), {
            rate: rate,
            course_id: selectedDetails.cour_id,   
            detail_id: selectedDetails.id,        
        }, {
            onSuccess: () => {
                setMessage("Rate submitted successfully!");
                setMessageType("success");
            },
            onError: (error) => {
                console.log(error); 
                setMessage(error.message || "Error submitting rate.");
                setMessageType("error");
            },
        });
    };
    
    
    

    const isRated = selectedDetails ? ratedDetails.includes(selectedDetails.id) : false;

    const handlePrev = () => {
        if (!selectedDetails) return;

        const detailsForSelectedCourse = details
            .filter(detail => detail.cour_id === selectedDetails.cour_id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const currentIndex = detailsForSelectedCourse.findIndex(detail => detail.id === selectedDetails.id);

        if (currentIndex < detailsForSelectedCourse.length - 1) {
            setSelectedDetails(detailsForSelectedCourse[currentIndex + 1]);
        }
    };

    const handleNext = () => {
        if (!selectedDetails) return;

        const detailsForSelectedCourse = details
            .filter(detail => detail.cour_id === selectedDetails.cour_id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const currentIndex = detailsForSelectedCourse.findIndex(detail => detail.id === selectedDetails.id);

        if (currentIndex > 0) {
            setSelectedDetails(detailsForSelectedCourse[currentIndex - 1]);
        }
    };

    const isNextDisabled = () => {
        if (!selectedDetails) return true;

        const detailsForSelectedCourse = details
            .filter(detail => detail.cour_id === selectedDetails.cour_id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const currentIndex = detailsForSelectedCourse.findIndex(detail => detail.id === selectedDetails.id);
        return currentIndex === 0;
    };

    const isPrevDisabled = () => {
        if (!selectedDetails) return true;

        const detailsForSelectedCourse = details
            .filter(detail => detail.cour_id === selectedDetails.cour_id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const currentIndex = detailsForSelectedCourse.findIndex(detail => detail.id === selectedDetails.id);
        return currentIndex === detailsForSelectedCourse.length - 1;
    };

    return (
        <>
            <Head title='Course Detail' />
            <div className='flex'>
                <div className="w-1/5 min-h-screen bg-gray-100 text-black p-4 rounded-r-lg">
                    <SideBar active={"CourDetail"} />
                </div>
                <div className="w-4/5 p-8">
                    {message && (
                        <div
                            className={`mt-4 p-4 rounded-lg text-white ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}
                        >
                            {message}
                        </div>
                    )}
                    <div className="flex justify-between items-center mb-6">
                        <Typography variant="h2" color="black">
                            Course Tracking
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
                    <div className="mt-8">
                        {selectedCourse && (
                            selectedDetails ? (
                                <Card className="p-6">
                                    <div className="flex justify-between mb-4">
                                        <Button 
                                            onClick={handlePrev} 
                                            disabled={isPrevDisabled()}
                                            className="flex items-center justify-center px-4 h-10 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                            </svg>
                                            
                                            Previous
                                        </Button>
                                        <Button 
                                            onClick={handleNext} 
                                            disabled={isNextDisabled()}
                                            className="flex items-center justify-center px-4 h-10 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            
                                            Next
                                            <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0-4 4m4-4l-4-4"/>
                                            </svg>
                                        </Button>
                                    </div>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h5" color="black">
                                            {courseName} 
                                            <span className="text-gray-500 ml-4 text-sm">
                                                {new Date(selectedDetails.created_at).toLocaleString()}
                                            </span>
                                        </Typography>
                                        <Tooltip
                                            title={isRated ? "Course already rated" : ""}
                                            placement="top"
                                            arrow
                                        >
                                            <span>
                                                <Button
                                                    aria-controls={open ? 'menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    disabled={isRated} // Disable button if already rated
                                                    className="text-gray-500 hover:bg-gray-200 rounded-full p-1"
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                            </span>
                                        </Tooltip>

                                        <Menu
                                            id="menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem
                                                style={{ color: 'red' }}
                                                onClick={() => { handleClose(); handleSubmit("bad"); }}
                                            >
                                                Bad
                                            </MenuItem>
                                            <MenuItem
                                                style={{ color: 'orange' }}
                                                onClick={() => { handleClose(); handleSubmit("good"); }}
                                            >
                                                Good
                                            </MenuItem>
                                            <MenuItem
                                                style={{ color: 'green' }}
                                                onClick={() => { handleClose(); handleSubmit("excellent"); }}
                                            >
                                                Excellent
                                            </MenuItem>
                                        </Menu>
                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div className="mt-4 space-y-2">
                                                <Typography>Course Status: {selectedDetails.course_status}</Typography>
                                                <Typography>Grade: {selectedDetails.grade}</Typography>
                                                <Typography>Study Hours: {selectedDetails.study_hours}</Typography>
                                                <Typography>Course Attendance: {selectedDetails.course_attendance}</Typography>
                                                <Typography>Completed Steps: {selectedDetails.completed_steps}</Typography>
                                                <Typography>Total Steps: {selectedDetails.total_steps}</Typography>
                                                <Typography>Assignment: {selectedDetails.assignment}</Typography>
                                                <Typography>Deadline Submission: {selectedDetails.deadline_submission}</Typography>
                                                <Typography>Status Deadline: {selectedDetails.status_deadline}</Typography>
                                                <Typography>Activity ID: {selectedDetails.activity_id}</Typography>
                                             </div>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ) : (
                                <Typography color="red">
                                    No details available for this course.
                                </Typography>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
