import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false); // Ref to track if the request has been sent

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get<User[]>('http://localhost:5000/user')
                .then(response => {
                    setUsers(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1 className='text-blue-500'>User List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-2 px-4">First Name</th>
                            <th className="py-2 px-4">Last Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className={`text-gray-700 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                <td className="py-2 px-4 border-b border-gray-300">{user.firstName}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.lastName}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTable;
