
import UseAuth from './useAuth';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useModerator = () => {
    const { user} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isModerator, isPending: isModeratorLoading } = useQuery(
        {
            queryKey: [user?.email, 'isModerator'],
            queryFn: async () => {
                console.log('asking and checking is moderator',user);
                if (!user?.email) return false; // Avoid making the query if no user
                const res = await axiosSecure.get(`/users/moderator/${user.email}`);
                return res.data?.moderator || false; // Default to false if Moderator status isn't found
            },
            enabled: !!user?.email, // Run query only if email is available
        }
    );

    return [isModerator, isModeratorLoading];
};

export default useModerator;
