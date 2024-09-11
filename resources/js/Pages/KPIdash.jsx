import SideBar from '@/Components/SideBar';
import { Head, router } from '@inertiajs/react';
import { Checkbox, Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Typography, Select, Option } from '@material-tailwind/react';
import { useState, useEffect } from 'react';

export default function KPIdash({ courses, kpis, selected_kpis = [] }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selected, setSelected] = useState(true);
  const [courseCode, setCourseCode] = useState("");
  const [kpiselected, setKpiSelected] = useState([]);

  useEffect(() => {
    
    if (Array.isArray(selected_kpis) && selectedCourse) {
      const courseKPIs = selected_kpis.filter(kpi => kpi.cour_id === courseCode);
      setKpiSelected(courseKPIs.map(kpi => kpi.k_p_is_id));
    } else {
      setKpiSelected([]);
    }
  }, [selectedCourse, selected_kpis, courseCode]);

  const handleCourseChange = (value) => {
    const cour = courses.find(course => course.nom_cour === value);
    setSelectedCourse(value);
    setSelected(false);
    setCourseCode(cour ? cour.id : "");
  };

  const handleKpiSelected = (event) => {
    const value = event.target.value; 
    const kpiObject = kpis.find((kpi) => kpi.nom_kpi === value);

    if (kpiObject) {
      const isChecked = event.target.checked;
      if (isChecked) {
        router.post(route('kpi.store'), { 
          course_id: courseCode,
          kpi_id: kpiObject.id,
        });
      } else {
        router.delete(route('kpi.destroy', kpiObject.id), {
          data: { course_id: courseCode },
        });
      }
    }
  };

  return (
    <>
      <Head title="KPI Dashboard" />
      <div className="flex">
        <div className="w-1/5 min-h-screen bg-gray-100 text-black p-4 rounded-r-lg">
          <SideBar active={"kpi"} />
        </div>
        <div className="flex-1 p-4 ">
        <div className="flex justify-between items-center mb-6 mt-3">
                        <Typography variant="h2" color="black">
                            My KPI dashboard
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

          <Card className="mt-4">
            <List>
              {kpis.map((kpi) => (
                <ListItem className="p-0" key={kpi.id} disabled={!selectedCourse}>
                  <label
                    htmlFor={`kpi-${kpi.id}`}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id={`kpi-${kpi.id}`}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                        value={kpi.nom_kpi}
                        checked={kpiselected.includes(kpi.id)}
                        onChange={handleKpiSelected}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {kpi.nom_kpi}
                    </Typography>
                  </label>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </div>
    </>
  );
}
