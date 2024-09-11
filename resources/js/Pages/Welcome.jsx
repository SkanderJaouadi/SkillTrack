import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { Typography } from "@material-tailwind/react";
import undrawGraduation from '../src/assests/undraw_Educator_re_ju47.png';
import undrawBI from '../src/assests/undraw_data_reports_706v.png';
import undrawOnline from '../src/assests/undraw_Online_test_re_kyfx.png';
import undrawTe from '../src/assests/undraw_Educator_re_ju47.png';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Welcome() {
    const { props } = usePage();
    const { isAuthenticated } = props;

    return (
        <>
            <Head title="Home" />
  
            <Typography className="text-blue-600 text-center" variant="h2">
                Your student Path with SkillTrack
            </Typography>
            
            <div className='flex justify-center mb-10'>
                <img src={undrawTe} alt="Illustration" className="w-2/3 lg:w-1/3 h-auto" />
            </div>
            
            <div className='flex justify-center space-x-4'>
                <div className="w-1/4 flex justify-center">
                    <img src={undrawBI} alt="Illustration" className="w-full h-auto" />
                </div>
                <div className="w-1/4 flex justify-center">
                    <img src={undrawOnline} alt="Illustration" className="w-full h-auto" />
                </div>
                <div className="w-1/4 flex justify-center">
                    <img src={undrawGraduation} alt="Illustration" className="w-full h-auto" />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10 mb-7">
                <Link className="relative" href={route(isAuthenticated ? 'dashboard' : 'login')}>
                <PrimaryButton children={isAuthenticated ? 'Dashboard' : 'Login'}/>     
                   
                </Link>
                <Link className="relative" href={route('meeting')}>
                    <PrimaryButton children={'Ask for a meeting with our Educator staff'}/>    
                    
                </Link>
            </div>
        </>
    );
}
