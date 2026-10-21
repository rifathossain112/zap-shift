import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

const useRole = () => {
  const {user} = useAuth();
  
  const axiosSecure = useAxiosSecure();
  const {isLoading : roleLoading, data: role = 'user'} = useQuery({
    queryKey:['user-role', user?.email],
    queryFn: async() =>{
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        
        return res.data?.role || 'user';
    }
  })
 return { role, roleLoading };
}

export default useRole