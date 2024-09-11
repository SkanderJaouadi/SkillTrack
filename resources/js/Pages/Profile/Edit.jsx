import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import SideBar from '@/Components/SideBar';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />
            <div className="flex flex-col lg:flex-row min-h-screen ">
                {/* Sidebar */}
                <div className="w-full lg:w-1/5 bg-gray-100 p-4 rounded-r-lg mb-6 lg:mb-0">
                    <SideBar active={"profile"} />
                </div>

                {/* Main Content */}
                <div className="flex-1 py-12 px-4 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Update Profile Information */}
                        <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        {/* Update Password */}
                        <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        {/* Delete User */}
                        <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
