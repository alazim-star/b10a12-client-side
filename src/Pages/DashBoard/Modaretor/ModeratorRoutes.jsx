

import { Navigate, useLocation } from 'react-router-dom';

import useModerator from '../../../Hooks/useModerator';
import UseAuth from '../../../Hooks/useAuth';



const ModeratorRoutes = ({ children }) => {
    const { user, loading } = UseAuth(); // Destructure user and loading
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    // Show a loading spinner while fetching data
    if (loading || isModeratorLoading) {
        return <progress className="progress w-56"></progress>;
    }

    // Allow access if the user is authenticated and an Moderator
    if (user && isModerator) {
        return children;
    }

    // Redirect to the home page if not authenticated or not an Moderator
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoutes
