import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import Loading from '../Components/Logo/Loading/Loading';
import Forbidden from '../Components/Logo/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(role !== 'admin'){
        return <Forbidden />;
    }
    return children;
}

export default AdminRoute