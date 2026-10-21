import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();


    const { data: deliveryStatus = [], isLoading, error } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;
        }
    });

    const getPieChartData = data =>{
        return data.map(item =>{
            return {name: item.status, value: item.count}
        })
    }


    if (isLoading) {
        return <div className="text-center py-10 text-lg font-semibold">Loading stats...</div>;
    }


    if (error) {
        return <div className="text-center py-10 text-red-500">Failed to load statistics.</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashing Admin Dashboard</h2>

            <div className="stats shadow bg-base-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    deliveryStatus.map((stat, index) => (
                        <div key={stat._id || index} className="stat">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            {/* stat._id যদি null বা undefined হয়, তবে 'Unknown' দেখাবে */}
                            <div className="stat-title uppercase font-semibold">
                                {stat._id || "Unknown"}
                            </div>
                            <div className="stat-value text-primary">{stat.count}</div>
                            <div className="stat-desc">Total Parcels</div>
                        </div>
                    ))
                }
            </div>
            <div className='w-full h-[400px]'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPieChartData(deliveryStatus)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        label
                        isAnimationActive={true}
                    />
                   <Legend></Legend>
                   <Tooltip></Tooltip>
                </PieChart>
            </div>
        </div>
    );
};

export default AdminDashboardHome;