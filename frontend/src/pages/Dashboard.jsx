import Sidebar from "../components/Sidebar";
import React from 'react';
const Dashboard = () => {
    return (
        <div className=" bg-slate-900 flex h-screen gap-4">
            <Sidebar />
            <div className="flex flex-col mx-0 flex-1">
            <h1 className="text-white text-3xl mb-6 text-center w-full">Admin Dashboard</h1>
            <div className=" flex justify-center items-center ">
                <table className="min-w-full bg-slate-800 text-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-slate-700">Functionality</th>
                            <th className="py-2 px-4 border-b border-slate-700">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">User Management</td>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Create, update, and delete user accounts</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Role Assignment</td>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Assign roles and permissions to users</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">System Monitoring</td>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Monitor system performance and logs</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Content Management</td>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Manage website content and media</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Settings</td>
                            <td className="py-2 px-4 border-b border-slate-700 text-center">Configure system settings and preferences</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Dashboard;