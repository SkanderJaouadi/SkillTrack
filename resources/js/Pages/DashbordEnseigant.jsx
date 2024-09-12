import { Link, Head, usePage, router } from '@inertiajs/react';
import { Typography, Select, Option } from "@material-tailwind/react";
import StudentCard from "@/Components/StudentCard";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import PrimaryButton from '@/Components/PrimaryButton';
import ProfileMenu from '@/Components/ProfileMenu';

export default function DashbordEn() {
    const { props } = usePage();
    
    const { students, courses, rattrapages, averageRatings, pagination, studentGrades } = props;
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [showStudents, setShowStudents] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleCourseChange = (value) => {
        const cour = courses.find(course => course.nom_cour === value);
        setSelectedCourse(value);
        setCourseCode(cour ? cour.id : "");

        if (cour) {
            router.get(route('dashEdu.index'), { course_id: cour.id }, {
                preserveState: true,
                onSuccess: () => {
                    setShowStudents(false);
                    setSelectedStudents([]);
                }
            });
        }
    };

    const toggleStudentList = () => {
        if (!showStudents && rattrapages[courseCode]?.length === 0) {
            setMessage('No students have requested supplementary courses.');
        }
        setShowStudents(!showStudents);
    };

    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prevSelected =>
            prevSelected.includes(studentId)
                ? prevSelected.filter(id => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const handleAction = (actionType) => {
        router.post(route('dashEdu.updateRattrapages'), {
            action: actionType,
            studentIds: selectedStudents,
            courseId: courseCode,
        }, {
            onSuccess: () => {
                setMessage({
                    type: actionType === 'accept' ? 'success' : 'error',
                    text: actionType === 'accept' ? 'Accepted successfully' : 'Declined successfully',
                });
    
                // Keep the student list open and only reset selected students
                setSelectedStudents([]);
    
                // Optionally, you can refresh the data to reflect changes without closing the list
                router.get(route('dashEdu.index'), { course_id: courseCode }, {
                    preserveState: true,
                    onSuccess: () => {
                        // Handle the response if necessary
                    }
                });
            },
            onError: () => {
                setMessage({
                    type: 'error',
                    text: 'An error occurred while processing your request',
                });
            }
        });
    };
    

    const getRatingPercentage = (rating) => Math.round(rating);

    const getRatingColor = (percentage) => {
        if (percentage < 50) return 'bg-red-600'; // Red
        if (percentage < 75) return 'bg-yellow-700'; // Yellow
        return 'bg-green-500'; // Green
    };

    const enrolledStudents = students.filter(student => student.cour_id === courseCode);
    const selectedPagination = pagination;

    const handlePageChange = (page) => {
        router.get(route('dashEdu.index'), { page, course_id: courseCode }, {
            preserveState: true,
        });
    };

    return (
        <>
            <Head title="Educator Home" />
            <div className="flex justify-between items-start p-6">
                <div className="w-1/3 p-4 bg-white shadow rounded-lg">
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
                    {selectedCourse && (
                        <div className="mt-4 space-y-4">
                            <Typography variant="h6">View satisfaction rate for this module</Typography>
                            {courseCode && (
                                <div className="relative pt-1">
                                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                                        <span>0%</span>
                                        <span>50%</span>
                                        <span>100%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="relative flex-1 h-4 bg-gray-200 rounded">
                                            <div
                                                className={`absolute top-0 left-0 h-full rounded ${getRatingColor(getRatingPercentage(averageRatings[courseCode] || 0))}`}
                                                style={{ width: `${getRatingPercentage(averageRatings[courseCode] || 0)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Typography
                                variant="h6"
                                className="flex items-center cursor-pointer relative"
                                onClick={toggleStudentList}
                            >
                                Students asked for supplementary courses
                                <ChevronDownIcon
                                    className={`ml-2 w-5 h-5 transform ${showStudents ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
                                />
                            </Typography>
                           
                            {showStudents && rattrapages[courseCode]?.length > 0 ? (
                                <div className="space-y-2 mt-2 border rounded-lg p-2 bg-gray-100">
                                    {rattrapages[courseCode].map((student) => (
                                        <div key={student.etudiant_id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`student-${student.etudiant_id}`}
                                                checked={selectedStudents.includes(student.etudiant_id)}
                                                onChange={() => handleStudentSelect(student.etudiant_id)}
                                                className="form-checkbox"
                                            />
                                            <label htmlFor={`student-${student.etudiant_id}`} className="ml-2">
                                                {student.name} {student.prenom}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : showStudents ? (
                                <div className="mt-2 text-gray-500">
                                    No students have requested supplementary courses.
                                </div>
                            ) : null}
                            {selectedStudents.length > 0 && (
                                <div className="mt-4 flex justify-between space-x-4">
                                    <PrimaryButton
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => handleAction('decline')}
                                    >
                                        Decline
                                    </PrimaryButton>
                                    <PrimaryButton
                                        variant="outlined"
                                        size="sm"
                                        onClick={() => handleAction('accept')}
                                    >
                                        Accept
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex-1 mx-4 bg-gray-100 p-6 rounded-lg">
                    {message && (
                        <div
                            className={`p-4 rounded-lg text-white ${
                                message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}
                    <div className="flex items-center mb-4">
                        <Typography className="text-center " variant="h1">
                            Team Section
                        </Typography>
                    </div>
                    {selectedCourse ? (
                        <Typography className="text-center mb-4" variant="h4">
                        Students in {selectedCourse} Class
                    </Typography>
                    ): (
                        <p></p>
                    )}
                    
                    {!selectedCourse ? (
                        <div className="text-center text-gray-500">
                            Please select a course to view students and their details.
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {students.map((student) => (
                                <StudentCard
                                    key={student.id}
                                    name={student.name}
                                    sexe={student.sexe}
                                    prenom={student.prenom}
                                    niveau={student.grade}
                                />
                            ))}
                        </div>
                    )}
                    
                    {selectedCourse && (
                        <div className="flex justify-center space-x-2 mt-6">
                            {selectedPagination.current_page > 1 && (
                                <button
                                    onClick={() => handlePageChange(selectedPagination.current_page - 1)}
                                    className="px-4 py-2 text-sm font-medium border rounded-full shadow-md bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    Previous
                                </button>
                            )}
                            {selectedPagination.current_page < selectedPagination.last_page && (
                                <button
                                    onClick={() => handlePageChange(selectedPagination.current_page + 1)}
                                    className="px-4 py-2 text-sm font-medium border rounded-full shadow-md bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <ProfileMenu/>
            </div>
        </>
    );
}
