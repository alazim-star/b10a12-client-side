
import UseAuth from './useAuth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery(
        {
            queryKey: [user?.email, 'isAdmin'],
            queryFn: async () => {
                console.log('asking and checking is admin',user);
                if (!user?.email) return false; // Avoid making the query if no user
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                return res.data?.admin || false; // Default to false if admin status isn't found
            },
            enabled: !!user?.email, // Run query only if email is available
        }
    );

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
