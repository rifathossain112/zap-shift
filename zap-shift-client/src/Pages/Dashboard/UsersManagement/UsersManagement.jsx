import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaUserShield } from 'react-icons/fa6';
import { FiShield, FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useState } from 'react';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        Swal.fire({
            title: "Agree",
            text: `You will be changed the role to Admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.displayName} marked as an admin`,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        });
                }
            });
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        Swal.fire({
            title: "Agree",
            text: `You will be changed the role to User`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.displayName} removed from Admin`,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                }
            })

    }
    return (
        <div>
            <h2>Mange users: {users.length}</h2>
            <p>search text:{searchText}</p>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                onChange={(e) => setSearchText(e.target.value)}
                type="search" 
                className="grow"
                placeholder="Search users" />
                
            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {
                                    user.role === 'admin' ?
                                        <button
                                            onClick={() => handleRemoveAdmin(user)}
                                            className='btn' bg-red-400>
                                            <FiShieldOff></FiShieldOff>
                                        </button> :
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className='btn bg-green-400'>
                                            <FaUserShield></FaUserShield>
                                        </button>
                                }
                            </td>
                            <th>
                                Action
                            </th>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersManagement