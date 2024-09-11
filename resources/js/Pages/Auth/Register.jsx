import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Checkbox, Typography, Select, Option, Button } from "@material-tailwind/react";
import InputError from '@/Components/InputError';

import undrawSignUp from '../../src/assests/undraw_Sign_up_n6im.png';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        etudiant_id: '',
        educator_id: '',
    });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation', 'role', 'etudiant_id', 'educator_id'),
        });
    };
    
    return (
        <>
            <Head title="Register" />
            <div className="font-[sans-serif] bg-white flex items-center md:h-screen p-4">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 bg-gray-50 shadow w-full sm:p-8 p-6 rounded-xl relative mt-10">
                        <div>
                            <img src={undrawSignUp} alt="Illustration" className="w-full h-auto" />
                        </div>
                        <form className="md:max-w-sm w-full mx-auto" onSubmit={submit}>
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-4xl font-extrabold text-center">Register</h3>
                            </div>
                            <InputError message={errors.etudiant_id} className="mt-2" />
                            <InputError message={errors.educator_id} className="mt-2" />
                            <div className="space-y-4">
                                <div className="mb-0 flex flex-col gap-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Name
                                    </Typography>
                                    <Input
                                        size="lg"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Flen Ben Falten"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    <InputError message={errors.name} className="mt-2" />

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Your Email
                                    </Typography>
                                    <Input
                                        size="lg"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="FlenBenFalten@mail.com"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    <InputError message={errors.email} className="mt-2" />

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Password
                                    </Typography>
                                    <Input
                                        type="password"
                                        size="lg"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="********"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    <InputError message={errors.password} className="mt-2" />

                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Confirm Password
                                    </Typography>
                                    <Input
                                        type="password"
                                        size="lg"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="********"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        color='black'
                                        label={
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal"
                                            >
                                                I agree to the &nbsp;
                                                <a href="#" className="font-medium transition-colors text-indigo-600 hover:underline hover:text-blue-900">
                                                    Terms and Conditions
                                                </a> &nbsp;and&nbsp;
                                                <a href="#" className="font-medium transition-colors text-indigo-600 hover:underline hover:text-blue-900">
                                                    Privacy Policy
                                                </a>.
                                            </Typography>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-2 flex items-center space-x-4">
                                <div className="w-72">
                                    <Select
                                        label="Select Role"
                                        value={data.role}
                                        onChange={(value) => setData('role', value)}
                                    >
                                        <Option value="Enseignant">As Educator/Academic Staff</Option>
                                        <Option value="Etudiant">As Student</Option>
                                    </Select>
                                </div>
                                <PrimaryButton type="submit" disabled={processing || !termsAccepted}>
                                    Create Account
                                </PrimaryButton>
                            </div>

                            
                            {data.role === 'Etudiant' && (
                                <div className="mt-4">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Student ID
                                    </Typography>
                                    <Input
                                        size="md"
                                        id="etudiant_id"
                                        name="etudiant_id"
                                        value={data.etudiant_id}
                                        onChange={(e) => setData('etudiant_id', e.target.value)}
                                        placeholder="Enter your etudiant ID"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    
                                </div>
                            )}
                            {data.role === 'Enseignant' && (
                                <div className="mt-4">
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Educator ID
                                    </Typography>
                                    <Input
                                        size="md"
                                        id="educator_id"
                                        name="educator_id"
                                        value={data.educator_id}
                                        onChange={(e) => setData('educator_id', e.target.value)}
                                        placeholder="Enter your educator ID"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                    />
                                    
                                </div>
                            )}

                            <Link
                                href={route('login')}
                                className="mt-4 block text-center text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2"
                            >
                                Already registered?
                            </Link>
                        </form>
                        <div className="divider absolute left-0 right-0 mx-auto w-1 h-full border-l border-gray-400 max-md:hidden"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
