import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContest/AuthContext';


const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default useAuth