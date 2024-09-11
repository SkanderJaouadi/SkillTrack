import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Datepicker from "react-tailwindcss-datepicker"; 
import undrawCalendar from '../src/assests/undraw_Online_calendar_re_wk3t.png';
import ButtonMod from '@/Components/ButtonMod';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Meeting() {
  const [dateValue, setDateValue] = useState({ 
    startDate: null, 
    endDate: null 
  }); 

  const [timeValue, setTimeValue] = useState('');

  const handleDateChange = (newValue) => {
    setDateValue(newValue); 
  };

  const handleAddToCalendar = (e) => {
    e.preventDefault();
    setDateValue({ startDate: null, endDate: null });
    setTimeValue('');
  };

  const timeOptions = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM',
    '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM',
  ];

  return (
    <>
      <Head title="Meeting" />
      <div className="container mx-auto p-4">
        <form>
        <div className="flex justify-center pt-1">
          <img src={undrawCalendar} alt="Illustration" className="w-1/2 h-auto" />
        </div>
          <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Select a time:
              </label>
              <select
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a time</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Select a date:
              </label>
              <Datepicker 
                asSingle={true} 
                useRange={false}
                value={dateValue} 
                onChange={handleDateChange} 
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link className="relative" href={route('home')}>
            <PrimaryButton children={'Home page'}/>    
            </Link>
            <PrimaryButton onClick={handleAddToCalendar} children={'Add to Calendar'}/>
            
          </div>
          
          <div className="flex justify-center pt-5">
            <p className="text-blue-500 underline cursor-pointer text-center">
            An expert from our staff will contact you shortly !
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
