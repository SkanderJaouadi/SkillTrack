import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input, Checkbox, Typography } from "@material-tailwind/react";

import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log('okay');
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <Typography variant="h4" color="blue-gray" className="text-center font-bold">
                                Log in
                            </Typography>
                            {status && <div className="mt-2 font-medium text-sm text-green-600">{status}</div>}
                        </div>

                        <div className="mb-4">
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Email
                            </Typography>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Password
                            </Typography>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="********"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Link
                                href={route('register')}
                                className="mt-4 block text-center text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2"
                            >
                                Need to Register?
                            </Link>

                            <PrimaryButton className="ml-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
