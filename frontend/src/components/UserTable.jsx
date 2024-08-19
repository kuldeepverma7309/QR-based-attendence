import React from 'react';

const UsersTable = ({ users }) => {
    return (
        <div className="w-full bg-slate-900 h-screen p-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Users List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-gray-200 text-gray-600 text-left text-sm font-bold uppercase">Name</th>
                                    <th className="py-3 px-6 bg-gray-200 text-gray-600 text-left text-sm font-bold uppercase">Email</th>
                                    <th className="py-3 px-6 bg-gray-200 text-gray-600 text-left text-sm font-bold uppercase">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="py-4 px-6 text-gray-800">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-800">{user.email}</td>
                                        <td className="py-4 px-6 text-gray-800">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
