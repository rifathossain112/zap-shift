import React from 'react'
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Logo/Loading/Loading';
import Forbidden from '../Components/Logo/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
    const {loading, user} = useAuth();
    const {role, roleLoading} = useRole();

    if(loading || !user || roleLoading){
        return <Loading></Loading>
    }
    if(role !== 'rider'){
        return <Forbidden />;
    }
    return children;
}

export default RiderRoute