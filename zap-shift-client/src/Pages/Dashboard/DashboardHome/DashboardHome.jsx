import React from 'react'
import useRole from '../../../hooks/useRole'
import Loading from '../../../Components/Logo/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

const {role, roleLoading} = useRole();
if(roleLoading){
    return <Loading></Loading>
}
else if(role === 'admin'){
    return <AdminDashboardHome></AdminDashboardHome>
}
else{
    return <UserDashboardHome></UserDashboardHome>
}
}

export default DashboardHome